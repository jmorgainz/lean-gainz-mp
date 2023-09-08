const Cart = require('../models/cart')
const User = require('../models/user')

module.exports = {
    addToCart,
}
async function addToCart(req, res) {
    console.log('req.body:',req.body);

    try {
        // Assuming user is authenticated and req.user is set
        if (!req.user) {
            throw new Error('User not authenticated');
        }

        // Get user and their cart
        const user = await User.findById(req.user._id).populate('cart');
        if (!user) {
            throw new Error('User not found');
        }

        // Assuming the meal plan ID is being sent in the body of the POST request as mealPlanId
        const { mealPlanId, selectedMeals } = req.body;
        if (!mealPlanId) {
            throw new Error('Meal plan not specified');
        }

        // Call the method to add a meal plan to the cart. You can also add any other necessary information.
        const cart = await user.cart.addToCart(mealPlanId, selectedMeals);

        res.json({ message: 'Meal plan added to cart', cart: cart });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
