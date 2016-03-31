describe('angularshop', function() {
    var scope,
        controller;
    beforeEach(function() {
        module('angularshop');
    });

    describe('shopController', function() {
        beforeEach(inject(function($rootScope, $controller) {
            scope = $rootScope.$new();
            controller = $controller('shopController', {
                '$scope': scope
            });
        }));
        it('should exist', function() {
            //Test controller exists
            expect(scope).toBeDefined();
        });


    });

    it('getById filter', inject(function($filter) {
        var array = [];
        expect($filter('getById')(array, 1)).toBe(null);
        array.push({
            id: 1,
            name: "Test"
        });

        //Test filter
        expect($filter('getById')(array, 1)).not.toBe(null);
        expect($filter('getById')(array, 1).id).toBe(1);

        array.pop();
        expect($filter('getById')(array, 1)).toBe(null);

    }));


});