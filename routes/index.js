var express = require('express');
var router = express.Router();
var nba = require('nba');
var playerMap = require('../node_modules/nba/data/players.json');

/* GET home page. */
router.get('/stats', function(req, res, next) {
  var sliceIndex = req.url.indexOf('=');
  var query = req.url.slice([sliceIndex + 1]);
  var indexOfPlus = query.indexOf('+');
  if (indexOfPlus >= 0) {
    var firstName = query.slice(0, indexOfPlus);
    var lastName = query.slice(indexOfPlus + 1);
  } else {
    var lastName = query;
  }
  for (var i = 0; i < playerMap.length; i++) {
    var currentPlayer = playerMap[i];
    if (indexOfPlus >= 0) {
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
    nba.api.playersInfo({Season: "2014-2015"}, function(err, data) {
      for (var i = 0; i < data.length; i++) {
        //console.log(data[i]);
        nba.api.playerInfo({playerId: data[i].playerId}, function(err, data) {
          //console.log(data);
          if (data.commonPlayerInfo[0].personId == playerId) {
            console.log(data);

          }
          //console.log(data.commonPlayerInfo[0].personId)
        });
        //    //nba.api.teamStats({playerID: data[i]}, function(err, data) {
        //    //  if (err) {
        //    //    console.err(err);
        //    //  } else {
        //    //    console.log(data);
        //    //  }
        //    //})
        //  }
        //  //res.send(data);
      }
    });
    //nba.api.teamStats({Season: '2014-2015'}, function(err, data) {
    //  //console.log(data);
    //})
    //res.render('index', { title: 'Express'});
  });
  res.redirect('/')
});

module.exports = router;
