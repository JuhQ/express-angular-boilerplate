app = angular.module('app', [
  'ui.router'
  'ui.router.compat'
])

app.config ($stateProvider) ->
  $stateProvider
    .state 'index',
      url: ''
      templateUrl: 'index.html'
      controller: 'index'

app.run()