(function(module) {

  var rideDetailController = {};

  // this isn't the right way TODO should probably use page.js?
  // rideController.getRoute = function() {
  //     currentPath = window.location.pathname;
  //     if (currentPath != '/') {
  //       linkName = currentPath.substring(1) + '-link';
  //       document.getElementById(linkName).classList.add('selected');
  //     } else {
  //       document.getElementById('about-link').classList.add('selected');
  //     }
  //   }

  rideDetailController.index = function() {
    console.log('should initialize ride details');
  };

  // rideDetailController.index();



  module.rideDetailController = rideDetailController;
})(window);
