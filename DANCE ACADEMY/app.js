const express = require("express");
const path = require("path");
const bodyparser = require("body-parser");
var mongoose = require("mongoose");
const app = express();

// Load environment variables from a .env file
require("dotenv").config();

// Access environment variables
const mongoUri = process.env.MONGO_URL;

mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// const port = 8000;
const port = 8000;

const contactSchema = new mongoose.Schema({
  name: String,
  phone: String,
  email: String,
  address: String,
  desc: String,
});

const Contact = mongoose.model("Contact", contactSchema);

// EXPRESS SPECIFIC STUFF

app.use("/static", express.static("static")); // For serving static files
app.use(express.urlencoded({ extended: true }));
// PUG SPECIFIC STUFFnpm ins
app.set("view engine", "pug"); // Set the template engine as pug
app.set("views", path.join(__dirname, "views")); // Set the views directory

// ENDPOINTS
app.get("/", (req, res) => {
  const params = {};
  res.status(200).render(`home.pug`, params);
});
app.get("/contact", (req, res) => {
  const params = {};
  res.status(200).render(`contact.pug`, params);
});
app.post("/contact", (req, res) => {
  //when post request come it will save a data  from express by a body-patser
  var myData = new Contact(req.body); //node is
  myData
    .save()
    .then(() => {
      res.send("This item has been saved to the database");
    })
    .catch(() => {
      res.status(400).send("item was not saved to the databse");
    });
  // res.status(200).render(`contact.pug`);
});

// START THE SERVER
app.listen(port, () => {
  console.log(`The application started successfully on port ${port}`);
});
