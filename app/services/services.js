//var nba = require('nba');

angular.module('myApp.services', [])
  .factory('getPlayers', function ($http) {
    // Your code here
    return {
      get: function(query) {
        return $http({
          url: '/stats',
          method: 'GET',
          params: query
        })
      }
    }
  });