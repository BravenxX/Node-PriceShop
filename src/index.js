const express = require("express");
const morgan = require("morgan");
const app = express();

//Settings

app.set("port", process.env.PORT || 4000);

// Middlewares

app.use(morgan("dev"));
app.use(express.json());

// Routes

app.use(require("./routes/products"));

// Starting the server

app.listen(app.get("port"), () => {
  console.log("Servidor en puerto: ", app.get("port"));
});

// Global variables

// Public
