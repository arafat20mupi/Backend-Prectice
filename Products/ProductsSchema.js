const mongoose = require("mongoose");

const ProductsSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
    default: 1,
  },
  totalPrice: {
    type: Number,
    required: true,
    default: 0,
  },
  productName: {
    type: String,
    required: true,
  },
  productDescription: {
    type: String,
    required: false,
  },
  productImage: {
    type: String,
    required: false,
  },
  userAddress: {
    type: String,
    required: false,
  },
  status: {
    type: String,
    enum: ['pending', 'completed', 'cancelled'],
    default: 'pending',
  },
}, {
  timestamps: true,
});

// Add indexes for better performance (optional)
ProductsSchema.index({ user: 1, status: 1 });

module.exports = mongoose.model("Products", ProductsSchema);
