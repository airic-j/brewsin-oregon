(function(module) {
  var indexController = {};

  indexController.index = function() {
    console.log('should initialize indexController init');
    rideModule.init();
  };
  
  module.indexController = indexController;
})(window);
