const category = require("../models/category");
const Image = require("../models/images");
const Product = require("../models/product");
 
const getAllProductsDB = async () => {
  let products = await Product.find({}).select("title slug price mrp category").lean();
  for (const e of products){
    const images= await Image.find({product_id: e._id}).limit(1);
    if (images.length === 0){
       e.images = [{ url: "https://www.svgrepo.com/show/508699/landscape-placeholder.svg" }];
      continue;
    }
    e.images = images;
    }
  
  return products;
};

const getAllCategoriesDB = async () => {
  return await category.find({});
};

const getProductsByCategoryDB = async (slug) => {
  // get category data
  const cd = await category.findOne({ slug });
  if (!cd) {
    return { error: "Category not found" };
  }

  return await Product.find({ category: cd._id }).select("title slug images");
};

const getProductBySlugDB = async (slug) => {
  const product = await Product.findOne({ slug }).populate("category");
  // console.log(product);
  const images = await Image.find({product_id: product._id});
  // console.log(images);
  return {...product._doc, images};
};

module.exports = { getAllProductsDB, getAllCategoriesDB, getProductsByCategoryDB, getProductBySlugDB };