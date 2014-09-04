'use strict';

describe('Service: DashboardService', function () {

  // load the service's module
  beforeEach(module('recommenuClientDashApp'));

  // instantiate service
  var DashboardService;
  beforeEach(inject(function (_DashboardService_) {
    DashboardService = _DashboardService_;
  }));

  it('should do something', function () {
    expect(!!DashboardService).toBe(true);
  });

});
