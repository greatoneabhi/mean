(function() {
  'use strict';

  angular.module('sampleApp')
    .controller('loginController', ['$scope', '$http', '$state', '$window', function($scope, $http, $state, $window) {
      console.log("loginController");

      var loginCtrl = this;
      loginCtrl.alert = null;
      
      loginCtrl.submit = function() {
        console.log(loginCtrl.login);
        $http.post('http://port-8081.buyceps-abhikrsingh05446337.codeanyapp.com/api/authenticate', loginCtrl.login)
          .then(function(response) {
            if (response.data.isAdmin) {
              $state.go('admin');
            } else {
              $state.go('app.home');
            }
          }).catch(function(err) {
            loginCtrl.alert = {
              type: 'danger',
              msg: err.data.message
            };
          });
      };

    }]);
})();