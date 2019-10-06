const express = require("express");
const router = express.Router();

const mysqlConnection = require("../database.js");

/**********
 *  GETs  *
 **********/

// GET all Products
router.get("/", (req, res) => {
  mysqlConnection.query("SELECT * FROM products", (err, rows, fields) => {
    if (!err) {
      res.json(rows);
    } else {
      console.log(err);
    }
  });
});

// GET a product
router.get("/:id", (req, res) => {
  const { id } = req.params;
  mysqlConnection.query(
    "SELECT * FROM products WHERE id = ?",
    [id],
    (err, rows, fields) => {
      if (!err) {
        res.json(rows[0]);
      } else {
        console.log(err);
      }
    }
  );
});

/**********
 *  DELETE  *
 **********/

// DELETE a product
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  mysqlConnection.query(
    "DELETE FROM products WHERE id = ?",
    [id],
    (err, rows, fields) => {
      if (!err) {
        res.json({ status: "Product Deleted" });
      } else {
        console.log(err);
      }
    }
  );
});

/**********
 *  POST  *
 **********/
// FALTA CREAR PROCEDIMIENTOS DE ALMACENADOS :

// INSERT a product
router.post("/", (req, res) => {
  const { id, name, salary } = req.body;
  console.log(id, name, salary);
  const query = `
    SET @id = ?;
    SET @name = ?;
    SET @salary = ?;
    CALL productsAddOrEdit(@id, @name, @salary);
  `;
  mysqlConnection.query(query, [id, name, salary], (err, rows, fields) => {
    if (!err) {
      res.json({ status: "Product Saved" });
    } else {
      console.log(err);
    }
  });
});

/**********
 *  PUT  *
 **********/

router.put("/:id", (req, res) => {
  const { name, salary } = req.body;
  const { id } = req.params;
  const query = `
    SET @id = ?;
    SET @name = ?;
    SET @salary = ?;
    CALL productsAddOrEdit(@id, @name, @salary);
  `;
  mysqlConnection.query(query, [id, name, salary], (err, rows, fields) => {
    if (!err) {
      res.json({ status: "Employee Updated" });
    } else {
      console.log(err);
    }
  });
});

module.exports = router;
