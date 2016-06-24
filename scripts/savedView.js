(function(module){
  // console.log('it loads!');

  var savedView = {};

  savedView.init = function() {
    $('section').hide();
    $('#saved').show();
    console.log('should load the saved ride view');
  };

  indexView.appendSavedRide = function(id) {
    // console.log(Ride.all);
    console.log('saved ride show');
  };

  module.savedView = savedView;

})(window);
