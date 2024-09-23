const express = require('express');
const { addToCart, deleteItems, getItems, updateItems } = require('./CartController');
const router = express.Router();

// Add an item to the cart
router.post('/cart/:id', addToCart);

// Delete an item from the cart
router.delete('/cart/:id', deleteItems);

// Get all cart items for a user
router.get('/cart/:userId', getItems);

// Update the quantity of a specific cart item
router.put('/cart/:id', updateItems);

