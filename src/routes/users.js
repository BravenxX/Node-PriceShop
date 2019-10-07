const express = require("express");
const router = express.Router();

const {
  getUsers,
  getUser,
  deleteUser,
  validateUser
} = require("../controllers/users.controller");

// GET all users
router.route("/api/users").get(getUsers);

// GET a user
router
  .route("/api/users/:id")
  .get(getUser)
  .delete(deleteUser);

// Validate user
router.route("/api/users/validation").post(validateUser);

module.exports = router;
