const csv = require('csvtojson');
const MongoClient = require('mongodb').MongoClient;
const tickers = [];
const tickers2 = [];

const csvFilePathOne = './NASDAQ.csv';
const csvFilePathTwo = './NYSE.csv';

csv().fromFile(csvFilePathOne).on('json',(jsonObj) => {
    // combine csv header row and csv line to a json object
    tickers.push(jsonObj);
}).on('done',(error)=>{
    console.log('end')
});


csv().fromFile(csvFilePathTwo).on('json',(jsonObj) => {
    // combine csv header row and csv line to a json object
    tickers2.push(jsonObj);
}).on('done',(error)=>{
    console.log('end')
});

MongoClient.connect('mongodb://localhost:27017', function(err, client) {
  if (err) {
    console.log(err);
    return;
  };
  const db = client.db("share_data");
  db.collection("tickers").drop();
  db.collection("tickers").insert(tickers, function(err, result) {
    console.log(result);
  });
  db.collection("tickers").insert(tickers2, function(err, result) {
    console.log(result);
  });
});
