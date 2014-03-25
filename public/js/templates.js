angular.module('app').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('index.html',
    "<div class=\"container\">Index page</div>"
  );

}]);
