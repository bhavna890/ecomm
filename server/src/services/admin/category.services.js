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
  return await category.findByIdAndDelete(id);
};

module.exports = { getCategroiesDB, createCategoryDB, updateCategoryDB, deleteCategoryDB };