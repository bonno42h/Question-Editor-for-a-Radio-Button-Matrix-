const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");
const Question = require("./question");
var cors = require('cors');
const API_PORT = 8081;
const app = express();

// this is our MongoDB database
const dbRoute = "mongodb://bonno:password123@ds223605.mlab.com:23605/react-test";

// (optional) only made for logging and
// bodyParser, parses the request body to be a readable json format
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger("dev"));
app.use(cors());


// this is our get method
// this method fetches all available data in our database
//SHOW route
app.get("/api/:id", function(req, res){
    Question.findById(req.params.id)
        .then(rows => {
            console.log(rows);
            res.json(rows);
        })
        .catch(function(err){
            res.send(err);
        });
});

//CREATE route
app.post("/api/", function(req, res){
    Question.create(req.body.json, function(err, data){
        if(err){
            res.send(err);
            console.log(err);
        } else {
            res.json(data);
        }
    });
});

//DESTROY route
/*app.delete("/api/:id", function(req, res){
    Question.findByIdAndRemove((req.params.id, function(err, data){
        if(err){
            console.log(err);
            res.send(err);
        } else {
            res.json(data);
        }
    }));
});*/

app.put("/api/:id", function(req, res){
    console.log(req.params.id);
    console.log('req.body.rows', req.body.rows);
    Question.findByIdAndUpdate(
        req.params.id,
        {
            rows: req.body.rows,
            columns: req.body.columns
        },
        function(err, data){
            if(err){
                console.log(err);
                res.send(err);
            } else {
                res.json(data);
            }
        }
    );
});

// append /api for our http requests
// app.use("/api", router);


// connects our back end code with the database
mongoose.connect(
  dbRoute,
  { useNewUrlParser: true }
);
mongoose.Promise = Promise;
let db = mongoose.connection;

db.once("open", () => {
    console.log("connected to the database");
    app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));
});

// checks if connection with the database is successful
db.on("error", console.error.bind(console, "MongoDB connection error:"));

// launch our backend into a port
