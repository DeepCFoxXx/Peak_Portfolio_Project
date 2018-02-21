const express = require('express');
const server = express();
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const cors = require('cors');
const cron = require('node-cron');
const Portfolio = require('./models/portfolio.js');

server.use(bodyParser.json());
server.use(cors());
server.use(bodyParser.urlencoded({extended: true}));

MongoClient.connect('mongodb://localhost:27017', function(err, client) {
  if (err) {
    console.log(err);
    return;
  };

  const db = client.db("share_data");

  server.get("/api/transactions", function(req, res) {
    db.collection("purchased_shares").find().toArray(function(err, result) {
      res.status(200);
      res.json(result);
    })
  })

  server.get("/api/transactions/:ticker", function(req, res) {
    var requestedTicker = req.params.ticker.toUpperCase();
    db.collection("purchased_shares").find({ticker: requestedTicker}).toArray(function(err, result) {
      res.status(200);
      res.json(result);
    })
  })

  server.get("/api/tickers", function(req, res) {
    db.collection("tickers").find().toArray(function(err, result) {
      res.status(200);
      res.json(result);
    })
  })

  server.get("/api/valuations", function(req, res) {
    db.collection("valuations").find().toArray(function(err, result) {
      res.status(200);
      res.json(result);
    })
  })

  server.post('/api/transactions', function(req, res) {
    db.collection("purchased_shares").insert(req.body, function(err, result) {
      if (err) {
        console.log(err);
        res.status(500);
        res.send();
      }

      res.status(201);
      res.json(result.ops[0]);
    });
  });

  server.listen(5000, function() {
    console.log('Listening on port 5000');
  })

  var updatePortfolioShares = function(responseBody) {
    var array = responseBody["Stock Quotes"];
    this.setSharesArray(array);
    var valuation = this.getTotalValue();
    var dbValuation = {value: valuation, date: new Date()}
    db.collection("valuations").insert(dbValuation);
  };

  var valuationApp = function() {
    db.collection("purchased_shares").find().toArray(function(err, result) {
      var portfolio = new Portfolio(result);
      portfolio.onUpdate = updatePortfolioShares.bind(portfolio);
      portfolio.getCompanyPrices();
    });
  };

  var valuationSchedule = cron.schedule('0 0 22 * * 1-5', valuationApp)

  valuationSchedule.start();

})
