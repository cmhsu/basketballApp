var express = require('express');
var router = express.Router();
var nba = require('nba');

/* GET home page. */
router.get('/stats', function(req, res, next) {
  nba.ready(function() {
    nba.api.playersInfo({Season: "2014-2015"}, function(err, data) {
      for (var i = 0; i < data.length; i++) {
        //console.log(data[i]);
        nba.api.playerInfo({playerId: data[i].playerId}, function(err, data) {
          console.log(data);
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
