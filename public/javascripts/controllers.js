var ghatiControllers = angular.module('ghatiControllers', []);

ghatiControllers.controller('PlayerCtrl', ['$scope', 'playlistLoader', 'playlist', 'lodash', function($scope, playlistLoader, playlist, lodash) {
  var currentIndex = 0;
  playlist = lodash.shuffle(playlist);
  $scope.currentVideo = playlist[currentIndex];
  $scope.currentVideoUrl = $scope.currentVideo.file;
  $scope.something = 'check success';

  $scope.playlist = playlist;

  $scope.$on('youtube.player.ready', function($event, player) {
    $scope.currentVideo.beingPlayed = true;
    player.playVideo();
  });

  $scope.$on('youtube.player.ended', function($event, player) {
    playNext(player);
  });

  $scope.shuffle = function() {
    $scope.playlist = lodash.shuffle(playlist);
  };

  $scope.loopToggle = function() {
    $scope.loopingOn = !$scope.loopingOn;
  };

  function playNext(player) {
    $scope.currentVideo.beingPlayed = false;
    $scope.currentVideo.completed = true;
    currentIndex += ($scope.loopingOn ? 0 : 1);
    $scope.currentVideo = playlist[currentIndex];
    $scope.currentVideoUrl = $scope.currentVideo.file;
    player.playVideo();
  }

}]);