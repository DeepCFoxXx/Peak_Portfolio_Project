const TotalView = function(portfolio){
  this.portfolio = portfolio;
}

TotalView.prototype.showTotal = function(){
  var pTotalTag = document.querySelector("#total-value");

  var total = this.portfolio.getTotalValue();

  pTotalTag.innerText = `$${total.toFixed(2)}`;




}

module.exports = TotalView;
