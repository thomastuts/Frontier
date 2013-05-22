'use strict';

describe('Controller: GithubCtrl', function () {

  // load the controller's module
  beforeEach(module('frontierApp'));

  var GithubCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    GithubCtrl = $controller('GithubCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
