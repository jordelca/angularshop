describe('itemService', function() {
    beforeEach(module('angularshop'));
    // Get List
    it('should get list', inject(function(itemService) {
        expect(itemService.getList()).toBeDefined();
    }));

    // Empties Cart
    it('reset List', inject(function(itemService) {
        itemService.resetList();
        expect(itemService.getList().length).toBe(0);
    }));

    it('Add item', inject(function(itemService) {
        // Init List
        itemService.resetList();
        // Add item to list
        itemService.createItem({
            name: "test",
            price: 234,
            sold: 123
        });

        // Test List length == 1
        expect(itemService.getList().length).toBe(1);

        // Add item to list
        itemService.createItem({
            name: "test",
            price: 234,
            sold: 123
        });
        // Test List length == 1
        expect(itemService.getList().length).toBe(2);

    }));

    it('Delete Item', inject(function(itemService, $filter) {
        // Add item to list
        var id = itemService.createItem({
            name: "test",
            price: 234,
            sold: 123
        });

        // Init List
        itemService.resetList();
        var itemToBeDeleted = $filter('getById')(itemService.getList(), id);
        itemService.deleteItem(itemToBeDeleted);

        // Test List length == 1 after deleting 
        expect(itemService.getList().length).toBe(0);
        // Test deleted item cannot be found
        expect($filter('getById')(itemService.getList(), id)).toBe(null);
    }));

    it('Unique ID', inject(function(itemService, $filter) {
        var generatedId = itemService.generateId();
        // Test generated ID does not exist in list
        expect($filter('getById')(itemService.getList(), generatedId)).toBe(null);
    }));

    it('Update', inject(function(itemService, $filter) {
        // Add item to list
        var id = itemService.createItem({
            name: "test",
            price: 234,
            sold: 123
        });
        var foundItem = $filter('getById')(itemService.getList(), id);
        expect(foundItem).not.toBe(null);
        foundItem.price = 169;
        itemService.updateItem(foundItem);
        // Test old item cannot be found
        expect(foundItem).toEqual($filter('getById')(itemService.getList(), id));
        // Test the item in the list has the new value
        expect(foundItem.price).toBe($filter('getById')(itemService.getList(), id).price);
    }));

});


