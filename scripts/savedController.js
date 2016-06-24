(function(module) {
  var savedController = {};

  savedController.index = function() {
    console.log('saved view initialized');
    savedView.init();
  };

  module.savedController = savedController;
})(window);
