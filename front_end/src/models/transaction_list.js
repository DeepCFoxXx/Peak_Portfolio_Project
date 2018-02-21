const Request = require('../services/request.js');

const TransactionList = function(url) {
  this.url = url;
  this.transactions = [];
  this.onUpdate = null;
};

TransactionList.prototype.getTransactions = function() {
  var request = new Request(this.url);
  request.get(this.onUpdate);
};

module.exports = TransactionList;
