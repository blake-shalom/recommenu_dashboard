'use strict';

describe('Controller: DashctrlCtrl', function () {

  // load the controller's module
  beforeEach(module('recommenuClientDashApp'));

  var DashctrlCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    DashctrlCtrl = $controller('DashctrlCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
