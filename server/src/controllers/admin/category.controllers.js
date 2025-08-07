const {
  createCategoryDB,
  getCategroiesDB,
  updateCategoryDB,
  deleteCategoryDB,
} = require("../../services/admin/category.services");
const { generateSlug } = require("../../utils");

const getCategroies = async (req, res) => {
  const data = await getCategroiesDB();
  return res.json({ success: true, data });
};

const createCategory = async (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.json({
      success: false,
      error: "Name is required",
    });
  }

  const slug = generateSlug(name);

  try {
    const data = await createCategoryDB(name, slug);
    return res.json({ success: true, data });
  } catch (error) {
    if (error.code === 11000) {
      return res.json({
        success: false,
        error: "Category already exists",
      });
    }
  
    return res.json({ success: false, error: "something went wrong!" });
  }

};

const updateCategory = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  if (!id) {
    return res.json({
      success: false,
      error: "id is required!",
    });
  }

  const slug = generateSlug(name);

  try {
    const data = await updateCategoryDB(id, { name, slug });
    return res.json({
      success: true,
      message: "Category updated successfully!",
      data,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.json({
        success: false,
        error: "Category already exists!",
      });
    }

    return res.json({
      success: false,
      error: "something went wrong!",
    });
  }
};

const deleteCategory = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.json({
      success: false,
      error: "id is required!",
    });
  }

  try {
    const data = await deleteCategoryDB(req.params.id);
    return res.json({
      success: true,
      message: "Category deleted successfully!",
      data,
    });
  } catch (error) {
    return res.json({
      success: false,
      error: "something went wrong!",
    });
  }
};

module.exports = { getCategroies, createCategory, updateCategory, deleteCategory };