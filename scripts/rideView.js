(function(module){

  rideView = {};


  // Ride function method for turning rides json data into HTML
  Ride.prototype.toHtml = function() {
    // console.log('using handlebars');
    var indexTemplate = $('#rideTemplate').html();
    var rideTemplate = Handlebars.compile(indexTemplate);
    var html = rideTemplate(this);
    return(html);
  };

  rideView.appendRides = function() {
    // console.log('populate the rides by appending');
    // put each JSON element into the projects array after making it a Project object
    ridesArray = Ride.all.forEach(function(ride){
      $('#rides').append(ride.toHtml());
    });
  };


  rideView.init = function() {
    // console.log('rendering rideview.preview');
    $('section').hide();
    $('#rides').show();
  };



  module.rideView = rideView;

})(window);
