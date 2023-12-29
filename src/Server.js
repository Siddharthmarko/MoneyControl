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
const { MongoClient, ServerApiVersion } = require('mongodb');

const client = new MongoClient(DB_URL, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});
async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);


// mongoose.connect(DB_URL, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// });

// const db = mongoose.connection;
// db.on("error", console.error.bind(console, "connection error:"));
// db.on("open", function () {
//   console.log("mongoDB connected..");
//   // start server
//   app.listen(PORT, function () {
//     console.log("api server is listening port : " + PORT);
//   });
// });

