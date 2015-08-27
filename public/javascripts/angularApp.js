var app = angular.module("ghati", ['ngLodash', 'ui.router', 'youtube-embed', 'ghatiServices', 'ghatiControllers']);


app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
  $stateProvider.
      state('home', {
        url: '/home',
        templateUrl: '/home.html',
        controller: 'PlayerCtrl',
        resolve: {
          playlist: ['playlistLoader', function(playlistLoader) {
            return playlistLoader.loadPlaylist();
          }]
        }
      });
  $urlRouterProvider.otherwise('home');
}]);