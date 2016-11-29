'use strict';

angular.module('myApp.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
}])

.controller('View1Ctrl', ['NgMap', '$http', 'currentUserService', '$timeout', function(NgMap, $http, currentUserService, $timeout) {
  NgMap.getMap().then(function(map) {

    var getScores = function(map, zipCode) {
      var center = map.getCenter();
      var url;

      if (zipCode) {
        url = "https://h5c128n3tb.execute-api.us-west-2.amazonaws.com/dev/leaderboard?zipcode=" + zipCode;
      } else {
        url = "https://h5c128n3tb.execute-api.us-west-2.amazonaws.com/dev/leaderboard?Lat=" + center.lat() + "&Long=" + center.lng() + "&Zoom=" + map.getZoom();
      }

      $http.get(url)
        .then(function (response) {
          if (!response.data.scores) { return; }
          var scores = response.data.scores;
          console.log(scores);

          var heatMapData = [];

          for (var i=0; i < scores.length; i++) {
            var score = scores[i];
            heatMapData.push({location: new google.maps.LatLng(score.coordinates.lon, score.coordinates.lat), weight: score.score});
            console.log(score.coordinates);
            if (zipCode == score.zip_code) {
              map.setCenter(new google.maps.LatLng(scores[0].coordinates.lon, scores[0].coordinates.lat));
            }
          }

          console.log(heatMapData);
          var heatmap = new google.maps.visualization.HeatmapLayer({
            data: heatMapData,
            radius: 100
          });
          heatmap.setMap(map);
        });
    };

    var timeout;
    map.addListener('idle', function() {
      getScores(map);
    });

    var user = currentUserService.get();
    var zipCode;
    if (user) {
      user.getUserAttributes(function(err, result) {
        if (err) {
          alert(err);
          return;
        }
        for (var i = 0; i < result.length; i++) {
          if (result[i].getName() == 'custom:zip_code') {
            zipCode = result[i].getValue();
            break;
          }
        }
        console.log(zipCode);
        getScores(map, zipCode);
      });
    }
  });
}]);
