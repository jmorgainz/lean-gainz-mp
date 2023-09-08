const express = require('express');
const router = express.Router();
const User = require('../models/user');
const ensureLoggedIn = require('../config/ensureLoggedIn');
const mongoose = require('mongoose');
const Meal = require('../models/meal');
const cartCtrl = require('../controllers/cart');
const Cart = require('../models/cart');



router.get('/', ensureLoggedIn, async (req, res) => {
    const userId = req.user._id;

    try {
        const user = await User.findById(userId).populate({
            path: 'cart',
            populate: {
                path: 'items.mealPlan items.selectedMeals', // populate both mealPlan and selectedMeals
            }
        });

        if (!user || !user.cart) {
            return res.status(404).send('Cart not found.');
        }

        const cartPackages = user.cart.items.map(item => ({
            mealPlan: item.mealPlan,
            quantity: item.quantity,
            price: item.price,
            selectedMeals: item.selectedMeals // it is already in item object
        }));
        const totalPrice = cartPackages.reduce((acc, package) => acc + (package.price * package.quantity), 0);

        res.render('cart/index', { cartPackages, totalPrice });

    } catch (error) {
        console.error("Error fetching cart:", error);
        res.status(500).send('There was a problem fetching the cart.');
    }
});

router.get('/edit-meals/:packageId', ensureLoggedIn, async (req, res) => {
    try {
        const allMeals = await Meal.find();

        const user = await User.findById(req.user._id)
        .populate({
            path: 'cart',
            populate: {
                path: 'items.mealPlan'
            }
        });
        
        const packageItem = user.cart.items.find(item => item.mealPlan._id.toString() === req.params.packageId);
        if (!packageItem) {
            return res.status(404).send('Package not found in cart.');
        }

        // Construct a map for selected meals
        const selectedMealsMap = {};

        packageItem.mealPlan.selectedMeals.forEach(meal => {
        selectedMealsMap[meal._id.toString()] = { quantity: meal.quantity }; 
            // Assuming the meal object has a quantity attribute which has the number of that meal in the cart
});


        res.render('meals/edit', { allMeals, selectedMealsMap });
    } catch (error) {
        console.error("Error editing meals:", error);
        res.status(500).send('There was a problem editing meals.');
    }
});


router.post('/update-cart/:packageId', ensureLoggedIn, cartCtrl.addToCart, async (req, res) => {
    console.log('firing--------')
    try {
        // Calculate the total quantity of all meals
        let totalMeals = 0;
        const newSelectedMeals = [];
        for (let key in req.body) {
        if (key.startsWith('mealQty_') && req.body[key] > 0) {
            const mealId = key.split('mealQty_')[1];
            const quantity = parseInt(req.body[key], 10);

            totalMeals += quantity;
            // Add the mealId quantity times
            for (let i = 0; i < quantity; i++) {
                newSelectedMeals.push(mealId);
                console.log(newSelectedMeals)
            }
        }
    }

        const user = await User.findById(req.user._id).populate({
            path: 'cart.items.mealPlan.selectedMeals',
            model: 'Meal'  // Specify the model since selectedMeals is referring to the 'Meal' model
        });


        const packageItem = user.cart.items.find(item => item.mealPlan._id.toString() === req.params.packageId);

        if (!packageItem) {
            return res.status(404).send('Package not found in cart.');
        }
        
        packageItem.mealPlan.selectedMeals = newSelectedMeals;
        console.log(packageItem)
        await packageItem.mealPlan.save();
        await user.save();


        res.redirect('/cart');
    } catch (error) {
        console.error("Error updating cart:", error);
        res.status(500).send('There was a problem updating the cart.');
    }
});


router.post('/remove-package/:packageId', ensureLoggedIn, async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        user.cart.items = user.cart.items.filter(item => item.mealPlan._id.toString() !== req.params.packageId);

        await user.save();

        res.redirect('/cart');
    } catch (error) {
        console.error("Error removing package:", error);
        res.status(500).send('There was a problem removing the package.');
    }
});
// new route for clearing
router.post('/clear', ensureLoggedIn, async (req, res) => {
    const userId = req.user._id;

    try {
        const user = await User.findById(userId).populate('cart');

        if (!user) {
            console.log("User not found");
            return res.status(404).send('User not found.');
        }

        if (!user.cart || !(user.cart instanceof mongoose.Model)) {
            console.log("Cart not found or not an instance of mongoose.Model");
            return res.status(404).send('Cart not found.');
        }
        
        console.log("Before clearing:", JSON.stringify(user.cart.items, null, 2));

        user.cart.items = [];

        console.log("After clearing:", JSON.stringify(user.cart.items, null, 2));

        await user.cart.save();  // Save the cart directly
        console.log("cart cleared successfully");
        
        res.redirect('/cart');  // Redirect back to the cart page
    } catch (error) {
        console.error("Error clearing cart:", error);
        res.status(500).send('There was a problem clearing the cart.');
    }
});

// end of new route for clearing

module.exports = router;
