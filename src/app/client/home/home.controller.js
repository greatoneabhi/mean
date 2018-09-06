(function() {
  'use strict';

  angular.module('sampleApp')
    .controller('homeController', ['$scope', '$http', '$state', '$window', function($scope, $http, $state, $window) {

      console.log("Home controller");
      var homeCtrl = this;
      homeCtrl.confirmationDialogConfig = {};

      homeCtrl.testData = [];

      /*angular.forEach(homeCtrl.testData, function(value, index) {
        //console.log(homeCtrl.testData[index].name + ' ' + index);
        $http.post('/api/users', homeCtrl.testData[index])
          .then(function(response) {
            console.log("success")
        }).catch(function(error) {
            console.log(error);
        });
      });*/

      homeCtrl.employees = [];

      $http.get('/api/users')
        .then(function(response) {
          console.log("Users list: ", response.data);
          homeCtrl.employees = response.data;
        }).catch(function(error) {
          console.log(error);
        });

      homeCtrl.confirmationDialog = function(employee, action) {
        homeCtrl.confirmationDialogConfig = {
          title: "Caution!!!",
          message: "Are you sure you want to give the coupon?",
          data: employee,
          button: {
            label: "OK",
            action: action
          }
        };
        homeCtrl.showDialog(true);
      };

      homeCtrl.executeDialogAction = function(action, data) {
        switch (action) {
          case "availSnacksCoupon":
            homeCtrl.availSnacksCoupon(data);
            break;
          case "availDinnerCoupon":
            homeCtrl.availDinnerCoupon(data);
            break;
        }

      };

      homeCtrl.availSnacksCoupon = function(employee) {
        console.log("Gine snacks coupon to: ", employee);
        homeCtrl.showDialog();
      }

      homeCtrl.availDinnerCoupon = function(employee) {
        console.log("Give dinner coupon to: ", employee);
        homeCtrl.showDialog();
      }

      homeCtrl.submit = function() {
        console.log("search");
      };

      homeCtrl.showDialog = function(flag) {
        jQuery("#confirmation-dialog .modal").modal(flag ? 'show' : 'hide');
      };

    }]);
})();