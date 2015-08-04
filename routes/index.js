var express = require('express');
var router = express.Router();
var nba = require('nba');
var playerMap = require('../node_modules/nba/data/players.json');
var app = require('../app.js');
var fs = require('fs');

/* GET home page. */
router.get('/stats', function(req, res, next) {
  var str = '';
  for (var key in req.query) {
    str += req.query[key];
  }
  var playerId = 0;
  var sliceIndex = str.indexOf(' ');
  if (sliceIndex >= 0) {
    var firstName = str.slice(0, sliceIndex).toLowerCase();
    var lastName = str.slice(sliceIndex + 1).toLowerCase();
  } else {
    var lastName = str.toLowerCase();
  }
  for (var i = 0; i < playerMap.length; i++) {
    var currentPlayer = playerMap[i];
    if (sliceIndex >= 0) {
      if (currentPlayer.firstName.toLowerCase() === firstName && currentPlayer.lastName.toLowerCase() === lastName) {
        var playerId = currentPlayer.playerId;
      }
    } else {
      if (currentPlayer.lastName.toLowerCase() === lastName) {
        var playerId = currentPlayer.playerId;
      }
    }
  }
  nba.ready(function() {
    console.log('nba api is working.');
    if (playerId != 0) {
      //nba.api.playerProfile({playerId: playerId}, function(err, data) {
      //  console.log(JSON.stringify(data.overviewSeasonAvg[0]));
      //  res.send(data.overviewSeasonAvg[0]);
      //  //res.redirect('/')
      //});
      nba.api.playerProfile({playerId: playerId}, function(err, data) { //add here season: '2010-11'
        nba.api.playerInfo({playerId: playerId}, function(err, info) {
          //console.log(data.overviewSeasonAvg, info.commonPlayerInfo[0]);
          res.send({playerInfo: info.commonPlayerInfo[0], playerProfile: data.overviewSeasonAvg[0]});
        });
      });
    } else {
      res.send('Please choose a valid player');
    }

  });
});

module.exports = router;
