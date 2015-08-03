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
        $scope.data = data;
      });

    };

  });