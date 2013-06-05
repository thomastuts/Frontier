'use strict';

describe('Controller: FirstrunCtrl', function () {

  // load the controller's module
  beforeEach(module('frontierApp'));

  var FirstrunCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    FirstrunCtrl = $controller('FirstrunCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
