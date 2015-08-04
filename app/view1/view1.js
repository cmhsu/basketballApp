'use strict';

angular.module('myApp.view1', ['ngRoute'])

  .config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/view1', {
      templateUrl: 'view1/view1.html',
      controller: 'View1Ctrl'
    });
  }])

  .controller('View1Ctrl', function($scope, getPlayers, $window) {

    $scope.buildDataArray = function(data, contentTwo) {
      if (!contentTwo) {
        var pointsArray = [];
        var j = 1;
        var totalGames = data.pointsPerGame.length;
        if ($scope.numGames > totalGames) {
          $scope.numGames = totalGames;
        }
        if (data.pointsPerGame.length >= $scope.numGames) {
          for (var i = data.pointsPerGame.length - $scope.numGames; i < data.pointsPerGame.length; i++) {
            pointsArray.push([j, data.pointsPerGame[i].pTS]);
            j++;
          }
        } else {
          for (var i = 0; i < data.pointsPerGame.length; i++) {
            pointsArray.push([i+1, data.pointsPerGame[i].pTS]);
          }
        }
        return pointsArray;
      } else { //if contentTwo
        var pointsArray = [];
        var j = 1;
        var totalGames = data.gameLogs.length;
        if ($scope.numGamesTwo >= totalGames) {
          $scope.numGamesTwo = totalGames;
        }
        if (data.gameLogs.length >= $scope.numGamesTwo) {
          for (var i = data.gameLogs.length - $scope.numGamesTwo; i < data.gameLogs.length; i++) {
            pointsArray.push([j, data.gameLogs[i].plusMinus]);
            j++;
          }
        } else {
          for (var i = 0; i < data.gameLogs.length; i++) {
            pointsArray.push([i+1, data.gameLogs[i].plusMinus]);
          }
        }
        console.log(pointsArray);
        return pointsArray;
      }
    };

    $scope.displayChart = function(data, contentTwo) {
      //var data = pointsArray;
      //var data = data;
      //console.log(data, 'hi there');
      var pointsArray = $scope.buildDataArray(data, contentTwo);

      $scope.pointsPerGame = pointsArray;

      var margin = {top: 30, right: 15, bottom: 60, left: 300}
        , width = 960 - margin.left - margin.right
        , height = 550 - margin.top - margin.bottom;

      var x = d3.scale.linear()
        .domain([0, d3.max(pointsArray, function(d) { return d[0]; })])
        .range([ 0, width ]);

      if (!contentTwo) {
        var y = d3.scale.linear()
          .domain([0, d3.max(pointsArray, function(d) { return d[1]; })])
          .range([ height, 0 ]);
      } else {
        var y = d3.scale.linear()
          .domain([d3.min(pointsArray, function(d) { return d[1]}), d3.max(pointsArray, function(d) { return d[1]; })])
          .range([ height, 0 ]);
      }

      if (!contentTwo) {
        var chart = d3.select('.content').html('')
          .append('svg:svg')
          .attr('width', width + margin.right + margin.left)
          .attr('height', height + margin.top + margin.bottom)
          .attr('class', 'chart');
      } else {
        var chart = d3.select('.contentTwo').html('')
          .append('svg:svg')
          .attr('width', width + margin.right + margin.left)
          .attr('height', height + margin.top + margin.bottom)
          .attr('class', 'chart');
      }

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
        .text('testing')
        .call(xAxis);

      main.append("text")
        .attr("transform", "translate(" + (width / 2) + " ," + (height + margin.bottom/1.5) + ")")
        .style("text-anchor", "middle")
        .text("Game Number");

      // draw the y axis
      var yAxis = d3.svg.axis()
        .scale(y)
        .orient('left');

      main.append('g')
        .attr('transform', 'translate(0,0)')
        .attr('class', 'main axis date')
        .call(yAxis);

      if (!contentTwo) {
        main.append("text")
          .attr("transform", "rotate(-90)")
          .attr("y", 0 - margin.left/5)
          .attr("x",0 - (height / 2))
          .attr("dy", "1em")
          .style("text-anchor", "middle")
          .text("Points Scored");
      } else {
        main.append("text")
          .attr("transform", "rotate(-90)")
          .attr("y", 0 - margin.left/5)
          .attr("x",0 - (height / 2))
          .attr("dy", "1em")
          .style("text-anchor", "middle")
          .text("Plus-Minus");
      }

      var g = main.append("svg:g");

      g.selectAll("dots")
        .data(pointsArray)
        .enter().append("svg:circle")
        .attr("cx", function (d,i) { return x(d[0]); } )
        .attr("cy", function (d) { return y(d[1]); } )
        .attr("r", 6);
    }; //$scope.displayChart method ends here.

    $scope.getData = function(query) {
      getPlayers.get(query).success(function(data) {
        //var stats = data.overviewSeasonAvg[0];
        $scope.data = data;
        $scope.info = data.playerInfo;
        $scope.profile = data.playerProfile;
        $scope.careerAvg = data.careerAvg;
        $scope.dataTwo = data.dataTwo || undefined;
        $scope.numGames = 100;
        $scope.numGamesTwo = 10;
        //$scope.pointsPerGame = data.pointsPerGame;

        if (data.playerInfo != undefined) {
          $scope.id = data.playerInfo.personId;
          $scope.displayChart(data);
          $scope.displayChart(data, true);
          //$window.pointsPerGame = pointsArray;

          //D3//////////////////////////////////////////////////////////////


        } else {
          $scope.id = undefined;
        }
        $scope.idExists = !!$scope.id ? true : false;
      });

    };

  });



