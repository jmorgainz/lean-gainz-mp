const mongoose = require('mongoose');
const MealPlan = require('./mealPlan')
const Meal = require('./meal')

// Individual cart item schema
const cartItemSchema = new mongoose.Schema({
    mealPlan: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'MealPlan'
    },
    quantity: {
        type: Number,
        default: 1
    },
    price: Number
});

const cartSchema = new mongoose.Schema({
    items: [cartItemSchema],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', 
    },
    selectedMeals: [{  
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Meal'      
    }]
});

cartSchema.methods.addToCart = async function(mealPlanId, selectedMeals) {
    // Find if the mealPlan is already in the cart
    const cartItemIndex = this.items.findIndex(item => item.mealPlan.toString() === mealPlanId);

    if (cartItemIndex !== -1) {
        // If the item exists, increment its quantity
        this.items[cartItemIndex].quantity += 1;
    } else {
        // Otherwise, fetch the meal plan and its price and add it to the cart
        const mealPlan = await mongoose.model('MealPlan').findById(mealPlanId);
        if (!mealPlan) {
            throw new Error('Meal plan not found');
        }

        const newCartItem = {
            mealPlan: mealPlanId,
            price: mealPlan.price,
            selectedMeals: selectedMeals,
        };

        this.items.push(newCartItem);
    }

    return await this.save();
};

const Cart = mongoose.model('Cart', cartSchema);
module.exports = Cart;
