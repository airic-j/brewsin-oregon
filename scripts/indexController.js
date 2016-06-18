(function(module) {
  var indexController = {};

  indexController.index = function() {
    console.log('index initialized');
    indexView.init();
  };

  module.indexController = indexController;
})(window);
