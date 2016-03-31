var app = angular.module("angularshop", ['ngRoute']).config(function($routeProvider) {
    $routeProvider
        .when('/user', {
            templateUrl: "src/views/user.html",
            controller: "shopController"
        })
        .when('/admin', {
            templateUrl: "src/views/admin.html",
            controller: "shopController"

        })
        .otherwise({
            redirectTo: '/user'
        })

}).filter('getById', function() {

     /**
     * Returns the element with specified id if existing
     * @param {Array} input
     * @param {Number} id
     * @return {Object}
     */

    return function(input, id) {
        var i = 0,
            len = input.length;
        for (; i < len; i++) {
            if (+input[i].id == +id) {
                return input[i];
            }
        }
        return null;
    }

}).service('itemService', function($filter, $rootScope) {

    /**
     * Service to manage Product List
     */


    var list = [{
        "id": 1,
        "name": "Nexus 4",
        "description": "8GB",
        "price": 199,
        "sold": 327
    }, {
        "id": 7,
        "name": "Nexus 5",
        "description": "16GB",
        "price": 340,
        "sold": 354
    }, {
        "id": 3,
        "name": "Nexus 7",
        "description": "16GB",
        "price": 219,
        "sold": 323
    }, {
        "id": 4,
        "name": "iPad",
        "description": "64GB",
        "price": 430,
        "sold": 123
    }];

    /**
     * Returns the product list
     */

    this.getList = function() {
        return list;

    }

    /**
     * Adds an item to the product list
     * @param {Object} newItem
     * @return {Number} newItem.id
     */

    this.createItem = function(newItem) {

        newItem.id = this.generateId();
        console.log(newItem);
        list.push(newItem);
        return newItem.id;
    }

    /**
     * Deletes an item from the product list
     * @param {Object} item
     */

    this.deleteItem = function(item) {
        var index = list.indexOf(item);
        list.splice(index, 1);
    }


    /**
     * Updates an item in the product list
     * @param {Object} item
     */

    this.updateItem = function(item) {
        var foundItem = $filter('getById')(list, item.id);
        foundItem = angular.copy(item);

    }

    /**
     * Generates a valid and unique ID in the list
     * @return {Number} id
     */

    this.generateId = function() {
        var sortedList = $filter('orderBy')(list, "id", false);
        if (sortedList.length == 0) {
            return 1;
        }
        return sortedList[sortedList.length - 1].id + 1;
    }

    /**
     * Empties the product list
     */

    this.resetList = function() {
        list = [];
    }

}).service('cartService', function($filter, itemService) {

    /**
     * Service to manage Cart List
     */



    var cart = [];

    /**
     * Returns Cart List
     * @return {Array} cart
     */

    this.getList = function() {
        return cart;
    }

    /**
     * Adds an item to the Cart, or increase the item amount
     * @param {Object} newItem
     */

    this.addItemToCart = function(newItem) {
        var foundItem = $filter('getById')(cart, newItem.id);
        if (foundItem !== null) {
            foundItem.amount = foundItem.amount + 1;
        } else {
            newItem.amount = 1;
            cart.push(newItem);
        }

    }

    /**
     * Updates the Sold field in product list
     */

    this.updateSales = function() {
        angular.forEach(cart, function(cartItem) {
            listItem = $filter('getById')(itemService.getList(), cartItem.id);
            listItem.sold = listItem.sold + cartItem.amount;
            itemService.updateItem(listItem);
        });
    }

    /**
     * Calculates the purchase total price
     * @return {Number} total
     */

    this.calculateTotalPrice = function() {
        var total = 0;
        angular.forEach(cart, function(cartItem) {
            total = total + (cartItem.price * cartItem.amount);
        });
        return total;
    }

    /**
     * Removes a product from the Cart
     * @param {Object} item
     */

    this.removeItemFromCart = function(item) {

        var foundItem = $filter('getById')(cart, item.id);
        if (foundItem.amount > 1) {
            foundItem.amount = foundItem.amount - 1;
        } else {
            var index = cart.indexOf(foundItem);
            cart.splice(index, 1);
        }

    }

    /**
     * Performs the purchase and empties the Cart
     */

    this.checkOut = function() {

        this.updateSales();
        this.resetCart();

    }

    /**
     * Emptues the Cart
     */

    this.resetCart = function() {
        cart = [];

    };


});
