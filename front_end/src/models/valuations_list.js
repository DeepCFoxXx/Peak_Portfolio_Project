const Request = require('../services/request.js');

const ValuationsList = function(url) {
  this.url = url;
  this.valuations = [];
  this.onUpdate = null;
};

ValuationsList.prototype.getValuations = function () {
  var request = new Request(this.url);
  request.get(this.onUpdate);
};

module.exports = ValuationsList;
