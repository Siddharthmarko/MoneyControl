const express = require("express");
const app = express();
require("dotenv").config();
const path = require("path");

const router = require(path.join(__dirname, "./Routes/utils/router.js"));
const PORT = process.env.PORT;
const DB_URL = process.env.DB_URL;
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const compression = require('compression')

app.use(compression()) // compress all responses
app.use(express.json()); // parse incoming request body as JSON
app.use(bodyParser.urlencoded({ extended: true })); // parse Outgoing request body as JSON
app.use(cookieParser());
app.use(cors()); //Handling Cors Error
app.use(router);
app.set("view engine", 'ejs')// Add Node js Template Engine

app.use(function (req, res) {
  const err = new Error("Not Found");
  err.status = 404;
  res.json(err);
});

const mongoose = require("mongoose");
mongoose.connect(DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.on("open", function () {
  console.log("mongoDB connected..");
  // start server
  app.listen(PORT, function () {
    console.log("api server is listening port : " + PORT);
  });
});
