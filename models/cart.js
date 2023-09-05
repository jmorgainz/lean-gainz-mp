const mongoose = require('mongoose');



// Define the 'cart' schema
const cartSchema = new mongoose.Schema({
  order: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'MealPlan', 
  },
  price: Number,
});

cartSchema.methods.addCartItem = async function (mealPlanId, selectedMealIds) {
    try {
      // Fetch the meal plan and validate it
      const mealPlan = await mongoose.model('MealPlan').findById(mealPlanId);
      if (!mealPlan) {
        throw new Error('Meal plan not found');
      }
  
      if (selectedMealIds.length !== mealPlan.name) {
        throw new Error('Number of selected meals does not match the meal plan package');
      }
  

// Create a model for 'Cart'
const Cart = mongoose.model('Cart', cartSchema);

const cartItem = {
    name: 'Cart Item', // You can set a cart item name here
    price: mealPlan.price,
    selectedMeals: selectedMealIds,
  };

  this.cartItems.push(cartItem);
    await this.save();

    return cartItem;
  } catch (error) {
    console.error('Error adding cart item:', error);
    throw error;
  }
}



// You can retrieve the selected meal plan and its price from the cart item
Cart.findById(cartItem1._id).populate('order').exec((err, cartItem) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log('Selected Meal Plan:', cartItem.order);
  console.log('Price of the Meal Plan:', cartItem.price);
});
const Cart = mongoose.model('Cart', cartSchema)
module.exports = mongoose.model('Cart', cartSchema);