var ghatiControllers = angular.module('ghatiControllers', []);

ghatiControllers.controller('PlayerCtrl', ['$scope', 'playlistLoader', 'playlist', 'lodash', '$localStorage', '$sessionStorage',  function($scope, playlistLoader, playlist, lodash, $localStorage, $sessionStorage) {
  var currentIndex = 0;
  playlist = lodash.shuffle(playlist);
  $scope.currentVideo = {
    object: playlist[currentIndex],
    url: playlist[currentIndex].file,
    index: 0,
    player: null,
    videoDisplayed: true,
    height: '390px',
    width: '640px'
  };

  $scope.loopingOn = $localStorage.loopingOn;

  $scope.playlist = playlist;

  $scope.$on('youtube.player.ready', function($event, player) {
    $scope.currentVideo.object.beingPlayed = true;
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
    $localStorage.loopingOn = $scope.loopingOn;
  };

  $scope.playNext = function(player) {
    playNext(player, true);
  };

  $scope.playPrevious = function(player) {
    playNext(player, false, true);
  };

  $scope.playSelectedTrack = function(track, player) {
    var targetIndex = playlist.indexOf(track);
    $scope.currentVideo.object.beingPlayed = false;
    $scope.currentVideo.index = targetIndex;
    currentIndex = targetIndex;
    $scope.currentVideo.object = playlist[targetIndex];
    $scope.currentVideo.url = $scope.currentVideo.object.file;
    $scope.currentVideo.object.beingPlayed = true;
    player.playVideo();
  };

  $scope.toggleVideoDisplay = function(player) {
    if(!$scope.currentVideo.videoDisplayed) {
      player.setSize('640px', '390px');
      $scope.currentVideo.width = '640px';
      $scope.currentVideo.height = '390px';
      $scope.currentVideo.videoDisplayed = true;
    } else {
      player.setSize('0px', '0px');
      $scope.currentVideo.width = '0px';
      $scope.currentVideo.height = '0px';
      $scope.currentVideo.videoDisplayed = false;
    }
  };

  function playNext(player, playNext, playPrevious) {
    if(currentIndex < playlist.length - 1){
      $scope.currentVideo.object.beingPlayed = false;
      $scope.currentVideo.object.completed = true;
      if(playNext || playPrevious) {
        playNext ? (currentIndex += 1) : (currentIndex -= 1);
      } else {
        currentIndex += ($scope.loopingOn ? 0 : 1);
      }
      $scope.currentVideo.index = currentIndex;
      $scope.currentVideo.object = playlist[currentIndex];
      $scope.currentVideo.url = $scope.currentVideo.object.file;
      $scope.currentVideo.object.beingPlayed = true;
      player.playVideo();
    }
  }

}]);

ghatiControllers.filter('extract', function() {
  return function(input, component) {
    switch(component) {
      case 'trackTitle': return input.split('--')[0];
      case 'movieName' : return input.split('--')[2];
      case 'duration'  : {
        var min = Math.floor(+input / 60);
        var seconds = +input - min * 60;
        return (seconds==0) ? (min.toString() + "m") : (min.toString() + ":" + seconds.toString() + "m");
      }
    }
  }
});