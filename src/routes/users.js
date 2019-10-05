const express = require("express");
const router = express.Router();

const mysqlConnection = require("../database.js");

// Validate user
router.post("/API/users/validation", (req, res) => {
  console.log("req", req.body);
  mysqlConnection.query(
    `SELECT 
          users.id,
          users.email,
          users.name,
          users.password,
          job_title,
          user_types_id,
          user_types.name
      FROM users 
          INNER JOIN operators ON 
          users.id = operators.users_id 
              INNER JOIN user_types ON
              operators.user_types_id = user_types.id`,
    (err, rows, fields) => {
      if (!err) {
        res.send("yes");
      } else {
        console.log(err);
      }
    }
  );
});

// GET all users
router.get("/API/users", (req, res) => {
  mysqlConnection.query(
    `SELECT 
        users.id,
        users.email,
        users.name,
        users.password,
        job_title,
        user_types_id,
        user_types.name
    FROM users 
        INNER JOIN operators ON 
        users.id = operators.users_id 
            INNER JOIN user_types ON
            operators.user_types_id = user_types.id`,
    (err, rows, fields) => {
      if (!err) {
        res.json(rows);
      } else {
        console.log(err);
      }
    }
  );
});

// GET a user
router.get("/API/users/:id", (req, res) => {
  const { id } = req.params;
  mysqlConnection.query(
    `SELECT 
        users.id,
        users.email,
        users.name,
        users.password,
        job_title,
        user_types_id,
        user_types.name
    FROM users 
        INNER JOIN operators ON 
        users.id = operators.users_id 
            INNER JOIN user_types ON
            operators.user_types_id = user_types.id
                WHERE users.id = ?`,
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

// DELETE a user
router.delete("/API/users/:id", (req, res) => {
  const { id } = req.params;
  mysqlConnection.query(
    "DELETE FROM users WHERE id = ?",
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

module.exports = router;
