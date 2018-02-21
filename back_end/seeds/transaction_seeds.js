const MongoClient = require('mongodb').MongoClient;

var transactions = [
  {
  name: "Apple Inc",
  ticker: "AAPL",
  purchase_price: 156.41,
  number: 100
  },
  {
  name: "Agilent Technologies",
  ticker: "A",
  purchase_price: 66.98,
  number: 100
  },
  {
  name: "Carolina Trust Bank",
  ticker: "CART",
  purchase_price: 9.12,
  number: 250
  },
  {
  name: "Fiat Chrysler Automobiles N.V.",
  ticker: "FCAU",
  purchase_price: 21.52,
  number: 175
  },
  {
  name: "Adobe Systems Inc.",
  ticker: "ADBE",
  purchase_price: 187.99,
  number: 50
  },
  {
  name: "Halozyme Therapeutic",
  ticker: "HALO",
  purchase_price: 17.17,
  number: 100
  },
  {
  name: "S&P Smallcap 600 Growth Ishares",
  ticker: "IJT",
  purchase_price: 165.41,
  number: 50
 },
 {
 name: "Apple Inc",
 ticker: "AAPL",
 purchase_price: 155.41,
 number: 50
 }
]

MongoClient.connect('mongodb://localhost:27017', function(err, client) {
  if (err) {
    console.log(err);
    return;
  };
  const db = client.db("share_data");
  db.collection("purchased_shares").drop();
  db.collection("purchased_shares").insert(transactions, function(err, result) {
    console.log(result);
  });
});
