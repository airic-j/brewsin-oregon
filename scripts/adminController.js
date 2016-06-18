(function(module) {

  var adminController = {};

  adminController.index = function() {
    console.log('should initialize admin page');
    adminView.init();
  };

  module.adminController = adminController;
})(window);
