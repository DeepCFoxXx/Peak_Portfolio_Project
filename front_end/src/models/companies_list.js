const Request = require('../services/request.js');

var CompaniesList = function() {
  this.companies = [];
  this.onLoad = null;
}

CompaniesList.prototype.getCompanies = function () {
  var request = new Request('http://localhost:5000/api/tickers');
  request.get(this.populateCompaniesArray.bind(this));
};

CompaniesList.prototype.populateCompaniesArray = function (responseBody) {
  this.companies = responseBody;
  this.onLoad(responseBody);
};

module.exports = CompaniesList;
