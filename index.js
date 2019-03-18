//jshint esversion:6
require('dotevn').config();
const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

const app = express();

app.use(bodyParser.urlencoded({
  extended: true
}));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res) {
  //console.log(req.body.crypto);

  var crypto = req.body.crypto;
  var fiat = req.body.fiat;
  var baseURL = "https://apiv2.bitcoinaverage.com/indices/global/ticker/";
  var finalURL = baseURL + crypto + fiat;
  var amount = req.body.amount;

  var options = {
    url: "https://apiv2.bitcoinaverage.com/convert/global",
    method: "GET",
    qs: {
      from: crypto,
      to: fiat,
      amount: amount
    }
  };


  request(options, function(error, response, body) {
    //console.log(response.statusCode);
    var data = JSON.parse(body);
    var price = data.price;

    var currentDate = data.time;
    res.write("<p>The Current date is " + currentDate);
    res.write("<h1>" + amount + " " +  crypto + " is currently worth " + price + " " + fiat + "</h1>");
    res.send();

  });

});

app.listen(3000, function() {
  console.log("Server is running on port 3000");
});
