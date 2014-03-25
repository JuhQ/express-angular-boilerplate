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
