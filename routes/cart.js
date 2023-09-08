const express = require('express');
const router = express.Router();
const User = require('../models/user');
const ensureLoggedIn = require('../config/ensureLoggedIn');
const mongoose = require('mongoose');
const Meal = require('../models/meal');
const cartCtrl = require('../controllers/cart');
const Cart = require('../models/cart');
const meals = require('../controllers/meals');



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

router.get('/edit-meals/:id', ensureLoggedIn, async (req, res,) => {
    const mealPlanId = req.params.id;
    const userId = req.user._id;

    console.log("Meal Plan ID:", mealPlanId);
    console.log("User ID:", userId);

    try {
        const user = await User.findById(userId).populate({
            path: 'cart',
            populate: {
                path: 'items.mealPlan',
                model: 'MealPlan'
            }
        });

        if (!user) {
            console.error("User not found");
            return res.status(404).send('User not found.');
        }

        const userCart = user.cart;
        const cartItem = userCart.items.find(item => item.mealPlan._id.equals(mealPlanId));

        if (!cartItem) {
            console.error("Meal plan not found in the cart");
            return res.status(404).send('Meal plan not found in the cart.');
        }

        const selectedMeals = await Meal.find({
            _id: { $in: cartItem.selectedMeals }
        });

        const allMeals = await Meal.find({})

        console.log("SELECTED MEALS FROM DB:", selectedMeals);

        // create a map of selectedMeals for easy access in the view
        const selectedMealsMap = selectedMeals.reduce((map, meal) => {
            map[meal._id] = meal;
            return map;
        }, {});

        console.log("SELECETED MEALS MAP:", selectedMealsMap);

        res.render('meals/edit', { 
            user: req.user, 
            cart: userCart, 
            mealPlan: cartItem.mealPlan,
            selectedMealsMap: selectedMealsMap,
            allMeals: allMeals
            
        });

    } catch (error) {
        console.error("Error fetching selected meals:", error);
        res.status(500).send('There was a problem fetching the selected meals.');
    }
});

router.post('/edit-meals/:id', ensureLoggedIn, async (req, res) => {
    console.log('UPDATE CART ROUTE HANDLER CALLED HERE')
    try {
        const mealPlanId = req.params.id;
        let newSelectedMeals = req.body.selectedMeals || [];
        const newMealPlanType = req.body.mealPlanType;
    
        // convert selectedMeals to array if it's a string
        if (typeof newSelectedMeals === 'string') {
            newSelectedMeals = [newSelectedMeals];
        }
    
        // convert selectedMeals to ObjectIds
        newSelectedMeals = newSelectedMeals.map(mealId => new mongoose.Types.ObjectId(mealId));
    
        // Find the user and populate the cart
        const user = await User.findById(req.user._id).populate('cart');
    
        // Find the cart and populate the items and mealPlans
        const cart = await Cart.findById(user.cart._id).populate({
            path: 'items.mealPlan',
            model: 'MealPlan'
        });
    
        // Find the mealPlan item to be updated
        const packageItem = cart.items.find(item => item.mealPlan._id.toString() === mealPlanId);
    
        if (!packageItem) {
            return res.status(404).send('Package not found in cart.');
        }
    
        // update selected meals and meal plan type
        packageItem.selectedMeals = newSelectedMeals;
        packageItem.plan = newMealPlanType;
    
        cart.markModified('items');
        await cart.save();
    
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
