(function(module) {

  var rideDetailController = {};

  rideDetailController.index = function(ctx) {
    indexController.index();
    // console.log('should initialize ride Detail view');
    var id = ctx.params.id;
    // console.log('page is ' + id);
    rideDetailView.init(id);
  };

  module.rideDetailController = rideDetailController;
})(window);
