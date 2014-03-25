app.directive "version", ->
  restrict: 'E'
  scope:
    model: '=ngModel'
  link: ($scope, el, attrs) ->
    console.log('directive', el)