describe('cartService', function() {
    beforeEach(module('angularsho'));
    // Get Cart
    it('should get list', inject(function(cartService) {
        expect(cartService.getList()).toBeDefined();
    }));

    // Empties Cart
    it('reset List', inject(function(cartService) {
        cartService.resetCart();
        expect(cartService.getList().length).toBe(0);
    }));

    it('Add item', inject(function(cartService) {
        // Init Cart
        cartService.resetCart();
        // Add item to Cart
        cartService.addItemToCart({
            id: 1,
            name: "test",
            price: 234,
            sold: 123
        });
        // Test Cart length == 1
        expect(cartService.getList().length).toBe(1);

        // Add a second item to Cart
        cartService.addItemToCart({
            id: 2,
            name: "test2",
            price: 234,
            sold: 123
        });
        // Test Cart length == 2
        expect(cartService.getList().length).toBe(2);

    }));

    it('Delete Item', inject(function(cartService, itemService, $filter) {
        // Init Cart
        cartService.resetCart();
        // Add item to Cart
        var id = itemService.createItem({
            name: "test",
            price: 234,
            sold: 123
        });
        var foundItem = $filter('getById')(itemService.getList(), id)
        cartService.addItemToCart(foundItem);
        cartService.addItemToCart(foundItem);

        var itemToBeDeleted = $filter('getById')(cartService.getList(), id);


        // Test delete decrease amount but not cart length
        expect(itemToBeDeleted.amount).toBe(2);
        expect(cartService.getList().length).toBe(1);

        cartService.removeItemFromCart(itemToBeDeleted);

        // Test delete decrease cart length when item.amount == 1
        expect(itemToBeDeleted.amount).toBe(1);
        expect(cartService.getList().length).toBe(1);

        cartService.removeItemFromCart(itemToBeDeleted);

        // Test delete decrease cart length when item.amount == 1
        expect(cartService.getList().length).toBe(0);

    }));


    it('Update Sales', inject(function(cartService, itemService, $filter) {
        // Init Cart
        cartService.resetCart();
        // Add item to Cart
        var id = itemService.createItem({
            name: "test",
            price: 234,
            sold: 123
        });
        var foundItem = $filter('getById')(itemService.getList(), id);
        cartService.addItemToCart(foundItem);
        cartService.addItemToCart(foundItem);

        // Test sold increases +2 in item List
        cartService.updateSales();
        var foundUpdatedItem = $filter('getById')(itemService.getList(), id);
        expect(foundUpdatedItem.sold).toBe(125);
    }));

    it('Calculate total price', inject(function(cartService, itemService, $filter) {
        // Init Cart
        cartService.resetCart();
        // Add items to Cart
        var id = itemService.createItem({
            name: "test",
            price: 234,
            sold: 123
        });
        var id2 = itemService.createItem({
            name: "test",
            price: 67,
            sold: 123
        });

        var foundItem = $filter('getById')(itemService.getList(), id);
        var foundItem2 = $filter('getById')(itemService.getList(), id2);
        cartService.addItemToCart(foundItem);
        cartService.addItemToCart(foundItem);
        cartService.addItemToCart(foundItem2);
        cartService.addItemToCart(foundItem2);
        cartService.addItemToCart(foundItem2);
        // Test total price
        expect(cartService.calculateTotalPrice()).toBe(2*foundItem.price+3*foundItem2.price);
    }));
    

});
