'use strict';

/* Controllers */

app.controller("shopController", ["$scope", "$http", "$filter", "itemService", "cartService",
    function($scope, $http, $filter, itemService, cartService) {
        $scope.currencySymbol = "$";
        $scope.master = {};
        $scope.itemService = itemService;
        $scope.cartService = cartService;

        $scope.itemList = itemService.getList();
        $scope.cart = cartService.getList();



        $scope.checkOut = function() {
            $scope.confirmation = true;
            cartService.checkOut();
            cartService.resetCart();
        }


        $scope.addItemToCart = function(item) {
            $scope.confirmation = false;
            cartService.addItemToCart(item);
        }

        $scope.createItem = function(item) {
            itemService.createItem(item);
            $scope.resetForm();
        }

        $scope.updateItem = function(item) {
            $scope.editing = false;
        }


        $scope.resetForm = function() {
            $scope.item = angular.copy($scope.master);
        };



        $scope.startEditing = function(item) {
            $scope.editing = item.id;
            $scope.originalItem = angular.copy(item);

        };
    }


]).controller("HeaderController", ["$scope", "$location",
    function($scope, $location) {
        $scope.isActive = function(viewLocation) {

            return viewLocation === $location.path();
        };

    }
]);
