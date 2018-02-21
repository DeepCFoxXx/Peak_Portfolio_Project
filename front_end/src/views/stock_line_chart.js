const Highcharts = require('highcharts');

var StockLineChart = function(dailyData) {

var timeSeries = dailyData["Time Series (Daily)"];


var dataArray = [];
for(day in timeSeries){
  dataArray.push([Date.parse(day), Number(timeSeries[day]["4. close"])]);
};



var container = document.querySelector('#stock-line-chart');

var chart = new Highcharts.Chart({

  chart: {
    type: 'line',
    renderTo: container
  },

  title: {
    text: 'Share value'
  },

  yAxis: {
    title: {
      text: 'Value ($)'
    }
  },

  xAxis: {
    type: 'datetime'
  },

  series: [{
    name: 'value',
    data: dataArray
  }]

});


}



module.exports = StockLineChart;
