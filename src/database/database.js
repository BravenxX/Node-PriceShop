const mysql = require("mysql");

// Create connection
const mysqlConnection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "priceshop",

  //
  multipleStatements: true
});

// Connect
mysqlConnection.connect(err => {
  if (err) {
    console.log("Error", err);
    return;
  }
  console.log("Mysql is connected..");
});

module.exports = mysqlConnection;
