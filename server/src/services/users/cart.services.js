const Cart = require("../../models/cart");

const getCartItemsDB = async (id) => {
  return await Cart.find({ user: id });
  // .populate("item")
};

const addCartItemDB = async (user, item, quantity) => {
  // check if item is already in cart
  const cartItem = await Cart.findOne({ user, item });

  if (!cartItem) {
    const data = new Cart({ user, item, quantity });
    return await data.save();
  } else {
    // return error
    // update quantity

    return {error:"Item already in cart"};
    
  }
};

const updateCartItemDB = async (id, quantity) => {
  return await Cart.findByIdAndUpdate(id, { quantity }, { new: true });
  
};

const deleteCartItemDB = async (id) => {
  return await Cart.findByIdAndDelete(id);
}

module.exports = { getCartItemsDB, addCartItemDB, updateCartItemDB, deleteCartItemDB };