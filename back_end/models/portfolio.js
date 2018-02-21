const APIKey = require('../services/api_key.js');
const Request = require('../services/request.js');

const Portfolio = function(transactionList) {
  this.list = transactionList;
  this.sharesArray = [];
  this.companiesList = this.getCompanies();
  this.onUpdate = null;
};

Portfolio.prototype.getCompanyPrices = function() {
  var request = new Request(this.buildURL());
  request.get(this.onUpdate);
};

Portfolio.prototype.getCompanies = function() {
  var array = [];
  this.list.forEach(function(element, index) {
    if (!array.includes(element.ticker)) {
      array.push(element.ticker);
    }
  })
  return array;
};

Portfolio.prototype.buildURL = function() {
  var commaList = this.companiesList.join(",");
  var apiKey = new APIKey();
  var url = "https://www.alphavantage.co/query?function=BATCH_STOCK_QUOTES&symbols=" + commaList + "&apikey=" + apiKey.apiKey
  return url;
};

Portfolio.prototype.setSharesArray = function(array) {
  this.sharesArray = array.map(function(element){
    if (this.validatePrice(parseFloat(element["2. price"]))){
      return object = {
        name: element["1. symbol"],
        price: element["2. price"]
      }
    } else {
      return object = {
        name: element["1. symbol"],
        price: this.usePurchasePrice(element)
      }
    }

}.bind(this))
  this.getStockNumberAndTotal();
  this.removeZeroShare();
};

Portfolio.prototype.getStockNumberAndTotal = function() {
  this.sharesArray.forEach(function(quote){
    var total = 0;
    this.list.forEach(function(transaction) {
      if (quote.name === transaction.ticker) {
        total += transaction.number;
      }
    }.bind(this));
    quote.number = total;
    quote.totalValue = total * quote.price;
  }.bind(this))
}

Portfolio.prototype.getCompanyName = function(ticker) {
  var name = null;
  this.list.forEach(function(element) {
    if (ticker === element.ticker) {
      name = element.name;
    }
  })
  return name;
}

Portfolio.prototype.getTotalValue = function(){
  var total = 0;
  this.sharesArray.forEach(function(element){
   total += element.totalValue
  })
  return total;
};

Portfolio.prototype.validatePrice = function(price) {
  return price > 0;
};

Portfolio.prototype.usePurchasePrice = function(share) {
  var result = this.list.filter(element => element.ticker === share["1. symbol"]);
  var length = result.length;
  return result[length-1].purchase_price;
};

Portfolio.prototype.removeZeroShare = function() {
  this.sharesArray = this.sharesArray.filter(element => element.number !== 0)
};

module.exports = Portfolio;
