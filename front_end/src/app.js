const Request = require('./services/request.js');
const TransactionList = require('./models/transaction_list.js');
const Portfolio = require('./models/portfolio.js');
const SharesListView = require('./views/shares_list_view.js');
const PieChart= require('./views/pie_chart.js');
const TotalView = require('./views/total_view.js');
const autocomplete = require('./views/modal_box.js');
const Transaction = require('./models/transaction.js');
const ModalBox = require('./views/modal_box.js');
const ValuationsList = require('./models/valuations_list.js');
const LineChart = require('./views/line_chart.js');

var getPrices = function(transactionList) {
  portfolio = new Portfolio(transactionList);
  portfolio.onUpdate = updatePortfolioShares.bind(portfolio);
  portfolio.getCompanyPrices();
};

var updatePortfolioShares = function(responseBody) {
  var array = responseBody["Stock Quotes"];
  this.setSharesArray(array);
  var sharesListView = new SharesListView(this);
  sharesListView.buildTable();
  var pieChart = new PieChart(this);
  var portfolioTotalView = new TotalView(this);
  portfolioTotalView.showTotal();
};

var getResponse = function(responseBody) {
  this.transactions = responseBody;
  getPrices(this);
};

var getValuationResponse = function(responseBody) {
  var lineChart = new LineChart(responseBody);
};

const app = function() {
  var transactionList = new TransactionList('http://localhost:5000/api/transactions');
  transactionList.onUpdate = getResponse.bind(transactionList);
  transactionList.getTransactions();
  var valuationList = new ValuationsList('http://localhost:5000/api/valuations');
  valuationList.onUpdate = getValuationResponse;
  valuationList.getValuations();

  var modal = document.getElementById('modalPorfolioUpdate');

  var removeModal = document.getElementById('modalRemoveShares');

  var addModal = function(){
    modal.style.display = "block";
    var modalBoxDiv = document.querySelector('#datalist-div');
    var modalBox = new ModalBox(modalBoxDiv);
    modalBox.getCompaniesList();

  };
  var btn = document.querySelector("#openModalBtn");
  var btn2 = document.querySelector("#add-share");

  btn.onclick = addModal
  btn2.onclick = addModal

  var span = document.getElementsByClassName("close")[0];
  span.onclick = function() {
    modal.style.display = "none";
    app();
  };

  var spanRemove = document.getElementsByClassName("close")[1];
  spanRemove.onclick = function() {
    removeModal.style.display = "none";
    app();
  };

};

document.addEventListener('DOMContentLoaded', app);
