const Cart = require("../Cart/CartSchema");

//  add  item to cart
exports.addToCart = async (req, res) => {
  const { productId, userId, price, quantity } = req.body;

  try {
    let cartItem = await Cart.findOne({ productId, userId });

    if (cartItem) {
      // Update quantity if the item already exists
      cartItem.quantity += quantity;
      // cartItem.quantity = cartItem.quantity + quantity;
      // cartItem.quantity = 2 + 3;
    } else {
      // Add new item to cart
      cartItem = new Cart({ productId, userId, price, quantity });
    }

    await cartItem.save();
    console.log(cartItem);
    res.status(200).json(cartItem);
  } catch (error) {
    res.status(500).json({ error: "Failed to add  cart" });
  }
};

//  get cart items

exports.getItems = async (req, res) => {
  const { userId } = req.params;

  try {
    const cart = await Cart.findOne({ userId }).populate("items.productId");
    if (!cart) {
      return res.status(404).send({ message: "Cart not found" });
    }
    res.status(200).send(cart);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal server error" });
  }
};

exports.deleteItems = async (req, res) => {
  const { userId } = req.params.id;

  try {
    await Cart.findByIdAndDelete({ userId });
    res.status(200).json({ message: "Item removed from cart" });
  } catch (error) {
    res.status(500).json({ error: "Failed to remove item from cart" });
  }
};

//  update  cart items
exports.updateItems = async (req, res) => {
  const { productId, userId, price, quantity } = req.body;

  try {
    const updatedCart = await Cart.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          ...(productId && { productId }),
          ...(userId && { userId }),
          ...(price && { price }),
          ...(quantity && { quantity }),
        },
      },
      { new: true }
    );
       console.log(updatedCart);
    res.status(200).json(updatedCart);
  } catch (error) {
    res.status(500).json({ error: "Failed to update cart" });
  }
};
