var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

 let connection;
//Establish Connection

MongoClient.connect('mongodb://localhost:27017' , { useNewUrlParser: true }, function (err, client) {
   if (err) 
    throw err
   else {
    connection = client;
    console.log('Connected to MongoDB');
    //Start app only after connection is ready
   }
 });

app.use((req, res, next) => { console.log(req.url); next() } );
app.use(bodyParser.json());


app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '/index.html'));
  console.log(req.body);
});


app.post('/', function(req, res) {
  // Insert JSON straight into MongoDB
  connection.db('myproject').collection('documents').insert(req.body, function (err, result) {
    if (err)
      res.send('Error');
    else
      res.send('Success');
  });
});

app.listen(3000);