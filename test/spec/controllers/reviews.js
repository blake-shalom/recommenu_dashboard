'use strict';

describe('Controller: ReviewsctrlCtrl', function () {

  // load the controller's module
  beforeEach(module('recommenuClientDashApp'));

  var ReviewsctrlCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ReviewsctrlCtrl = $controller('ReviewsctrlCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
