const express = require('express');
const router = express.Router();
const mealsCtrl = require('../controllers/meals');
const Cart = require('../models/cart');
const User = require('../models/user'); 
const MealPlan = require('../models/mealPlan'); // Include the MealPlan model
const ensureLoggedIn = require('../config/ensureLoggedIn');

router.get('/meals', mealsCtrl.index);
router.get('/meals/:id', mealsCtrl.show);

router.post('/add-to-cart', ensureLoggedIn, async (req, res) => {
    const { mealIds, mealPlanType } = req.body;
    // console.log(mealIds, mealPlanType);
    // Assuming you store the authenticated user's ID in req.session or req.user
    const userId = req.user._id;

    // Depending on your meal plan types
    const mealPlanConfig = {
        basic: { minMeals: 7, maxMeals: 7 },
        pro: { minMeals: 10, maxMeals: 10 },
        gainz: { minMeals: 14, maxMeals: 14 }
    };

    const selectedPlan = mealPlanConfig[mealPlanType];

    // Validate number of selected meals based on mealPlanType
    if (!mealIds || !Array.isArray(mealIds) || mealIds.length < selectedPlan.minMeals || mealIds.length > selectedPlan.maxMeals) {
        // return res.status(400).send(`Please select between ${selectedPlan.minMeals} and ${selectedPlan.maxMeals} meals.`);
    }
    

    // Lookup the correct MealPlan ID based on its type
    const mealPlan = await MealPlan.findOne({ plan: mealPlanType });
    if (!mealPlan) {
        return res.status(404).send('Meal plan type not found in the database.');
    }

    try {
        mealPlan.selectedMeals = mealIds;
        await mealPlan.save();
        // Find the user and their cart
        const user = await User.findById(userId).populate('cart');
        console.log('Retrieved User:',user)
        console.log('User Cart:',user.cart)

        if (!user) {
            return res.status(404).send('User not found.');
        }

        const userCart = user.cart;

        // Add the meals to the cart using the addToCart method you defined in the Cart model
        await userCart.addToCart(mealPlan._id);  // Now using the ID of the found meal plan
        
        res.redirect('/cart'); // Redirect to the cart page or wherever you'd like

    } catch (error) {
        console.error("Error adding meal plan to cart:", error);
        res.status(500).send('There was a problem adding the meal plan to the cart.');
    }
});

module.exports = router;
