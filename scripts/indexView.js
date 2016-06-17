(function(module){
  // console.log('it loads!');
  // create Ride object
  function Ride(x) {
    this.id = x.id;
    this.title = x.title;
    this.img = x.img;
    this.description = x.description;
  }

  // Ride function method for turning rides json data into HTML
  Ride.prototype.toHtml = function() {
    // console.log('using handlebars');
    var templateScript = $('#rideTemplate').html();
    var rideTemplate = Handlebars.compile(templateScript);
    var html = rideTemplate(this);
    return(html);
  };

  rideModule = {
  rideJSON: function() {
      // console.log('inside rideJSON');
      // ajax call for project data, map to array and append as HTML to page
      $.getJSON('data/rides.json', function(rideJSON){
        // put each JSON element into the projects array after making it a Project object
        ridesArray = rideJSON.map(function(ride){
          // console.log('inside ridesArray');
          return (new Ride(ride));
        }).forEach(function(ride){
          $('#rides').append(ride.toHtml());
        });
      });
    }
  }

  rideModule.init = function() {
    // console.log('rideModule index should run');
    rideModule.rideJSON();
  }

  module.rideModule = rideModule;

})(window);
