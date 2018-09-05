(function() {
  'use strict';

  angular.module('sampleApp')
    .controller('navigationController', ['$scope', '$http', '$state', function($scope, $http, $state, $window) {
      console.log('navigation controller');
    }]);

})();