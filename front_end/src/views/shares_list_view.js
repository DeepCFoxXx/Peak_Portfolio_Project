const ModalBoxRemove = require('./modal_box_remove');


const SharesListView = function(portfolio) {
  this.portfolio = portfolio;
}

SharesListView.prototype.buildTable = function() {
  var table = document.querySelector("#shares-list");
  table.innerHTML = "";
  table.appendChild(this.createTableHeaders());

  this.portfolio.sharesArray.forEach(function(element) {
    var tableRow = document.createElement('tr');
    table.appendChild(tableRow);

    var companyName = document.createElement('td');
    var aTag = document.createElement('a')
    var link = `/stock/${element.name}`
    aTag.setAttribute('href', link)
    companyName.appendChild(aTag);
    var name = this.portfolio.getCompanyName(element.name);
    aTag.innerText = name;
    companyName.appendChild(aTag)

    tableRow.appendChild(companyName);

    var companyTicker = document.createElement('td');
    companyTicker.innerText = element.name;
    tableRow.appendChild(companyTicker);

    var number = document.createElement('td');
    number.innerText = element.number;
    number.setAttribute("class", "number-font");
    tableRow.appendChild(number);

    var price = document.createElement('td');
    var priceNumber = parseFloat(element.price);
    price.setAttribute("class", "number-font");
    price.innerText = priceNumber.toFixed(2);
    tableRow.appendChild(price);

    var total = document.createElement('td');
    total.setAttribute("class", "number-font");
    total.innerText = element.totalValue.toFixed(2);
    tableRow.appendChild(total);

    var removeShareTd = document.createElement('td');
    var removeShareLink = document.createElement('a');
    removeShareLink.setAttribute("class", "remove-share-x")
    removeShareLink.innerHTML = "&times;";
    removeShareLink.addEventListener('click',function(){
      modalRemoveShares = document.querySelector('#modalRemoveShares');
      modalBoxRemove = new ModalBoxRemove(modalRemoveShares, this.portfolio);
      modalBoxRemove.buildBox(element.name);
    }.bind(this) )
    removeShareTd.appendChild(removeShareLink);
    tableRow.appendChild(removeShareTd);
  }.bind(this));

  var finalTableRow = document.createElement('tr');
  for(i = 0; i < 4; i++) {
    var emptyCell = document.createElement('td');
    emptyCell.setAttribute("class", "empty-cell");
    finalTableRow.appendChild(emptyCell);
  }
  var total = document.createElement('td');
  var totalAmount = this.portfolio.getTotalValue();
  total.innerText = totalAmount.toFixed(2);
  total.setAttribute("class", "number-font");
  total.setAttribute("id", "background-vice-versa");
  finalTableRow.appendChild(total);
  table.appendChild(finalTableRow);
}

SharesListView.prototype.createTableHeaders = function() {
  var headerRow = document.createElement('tr');
  var nameHeader = document.createElement('th');
  nameHeader.innerText = "Company Name";
  var tickerHeader = document.createElement('th');
  tickerHeader.innerText = "Company Ticker";
  var numberHeader = document.createElement('th');
  numberHeader.innerText = "Number of Shares";
  var priceHeader = document.createElement('th');
  priceHeader.innerText = "Closing Price ($)";
  var valueHeader = document.createElement('th');
  valueHeader.innerText = "Total Value ($)";
  var removeHeader = document.createElement('th');
  removeHeader.innerText = "Remove shares";

  headerRow.appendChild(nameHeader);
  headerRow.appendChild(tickerHeader);
  headerRow.appendChild(numberHeader);
  headerRow.appendChild(priceHeader);
  headerRow.appendChild(valueHeader);
  headerRow.appendChild(removeHeader);

  return headerRow;
}




module.exports = SharesListView;
