'use strict';

describe('Controller: FruitCtrl', function () {

  // load the controller's module
  beforeEach(module('frontierApp'));

  var FruitCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    FruitCtrl = $controller('FruitCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
