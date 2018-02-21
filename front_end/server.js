const express = require('express');
const server = express();
const path = require('path');

server.use(express.static('build'));

server.listen(3000, function(){
  console.log("Listening on port 3000");
});

server.get('/stock/:ticker', function(req, res) {
  // console.log(req.params.ticker);
  console.log(path.join(__dirname + '/build/stock.html'));
  res.sendFile(path.join(__dirname + '/build/stock.html'));

})
