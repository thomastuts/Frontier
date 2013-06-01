'use strict';

describe('Controller: InspirationCtrl', function () {

  // load the controller's module
  beforeEach(module('frontierApp'));

  var InspirationCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    InspirationCtrl = $controller('InspirationCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
