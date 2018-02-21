const TransactionTableView = function(transactions){
  this.transactions = transactions;

}

TransactionTableView.prototype.buildTable = function(){
  var table = document.querySelector("#transaction-table");
  table.appendChild(this.createTableHeaders());

  this.transactions.forEach(function(element) {

    var tableRow = document.createElement('tr');


    var date = document.createElement('td');
    var dateText = this.getDateFromId(element._id);
    date.innerText = dateText;
    tableRow.appendChild(date);

    var numberShares = document.createElement('td');
    numberShares.innerText = element.number;
    tableRow.appendChild(numberShares);

    var purchasePrice = document.createElement('td');
    purchasePrice.innerText = element.purchase_price.toFixed(2);
    tableRow.appendChild(purchasePrice);
    
    var stockTitle = document.querySelector("#stock-title");
    stockTitle.innerText = element.name;

    table.appendChild(tableRow);
  }.bind(this));


}


TransactionTableView.prototype.createTableHeaders = function() {
  var headerRow = document.createElement('tr');
  var dateHeader = document.createElement('th');
  dateHeader.innerText = "Date purchased";
  var numberHeader = document.createElement('th');
  numberHeader.innerText = "Number of shares";
  var priceHeader = document.createElement('th');
  priceHeader.innerText = "price ($)";

  headerRow.appendChild(dateHeader);
  headerRow.appendChild(numberHeader);
  headerRow.appendChild(priceHeader);
  return headerRow;
}

TransactionTableView.prototype.getDateFromId = function(objectID){
  var date =  new Date(parseInt(objectID.substring(0, 8), 16) * 1000);
  return date.toDateString();
}

module.exports = TransactionTableView;
