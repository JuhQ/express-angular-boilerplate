var app;

app = angular.module('app', ['ui.router', 'ui.router.compat']);

app.config(function($stateProvider) {
  return $stateProvider.state('index', {
    url: '',
    templateUrl: 'index.html',
    controller: 'index'
  });
});

app.run();
;app.controller('index', function($scope) {
  return $scope.my_function = function() {
    return console.log('yay');
  };
});
;app.directive("version", function() {
  return {
    restrict: 'E',
    scope: {
      model: '=ngModel'
    },
    link: function($scope, el, attrs) {
      return console.log('directive', el);
    }
  };
});
;app.filter('filter', function() {
  return function(text) {
    return String(text);
  };
});
;app.factory('service', function() {
  return {
    my_function: function() {
      return console.log('yay for service');
    }
  };
});
;angular.module('app').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('index.html',
    "<div class=\"container\">Index page</div>"
  );

}]);
