angular.module('sampleApp')
  .config(function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/login');

    $stateProvider

      .state('login', {
        url: '/login',
        templateUrl: 'client/login/login.html'
      })

      /*.state('register', {
        url: '/register',
        templateUrl: 'client/register/register.html'
      })*/

      .state('app', {
        url: '/app',
        templateUrl: 'client/navigation/navigation.html'
      })

      .state('app.home', {
        url: '/home',
        templateUrl: 'client/home/home.html'
      })

      .state('admin', {
        url: '/admin',
        templateUrl: 'admin/admin.html'
      });
  }).run(function($http, $window, $rootScope, $state) {
    var token = $window.localStorage.getItem('auth_token');
    $http.defaults.headers.common['x-access-token'] = token;
  });