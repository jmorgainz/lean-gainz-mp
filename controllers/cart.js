const Cart = require('../models/cart')

module.exports = {
    
}

let userCart = new Cart()

userCart.addCartItem(selectedMealPlanId, selectedMealIds)
.then((cartItem) => {
    console.log('Item added to cart', cartItem)
})
.catch((error) => {
    console.error('Error adding item to cart', error)
});