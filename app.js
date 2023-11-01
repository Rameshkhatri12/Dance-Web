const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();

const bodyparser = require('body-parser');
const port = 80;

// getting-started.js
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/contactDance', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//Define Mongoose Schema
const contactSchema = new mongoose.Schema({
  name1: String,
  email: String,
  password: String,
  phone: String,
});

var contact = mongoose.model('contact', contactSchema);

//Express Specific Stuff
app.use('/static', express.static('static')); // For Serving Static Files
app.use(express.urlencoded());

//PUG Specific Stuff
app.set('view engine', 'pug'); //Set the Template engine as Pug
app.set('views', path.join(__dirname, 'views')); //Set the views directory

//ENDPOINTS
app.get('/home', (req, res) => {
  const patt = {};
  res.status(200).render('home.pug', patt);
});

app.get('/contact', (req, res) => {
  const patt = {};
  res.status(200).render('contact.pug', patt);
});


app.post('/contact', (req, res) => {
  var myData = new contact(req.body);
  myData.save().then(() => {
      res.send("The item has been saved to the Database");
    }).catch(() => {
      res.status(404).send("the item has been not save to database");
    });
  // res.status(200).render('contact.pug');
});

// app.post("/contact", (req, res) => {
//   var myData = new contact(req.body);
//   myData
//     .save().then(() => {
//       res.status(200).send("This item has been Saved To The DataBase");
//     })
//     .catch(() => {
//       res.status(404).send("This item has been not saved To the Database");
//     });
// });

//Start The Server
app.listen(port, () => {
  console.log(`This application is running on port ${port}`);
});