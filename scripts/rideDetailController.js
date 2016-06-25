(function(module) {

  var rideDetailController = {};

  rideDetailController.index = function(ctx) {
    indexController.index();
    var id = ctx.params.id;
    rideDetailView.init(id);
  };

  module.rideDetailController = rideDetailController;
})(window);
