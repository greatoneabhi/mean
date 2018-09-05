(function() {
  'use strict';
  
  angular.module('sampleApp')
    .controller('homeController', ['$scope', '$http', '$state', '$window', function($scope, $http, $state, $window) {
      
      console.log("Home controller");
      var homeCtrl = this;
      
      homeCtrl.users = [
        {
          "signum" : "ezahmbu",
          "breakfast" : true,
          "dinner" : true
        },
        {
          "signum" : "ezahmau",
          "breakfast" : false,
          "dinner" : false
        }
      ];
      
      homeCtrl.submit = function() {
        console.log("search");
      };
    }]);
})();