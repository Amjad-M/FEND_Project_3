// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));


// Callback function to complete GET '/all' --------
app.get('/all', getInfo);

function getInfo(req, res) {
    res.send(projectData);
};
//app.get('/all', sendData);
//
//function sendData(request, response){
// response.send(projectData);
//};


//--- post--
// Post Route
const data = [];
app.post('/add', addInfo);

function addInfo(req, res) {
  projectData['date'] = req.body.date;
  projectData['temp'] = req.body.temp;
  projectData['content'] = req.body.content;
  res.send(projectData);
}




// Setup Server
// Set up and Spin up the server ---
const port = 3000;
/* Spin up the server*/
app.listen(port, listening);
function listening(){
    console.log(`running on localhost: ${port}`);
};

//  const port = 3000;
///* Spin up the server*/
//const server = app.listen(port, listening);
// function listening(){
//    // console.log(server);
//    console.log(`running on localhost: ${port}`);
//  };