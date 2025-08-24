const getWLItemsDB =async (userId) => {
    return await WishList.find({user: userId}).populate("item").exec();
};


const addWLItemDB = async (userId, productId) => {
  const data = new WishList({ user: userId, item: productId });
  return await data.save();
};

const deleteWLItemDB = async (id) => {
  return await WishList.findByIdAndDelete(id);
};

const deleteAllWLItemsDB = async (userId) => {
  return await WishList.deleteMany({ user: userId });
};

module.exports = { getWLItemsDB, addWLItemDB, deleteWLItemDB, deleteAllWLItemsDB };