const express = require('express');
const router = express.Router();
const mealsCtrl = require('../controllers/meals');
const Cart = require('../models/cart');
const User = require('../models/user'); 
const MealPlan = require('../models/mealPlan'); // Include the MealPlan model
const ensureLoggedIn = require('../config/ensureLoggedIn');
const Meal = require('../models/meal');

router.get('/meals', mealsCtrl.index);
router.get('/meals/:id', mealsCtrl.show);

router.post('/add-to-cart', ensureLoggedIn, async (req, res) => {
    const { selectedMeals, mealPlanType } = req.body;
    const userId = req.user._id;

    const mealPlanConfig = {
        basic: { minMeals: 7, maxMeals: 7 },
        pro: { minMeals: 10, maxMeals: 10 },
        gainz: { minMeals: 14, maxMeals: 14 }
    };

    const selectedPlan = mealPlanConfig[mealPlanType];

    if (!selectedMeals || !Array.isArray(selectedMeals) || selectedMeals.length < selectedPlan.minMeals || selectedMeals.length > selectedPlan.maxMeals) {
        // Render the EJS page with an error message
        return res.render('yourEJSPage', {
            errorMessage: `Please select exactly ${selectedPlan.minMeals} meals for the ${mealPlanType} plan.`,
            // ... other data you pass to the EJS template
        });
    }

    const mealPlan = await MealPlan.findOne({ plan: mealPlanType });
    if (!mealPlan) {
        return res.status(404).send('Meal plan type not found in the database.');
    }

    try {
        const user = await User.findById(userId).populate('cart');

        if (!user) {
            return res.status(404).send('User not found.');
        }

        const userCart = user.cart;

        // Check if a meal plan of the same type already exists in the cart
        const existingCartItemIndex = userCart.items.findIndex(item => item.mealPlan.equals(mealPlan._id));

        if (existingCartItemIndex !== -1) {
            // Update the selectedMeals for the existing cart item
            userCart.items[existingCartItemIndex].selectedMeals = selectedMeals;
        } else {
            // Create a new cart item with the selected meals and meal plan
            const cartItem = {
                mealPlan: mealPlan._id,
                selectedMeals: selectedMeals,
                quantity: 1,
                price: mealPlan.price
            };

            // Add the cart item to the user's cart
            userCart.items.push(cartItem);
        }

        await userCart.save();

        res.redirect('/cart');

    } catch (error) {
        console.error("Error adding meal plan to cart:", error);
        res.status(500).send('There was a problem adding the meal plan to the cart.');
    }
});







module.exports = router;
