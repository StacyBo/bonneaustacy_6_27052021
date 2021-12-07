const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const saucesRoutes = require('./routes/sauces');
const userRoutes = require('./routes/user');

const path = require("path");

//const Sauce = require('./models/sauces');

// create and configure express app
const app = express();

// CORS middleware
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

// Parse the body of the request
app.use(bodyParser.json());

// Connection a la base Data 
mongoose.connect('mongodb+srv://StacyB:HelloYou@cluster0.gxlnh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

// Add routes
app.use('/api/sauces', saucesRoutes);
app.use('/api/auth', userRoutes);

app.use(express.static(path.join(__dirname, "public")));


module.exports = app;