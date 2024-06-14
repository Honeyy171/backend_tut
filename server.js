const express = require('express');
const app = express();
const db = require('./db');
require('dotenv').config();


const bodyParser = require('body-parser');
app.use(bodyParser.json());  // it stores data in req.body;
const PORT = process.env.PORT || 3000;


app.get("/", function (req, res) {
  res.send("Welcome to my hotel... How can i help you ?");
});


// Import the router files 

const personRoutes = require('./routes/personRoutes');
const menuRoutes = require('./routes/menuRoutes');

// use the routers

app.use('/person', personRoutes);
app.use('/menu', menuRoutes);




app.listen(PORT, () => {
  console.log("listening on port 3000");
});






















// About lodash package in nodejs

/*var _ = require('lodash');


var data = ["person", "person", 1, 2, 1 ,2, 'name', 'age', '2'];
var filter = _.uniq(data);                  // data ko filter kr diya 
console.log(filter);


console.log(_.isString("Vaibhav"));

console.log(_.isString(17)); */
