const { default: mongoose } = require("mongoose");
const category = require("../../models/category");
const Product = require("../../models/product");

const getCategroiesDB = async () => {
  return await category.find({});
  const categories = await category.find({}).lean();

  const categoriesWithTotals = await Promise.all(
    categories.map(async(cat) => {
      const total = await Product.countDocuments({ category:cat._id });
      return {...cat, total};
    })
  
  );
  return categoriesWithTotals;
};

const createCategoryDB = async (name, slug) => {
  const newCategory = new category({ name, slug });
  return await newCategory.save();
};

const updateCategoryDB = async (id, data) => {
  return await category.findByIdAndUpdate(id, data, { new: true });
};

const deleteCategoryDB = async (id) => {
  const session = await mongoose.startSession();
  try {
    await session.withTransaction(async() =>{
      await category.findByIdAndDelete(id, {session});
      await Product.deleteMany({category:id}, {session});
    });
    return {};
  } catch (error) {
    console.log(error);
    return null;
  }
};

module.exports = { getCategroiesDB, createCategoryDB, updateCategoryDB, deleteCategoryDB };