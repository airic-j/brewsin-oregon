(function(module){
  // console.log('it loads!');

  var indexView = {}

  indexView.init = function() {
    $('section').hide();
    $('#home').show();
    // console.log('should load the index');
  }

  Ride.prototype.featuredToHtml = function() {
    // console.log('using handlebars on index');
    var featuredRideTemplate = $('#featuredRide').html();
    var compiledFeatureTemplate = Handlebars.compile(featuredRideTemplate);
    var html = compiledFeatureTemplate(this);
    return(html);
  };

  indexView.appendFeaturedRide = function(id) {
    // console.log(Ride.all);
    featuredRide = Ride.all[id];
    // console.log(featuredRide);
    $('#home-header').append(featuredRide.featuredToHtml());
  };

  module.indexView = indexView;

})(window);
