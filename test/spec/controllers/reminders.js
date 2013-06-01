'use strict';

describe('Controller: RemindersCtrl', function () {

  // load the controller's module
  beforeEach(module('frontierApp'));

  var RemindersCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    RemindersCtrl = $controller('RemindersCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
