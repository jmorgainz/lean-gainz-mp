const express = require('express');
const router = express.Router();
const User = require('../models/user');
const ensureLoggedIn = require('../config/ensureLoggedIn');

router.get('/', ensureLoggedIn, async (req, res) => {
    const userId = req.user._id;

    try {
        // Fetch the user and populate the cart's items' mealPlans
        const user = await User.findById(userId).populate({
            path: 'cart',
            populate: {
                path: 'items.mealPlan',
                populate: {
                    path: 'selectedMeals'
                }
            }
        });

        if (!user || !user.cart) {
            return res.status(404).send('Cart not found.');
        }

        console.log("User cart:", user.cart);
        
        if (!Array.isArray(user.cart.items)) {
            console.error("Expected user.cart.items to be an array, but got:", user.cart.items);
            return res.status(500).send('Unexpected cart format.');
        }

        // Aggregate all selectedMeals from every mealPlan in the cart
        let allSelectedMeals = [];
        for (let item of user.cart.items) {
            allSelectedMeals = [...allSelectedMeals, ...item.mealPlan.selectedMeals];
        }

        // Calculate the total price
        const totalPrice = allSelectedMeals.reduce((acc, meal) => acc + meal.price, 0);

        res.render('cart/index', { cartItems: allSelectedMeals, totalPrice });

    } catch (error) {
        console.error("Error fetching cart:", error);
        res.status(500).send('There was a problem fetching the cart.');
    }
});

module.exports = router;
