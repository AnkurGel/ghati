var ghatiServices = angular.module('ghatiServices', []);

ghatiServices.factory('playlistLoader', ['$http', function($http) {
  var playlist = {
    videos: []
  };

  playlist.loadPlaylist = function() {
    return $http.get('/playlist.json').then(function(res) {
      return res.data.playlist;
    });
  };

  return playlist;


}]);