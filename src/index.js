const express = require("express");
const morgan = require("morgan");

const mysql = require("mysql");

// Create connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "priceshop"
});

// Connect
db.connect(err => {
  if (err) {
    console.log("Error", err);
    throw err;
  }
  console.log("Mysql connected..");
});

// initializations

const app = express();

// Consultas a la bd

app.get("/getposts", (req, res) => {
  let sql = "SELECT * FROM products";
  let query = db.query(sql, (err, results) => {
    if (err) {
      console.log("error", err);
      throw err;
    }
    console.log(results);
    res.send("posts fetched");
  });
});

// settings

// Si existe un puerto abierto en el sistema tomalo
// si no, toma el 4000

app.set("port", process.env.PORT || 4000);

// Middlewares

app.use(morgan("dev"));

// Global variables

// Routes

// Public

// Starting the  server

app.listen(app.get("port"), () => {
  console.log("Servidor en puerto: ", app.get("port"));
});
