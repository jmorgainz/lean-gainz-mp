const mongoose = require('mongoose');



// Define the 'cart' schema
const mongoose = require('mongoose');

// Individual cart item schema
const cartItemSchema = new mongoose.Schema({
    mealPlan: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'MealPlan'
    },
    quantity: Number,
    totalPrice: Number,
});

// Main cart schema
const cartSchema = new mongoose.Schema({
    items: [cartItemSchema],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Assuming you have a User model
    },
    // ... any other fields like total price, timestamps, etc.
});

cartSchema.methods.addCartItem = async function (mealPlanId, quantity = 1) {
    try {
        const mealPlan = await mongoose.model('MealPlan').findById(mealPlanId);
        if (!mealPlan) {
            throw new Error('Meal plan not found');
        }

        // Check if the item already exists in the cart
        const existingItem = this.items.find(item => item.mealPlan.toString() === mealPlanId);

        if (existingItem) {
            // Update the existing item's quantity and total price
            existingItem.quantity += quantity;
            existingItem.totalPrice = existingItem.quantity * mealPlan.price;
        } else {
            // Add a new item to the cart
            this.items.push({
                mealPlan: mealPlanId,
                quantity,
                totalPrice: mealPlan.price * quantity,
            });
        }

        await this.save();

        return this;
    } catch (error) {
        console.error('Error adding cart item:', error);
        throw error;
    }
}

const Cart = mongoose.model('Cart', cartSchema);
module.exports = Cart;


// cartSchema.methods.addCartItem = async function (mealPlanId, selectedMealIds) {
//     try {
//       // Fetch the meal plan and validate it
//       const mealPlan = await mongoose.model('MealPlan').findById(mealPlanId);
//       if (!mealPlan) {
//         throw new Error('Meal plan not found');
//       }
  
//       if (selectedMealIds.length !== mealPlan.name) {
//         throw new Error('Number of selected meals does not match the meal plan package');
//       }
  

// // Create a model for 'Cart'
// const Cart = mongoose.model('Cart', cartSchema);

// const cartItem = {
//     name: 'Cart Item', // You can set a cart item name here
//     price: mealPlan.price,
//     selectedMeals: selectedMealIds,
//   };

//   this.cartItems.push(cartItem);
//     await this.save();

//     return cartItem;
//   } catch (error) {
//     console.error('Error adding cart item:', error);
//     throw error;
//   }
// }



// // You can retrieve the selected meal plan and its price from the cart item
// Cart.findById(cartItem1._id).populate('order').exec((err, cartItem) => {
//   if (err) {
//     console.error(err);
//     return;
//   }
//   console.log('Selected Meal Plan:', cartItem.order);
//   console.log('Price of the Meal Plan:', cartItem.price);
// });
// const Cart = mongoose.model('Cart', cartSchema)
// module.exports = mongoose.model('Cart', cartSchema);