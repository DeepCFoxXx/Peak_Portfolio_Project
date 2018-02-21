const Highcharts = require('highcharts');

var LineChart = function(valuationsList) {

  var dataArray = valuationsList.map(x => [Date.parse(x.date), x.value]);
  var dataPoints = dataArray.slice(-50);

  var container = document.querySelector('#line-chart');

  var chart = new Highcharts.Chart({

    chart: {
      type: 'line',
      renderTo: container
    },

    title: {
      text: 'Overall portfolio value'
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
      data: dataPoints
    }]

  });


}

module.exports = LineChart;
