const Highcharts = require('highcharts');

var PieChart = function(portfolio) {

  var data = portfolio.sharesArray.map(x=> {return {name: x.name, y: x.totalValue}});

  var container = document.getElementById("pie-chart");

  var chart = new Highcharts.Chart({
    chart: {
      type: 'pie',
      renderTo: container
    },
    tooltip: {
      pointFormat: 'Portfolio proportion <b>{point.percentage:.1f}%</b>'
    },
    title: {
      text: "Breakdown of total value of portfolio"
    },
    series: [
      {
        data: data
      }
    ]
  });

};

module.exports = PieChart;
