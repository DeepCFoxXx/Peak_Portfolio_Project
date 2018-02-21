const CompaniesList = require('../models/companies_list.js');
const Transaction = require('../models/transaction.js');

var ModalBox = function(container) {
  this.container = container;
  this.companiesList = [];
}

ModalBox.prototype.getCompaniesList = function () {
  var completeCompaniesList = new CompaniesList();
  // console.log(completeCompaniesList);
  completeCompaniesList.onLoad = this.buildDatalistBox;
  completeCompaniesList.getCompanies();
};





ModalBox.prototype.buildDatalistBox = function (data) {
  this.companiesList = data;
  // var modalContentDiv = document.createElement('div');
  var datalistCompanies = document.querySelector('#companies');
  datalistCompanies.innerHTML = "";
  this.companiesList.forEach(function(company){
    var option = document.createElement('option');
    option.value = company.name;
    datalistCompanies.appendChild(option);
  })

  var getTickerFromCompanyName = function(company){
    var ticker = null;
    data.forEach(function(companyFromList){
      if (companyFromList.name === company){
        ticker = companyFromList.ticker;
      }
    })

    return ticker;
  }

  var savePurchase = function(){
    var selectedCompanyElement = document.querySelector('#selected-company');
    var numberOfSharesElement = document.querySelector('#number-of-shares');
    var outputString = `You bought ${numberOfSharesElement.value} shares in ${selectedCompanyElement.value}. The ticker is ${getTickerFromCompanyName(selectedCompanyElement.value)}`;
    var companyName = selectedCompanyElement.value;
    var ticker = getTickerFromCompanyName(companyName);
    var numberShares = Number(numberOfSharesElement.value);
    var transaction = new Transaction(companyName, ticker, numberShares);
    transaction.getPrice();
    selectedCompanyElement.value = "";
    numberOfSharesElement.value = "";
  }




  var savePurchaseButton = document.querySelector('#save-purchase-button');
  savePurchaseButton.addEventListener('click', savePurchase)

}








module.exports = ModalBox;
