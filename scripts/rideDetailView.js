(function(module){

  rideDetailView = {};

  // Ride function method for turning rides json data into HTML
  Ride.prototype.detailToHtml = function() {
    // console.log('using handlebars');
    var rideDetailTemplate = $('#rideDetailTemplate').html();
    var compiledDetailTemplate = Handlebars.compile(rideDetailTemplate);
    var html = compiledDetailTemplate(this);
    return(html);
  };

  rideDetailView.appendRides = function(id) {
    // console.log('populate the rides by appending');
    // put each JSON element into the projects array after making it a Project object
    $('#rideDetails').empty();
    rideDetailToAppend = Ride.all[id-1];
    $('#rideDetails').append(rideDetailToAppend.detailToHtml());
  };


  rideDetailView.init = function(id) {
    // console.log('rendering rideview.preview');
    rideDetailView.appendRides(id);
    $('section').hide();
    $('#rideDetails').show();
  };



  module.rideView = rideView;

})(window);
