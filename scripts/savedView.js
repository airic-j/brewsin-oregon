(function(module){
  // console.log('it loads!');

  var savedView = {};
  console.log(Ride.all);

  savedView.init = function() {
    $('section').hide();
    $('#saved').show();
    $('#saved').empty();
    loadSavedArray();
    Ride.fetchAll(savedView.appendRides);
    console.log('should load the saved ride view');
  };

  Ride.prototype.savedToHtml = function() {
    console.log('saved to html');
    var savedTemplate = $('#savedRidesTemplate').html();
    var savedRidesTemplate = Handlebars.compile(savedTemplate);
    var html = savedRidesTemplate(this);
    return(html);
  };


  function loadSavedArray() {
    if(localStorage.getItem('savedRides') != null) {
      Ride.savedRides = JSON.parse(localStorage.getItem('savedRides'));
    }
  };

  savedView.appendRides = function() {
    console.log(Ride.savedRides);
    Ride.savedRides.forEach(function(ride){
      console.log('appending ' + ride);
      console.log(typeof Ride.all[ride-1]);
      $('#saved').append(Ride.all[ride -1].savedToHtml());
    });
  };

  module.savedView = savedView;

})(window);
