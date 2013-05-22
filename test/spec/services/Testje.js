'use strict';

describe('Service: Testje', function () {

  // load the service's module
  beforeEach(module('frontierApp'));

  // instantiate service
  var Testje;
  beforeEach(inject(function (_Testje_) {
    Testje = _Testje_;
  }));

  it('should do something', function () {
    expect(!!Testje).toBe(true);
  });

});
