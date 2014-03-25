app.directive("version", function() {
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
