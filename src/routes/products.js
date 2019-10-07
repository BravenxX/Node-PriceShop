const express = require("express");
const router = express.Router();

const {
  getProducts,
  getProduct,
  deleteProduct,
  postProduct,
  putProduct
} = require("../controllers/products.controller");

/**********
 *  GETs  *
 **********/

// GET all Products
router
  .route("/api/products")
  .get(getProducts)
  .post(postProduct);

// GET a product
router
  .route("/api/products/:id")
  .get(getProduct)
  .delete(deleteProduct)
  .put(putProduct);

/**********
 *  DELETE  *
 **********/

// DELETE a product

/**********
 *  POST  *
 **********/

/**********
 *  PUT  *
 **********/

module.exports = router;
