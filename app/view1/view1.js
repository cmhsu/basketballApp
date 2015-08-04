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
        $scope.careerAvg = data.careerAvg;
        $scope.dataTwo = data.dataTwo || undefined;
        //$scope.pointsPerGame = data.pointsPerGame;
        if (data.playerInfo != undefined) {
          $scope.id = data.playerInfo.personId;
          var pointsArray = [];
          var j = 0;
          if (data.pointsPerGame.length >= 100) {
            for (var i = data.pointsPerGame.length - 100; i < data.pointsPerGame.length; i++) {
              pointsArray.push([j, data.pointsPerGame[i].pTS])
              j++;
            }
          } else {
            for (var i = 0; i < data.pointsPerGame.length; i++) {
              pointsArray.push([i, data.pointsPerGame[i].pTS]);
            }
          }
          $scope.pointsPerGame = pointsArray;
          //$window.pointsPerGame = pointsArray;

          //D3//////////////////////////////////////////////////////////////
          var data = pointsArray;

          var margin = {top: 30, right: 15, bottom: 60, left: 300}
            , width = 960 - margin.left - margin.right
            , height = 550 - margin.top - margin.bottom;

          var x = d3.scale.linear()
            .domain([0, d3.max(data, function(d) { return d[0]; })])
            .range([ 0, width ]);

          var y = d3.scale.linear()
            .domain([0, d3.max(data, function(d) { return d[1]; })])
            .range([ height, 0 ]);

          var chart = d3.select('.content').html('')
            .append('svg:svg')
            .attr('width', width + margin.right + margin.left)
            .attr('height', height + margin.top + margin.bottom)
            .attr('class', 'chart');

          var main = chart.append('g')
            .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
            .attr('width', width)
            .attr('height', height)
            .attr('class', 'main');

          // draw the x axis
          var xAxis = d3.svg.axis()
            .scale(x)
            .orient('bottom');

          main.append('g')
            .attr('transform', 'translate(0,' + height + ')')
            .attr('class', 'main axis date')
            .call(xAxis);

          // draw the y axis
          var yAxis = d3.svg.axis()
            .scale(y)
            .orient('left');

          main.append('g')
            .attr('transform', 'translate(0,0)')
            .attr('class', 'main axis date')
            .call(yAxis);

          var g = main.append("svg:g");

          g.selectAll("dots")
            .data(data)
            .enter().append("svg:circle")
            .attr("cx", function (d,i) { return x(d[0]); } )
            .attr("cy", function (d) { return y(d[1]); } )
            .attr("r", 6);


        } else {
          $scope.id = undefined;
        }
        $scope.idExists = !!$scope.id ? true : false;
      });

    };

  });



