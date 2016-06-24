(function(module){

  rideView = {};

  rideView.init = function() {
    // console.log('rendering rideview');
    $('section').hide();
    $('#rides').show();
  };

  // Ride function method for turning rides json data into HTML
  Ride.prototype.toHtml = function() {
    var indexTemplate = $('#rideTemplate').html();
    var rideTemplate = Handlebars.compile(indexTemplate);
    var html = rideTemplate(this);
    return(html);
  };

  rideView.appendRides = function() {
    // console.log('populate the rides by appending');
    // put each JSON element into the projects array after making it a Project object
    ridesArray = Ride.all.forEach(function(ride){
      // console.log(ride);
      $('#rides').append(ride.toHtml());
    });
    // question: is this OK here? I need it fired after rides are created
    indexView.appendFeaturedRide(Math.floor(Math.random() * Ride.all.length));
  };

  module.rideView = rideView;

})(window);
