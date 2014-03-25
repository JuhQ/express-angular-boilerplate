app.filter('filter', function() {
  return function(text) {
    return String(text);
  };
});
