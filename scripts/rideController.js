(function(module) {

  var rideController = {};

  Ride.createTable();
  Ride.fetchAll(rideView.appendRides);


  rideController.index = function() {
    // console.log('should initialize ride preview for index');
    rideView.init();
  };

  module.rideController = rideController;
})(window);
