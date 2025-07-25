const {getAllProductsDB, getAllCategoriesDB, getProductsByCategoryDB, getProductBySlugDB} = require("../services/public.services");


const getAllProducts = async(req, res) => {
    try {
        const data = await getAllProductsDB();
        return res.json({success:true, data});
    } catch (error) {
       return res.json({success:false, error:"somthing went worng!"});

    }
}; 

const getAllCategories = async(req, res) => {
    try {
        const data = await getAllCategoriesDB();
        return res.json({success:true, data});
    } catch (error) {
      return res.json({success:false, error:"something went worng!"});  
    }
}; 

const getProductsByCategory = async(req, res) => {
     const { category } = req.params;

  try {
    const data = await getProductsByCategoryDB(category);
    if (data.error) {
      return res.json({ success: false, error: data.error });
    }

    return res.json({ success: true, data });
  } catch (error) {
    return res.json({ success: false, error: "something went wrong!" });
  } 
};
 
const getProductBySlug = async(req, res) => {
      const { slug } = req.params;

  try {
    const data = await getProductBySlugDB(slug);
    if (!data) {
      return res.status(404).json({ success: false, error: "Product not found!" });
    }
    return res.json({ success: true, data });
  } catch (error) {
    return res.json({ success: false, error: "something went wrong!" });
  }
}; 


module.exports = {
getAllProducts,
getAllCategories,
getProductsByCategory,
getProductBySlug
}