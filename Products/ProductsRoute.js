const express = require('express');
const { addProducts, getProducts, updateProducts, deleteProducts } = require('./ProductsController');
const router = express.Router();

// Add a new product
router.post('/products', addProducts);

// Get all products 
router.get('/products', getProducts);

// Delete a specific product by ID
router.delete('/products/:id', deleteProducts);

// Update a specific product by ID
router.put('/products/:id', updateProducts);

module.exports = router;
