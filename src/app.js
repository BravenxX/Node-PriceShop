const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const app = express();

/*************
 * SETTINGS  *
 *************/

app.set("port", process.env.PORT || 6000);

/****************
 *  MIDDLEWARES  *
 *****************/

app.use(cors());

app.use(morgan("dev"));

// Para que servidor entienda jsons
app.use(express.json());

/***********
 *  ROUTES  *
 ************/

app.use(require("./routes/products"));
app.use(require("./routes/users"));

/****************
 *  GLOBAL VARS  *
 *****************/

module.exports = app;
