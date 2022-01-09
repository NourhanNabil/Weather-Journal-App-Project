// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require("express");

// Start up an instance of app
const app = express();
const bodyParser = require("body-parser");

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false })); //instead of bodyparser use express
app.use(bodyParser.json()); //instead of bodyparser use express

// Cors for cross origin allowance
const cors = require("cors");
app.use(cors());
// Initialize the main project folder
app.use(express.static("website"));
// Setup Server
const port = 8000;
// Callback to debug
const server = app.listen(port,()=> { 
    console.log("server is running");
    console.log(`running on location : ${port}`);
});
// GET ROUTE with call back function
app.get("/receivedData",(req,res)=>{
    res.send(projectData);
    projectData = {};
});

//POST ROUTE 
app.post("/postData",(req,res)=>{
   console.log(req.body);
   newEntry={
       date: req.body.date,
       temp: req.body.temp,
       content: req.body.content
   }
   projectData.push(newEntry);
});

