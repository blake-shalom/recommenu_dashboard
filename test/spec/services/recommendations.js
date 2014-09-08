'use strict';

describe('Service: Recommendations', function () {

  // load the service's module
  beforeEach(module('recommenuClientDashApp'));

  // instantiate service
  var Recommendations;
  beforeEach(inject(function (_Recommendations_) {
    Recommendations = _Recommendations_;
  }));

  it('should do something', function () {
    expect(!!Recommendations).toBe(true);
  });

});
