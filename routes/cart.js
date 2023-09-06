const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    // Fetch items from the cart (from database or session or wherever you store it)
    const cartItems = []; // Placeholder, fetch actual items
    const totalPrice = 0; // Placeholder, calculate actual total price

    res.render('cart/index', { cartItems, totalPrice });
});

module.exports = router;
