const mongoose = require('mongoose');
const MealPlan = require('./mealPlan');
const Meal = require('./meal');

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
    price: Number,
    selectedMeals: [{  
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Meal'      
    }]
});

const cartSchema = new mongoose.Schema({
    items: [cartItemSchema],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', 
    }
});

cartSchema.methods.addToCart = async function(mealPlanId, selectedMeals) {
    
    const cartItemIndex = this.items.findIndex(item => item.mealPlan.toString() === mealPlanId);
    console.log('mealPlanId:', mealPlanId);
    console.log('selectedMeals:', selectedMeals);

    const mealPlan = await MealPlan.findById(mealPlanId);
    console.log('Fetched MealPlan:', mealPlan);

    if (!mealPlan) {
        throw new Error('Meal plan not found');
    }

    const meals = await Meal.find({ _id: { $in: selectedMeals } });
    if (meals.length !== selectedMeals.length) {
        throw new Error('Some selected meals do not exist');
    }

    if (cartItemIndex !== -1) {
        // If the item exists, increment its quantity
        this.items[cartItemIndex].quantity += 1;
        // Update the selected meals
        this.items[cartItemIndex].selectedMeals = meals;
    } else {
        // Otherwise, add the meal plan and its price to the cart
        const newCartItem = {
            mealPlan: mealPlan._id,  
            price: mealPlan.price,
            selectedMeals: meals,
        };

        this.items.push(newCartItem);
    }
    console.log('Modified Cart:', this)

    return await this.save();
};

const Cart = mongoose.model('Cart', cartSchema);
module.exports = Cart;
