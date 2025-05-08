const express = require("express");
const {
  getProducts,
  createProduct,
 getProductById,
 updateProduct,
 deleteProduct,
} = require("../controllers/productController");

const router = express.Router(); 

router.get("/",getProducts);
router.post("/",createProduct);
router.get("/:productId",getProductById);
router.put("/:productId",updateProduct);
router.delete("/:productId",deleteProduct);

module.exports = router;