(function() {
  'use strict';

  angular.module('sampleApp')
    .controller('homeController', ['$scope', '$http', '$state', '$window', function($scope, $http, $state, $window) {

      console.log("Home controller");
      var homeCtrl = this;
      homeCtrl.confirmationDialogConfig = {};

      homeCtrl.testData =[];

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
          homeCtrl.employees = response.data;
        }).catch(function(error) {
          console.log(error);
        });

      homeCtrl.confirmationDialog = function(employee, action) {
        homeCtrl.confirmationDialogConfig = {
          title: "Caution!!!",
          message: "Are you sure you want to proceed?",
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
          case "availTshirt":
            homeCtrl.availTshirt(data);
            break;
          case "makeParticipant":
            homeCtrl.makeParticipant(data);
            break;
        }

      };
      
      homeCtrl.availTshirt = function(employee) {
        employee.tshirt = false;
        $http.get('/api/user/'+employee._id)
          .then(function(response) {
            console.log("User: ", response);
            if(response.data.tshirt) {
              homeCtrl.updateEmployee(employee);
            } else {
              alert("Tshirt to this signum is already availed");
            }
        }).catch(function(error) {
          console.log(error);
        });
        homeCtrl.showDialog();
      }

      homeCtrl.availSnacksCoupon = function(employee) {
        employee.snacks = false;
        console.log("Give snacks coupon to: ", employee);
        $http.get('/api/user/'+employee._id)
          .then(function(response) {
            console.log("User: ", response);
            if(response.data.snacks) {
              homeCtrl.updateEmployee(employee);
            } else {
              alert("Snacks coupon to this signum is already availed");
            }
        }).catch(function(error) {
          console.log(error);
        });
        homeCtrl.showDialog();
      }

      homeCtrl.availDinnerCoupon = function(employee) {
        employee.dinner = false;
        console.log("Give dinner coupon to: ", employee);
        $http.get('/api/user/'+employee._id)
          .then(function(response) {
            console.log("User: ", response);
            if(response.data.dinner) {
              homeCtrl.updateEmployee(employee);
            } else {
              alert("Dinner coupon to this signum is already availed");
            }
        }).catch(function(error) {
          console.log(error);
        });
        homeCtrl.showDialog();
      }
      
      homeCtrl.makeParticipant = function(employee) {
        employee.participants = true;
        homeCtrl.updateEmployee(employee);  
        homeCtrl.showDialog();
        
      }
      
      homeCtrl.updateEmployee = function(employee) {
        $http.put('/api/user', employee)
          .then(function(response) {
            alert("success")
        }).catch(function(error) {
            console.log(error);
            alert("Internal Error. Try after sometime or contact admin");
        });
      }

      homeCtrl.submit = function() {
        console.log("search");
      };

      homeCtrl.showDialog = function(flag) {
        jQuery("#confirmation-dialog .modal").modal(flag ? 'show' : 'hide');
      };

    }]);
})();
