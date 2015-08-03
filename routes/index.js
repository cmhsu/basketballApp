var express = require('express');
var router = express.Router();
var nba = require('nba');
var playerMap = require('../node_modules/nba/data/players.json');
var app = require('../app.js');

/* GET home page. */
router.get('/stats', function(req, res, next) {
  var result = '';
  console.log('/stats is working');
  console.log(req.query);
  var str = '';
  for (var key in req.query) {
    str += req.query[key];
  }
  var playerId = 0;
  var sliceIndex = str.indexOf(' ');
  //var query = req.url.slice([sliceIndex + 1]);
  ////console.log(res.data.query);
  //var indexOfPlus = query.indexOf('+');
  if (sliceIndex >= 0) {
    var firstName = str.slice(0, sliceIndex);
    var lastName = str.slice(sliceIndex + 1);
  } else {
    var lastName = str;
  }
  for (var i = 0; i < playerMap.length; i++) {
    var currentPlayer = playerMap[i];
    if (sliceIndex >= 0) {
      if (currentPlayer.firstName.toLowerCase() === firstName.toLowerCase() && currentPlayer.lastName.toLowerCase() === lastName.toLowerCase()) {
        var playerId = currentPlayer.playerId;
      }
    } else {
      if (currentPlayer.lastName.toLowerCase() === lastName.toLowerCase()) {
        var playerId = currentPlayer.playerId;
      }
    }
  }
  nba.ready(function() {
    console.log('nba api is working.');
    if (playerId != 0) {
      nba.api.playerProfile({playerId: playerId}, function(err, data) {
        console.log(JSON.stringify(data.overviewSeasonAvg[0]));
        res.send(data.overviewSeasonAvg[0]);
        //res.redirect('/')
      });
    } else {
      res.send('Please choose a valid player');
    }



  });
});

module.exports = router;
