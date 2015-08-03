//var nba = require('nba');

angular.module('myApp.services', [])
  .factory('getPlayers', function ($http) {
    // Your code here
    return {
      get: function() {
        var result;
        nba.ready(function() {
          nba.api.playersInfo({Season: "2014-2015"}, function(err, data) {
            for (var i = 0; i < data.length; i++) {
              //console.log(data[i]);
              nba.api.playerInfo({playerId: data[i].playerId}, function(err, data) {
                console.log(data);
                result = data;
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
        return result;
      }
    }
  });