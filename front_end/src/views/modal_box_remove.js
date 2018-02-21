const CompaniesList = require('../models/companies_list.js');
const Transaction = require('../models/transaction.js');

var ModalBoxRemove = function(container, portfolio) {
  this.container = container;
  this.portfolio = portfolio;
};

ModalBoxRemove.prototype.buildBox = function(name) {
  var removeSharesDiv = document.querySelector('#remove-shares-div');
  removeSharesDiv.innerHTML = "";
  var pCompanyName = document.createElement('p');
  var selectedCompanyName = this.portfolio.getCompanyName(name);
  pCompanyName.innerText = selectedCompanyName;
  removeSharesDiv.appendChild(pCompanyName);
  removeSharesDiv.appendChild(this.createBoxLabel());
  var removeSaveButton = this.createBoxButton();
  removeSharesDiv.appendChild(removeSaveButton);



  modalRemoveShares.style.display = "block";

  var getTickerFromCompanyName = function(company){
    var ticker = null;
    this.portfolio.list.transactions.forEach(function(companyFromList){
      if (companyFromList.name === company){
        ticker = companyFromList.ticker;
      }
    })
    return ticker;
  }
  var selectedTicker = getTickerFromCompanyName(selectedCompanyName);

  var saveRemovedShares = function(){

  var numberOfSharesToRemove = document.querySelector('#number-of-shares-remove').value * -1;

  var transaction = new Transaction(selectedCompanyName, selectedTicker, numberOfSharesToRemove);
  transaction.getPrice();
  }
  removeSaveButton.addEventListener("click", saveRemovedShares)
};

ModalBoxRemove.prototype.createBoxLabel = function() {
  var label = document.createElement('label');
  label.innerText = "Number of shares to remove:";
  var input = document.createElement('input');
  input.setAttribute("id", "number-of-shares-remove");
  input.setAttribute("type", "text");
  label.appendChild(input);
  return label;
};

ModalBoxRemove.prototype.createBoxButton = function() {
  var button = document.createElement('button');
  button.setAttribute("id", "remove-save");
  button.innerText = "Save";
  return button;
};

module.exports = ModalBoxRemove;
