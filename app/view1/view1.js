'use strict';

angular.module('myApp.view1', ['ngRoute'])

  .config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/view1', {
      templateUrl: 'view1/view1.html',
      controller: 'View1Ctrl'
    });
  }])

  .controller('View1Ctrl', function($scope, getPlayers, $window) {
    $scope.getData = function(query) {
      getPlayers.get(query).success(function(data) {
        //var stats = data.overviewSeasonAvg[0];
        $scope.info = data.playerInfo;
        $scope.profile = data.playerProfile;
        if (data.playerInfo != undefined) {
          $scope.id = data.playerInfo.personId;
        } else {
          $scope.id = undefined;
        }
        $scope.idExists = !!$scope.id ? true : false;
      });

    };

  });

