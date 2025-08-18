const express = require("express");
const { getProducts, createProduct, updateProduct, deleteProduct, getProductInfo, deleteProductImage, addProductImages } = require("../../controllers/admin/product.controllers");
const router = express.Router();

router.get("/", getProducts);
router.get("/:slug", getProductInfo)
router.post("/", createProduct);
router.put("/:id", updateProduct);

router.delete("/image", deleteProductImage);
router.delete("/:id", deleteProduct);

router.post("/images", addProductImages);

module.exports = router;