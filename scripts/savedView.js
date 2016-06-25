(function(module){
  // console.log('it loads!');

  var savedView = {};
  // console.log(Ride.all);

  savedView.init = function() {
    console.log('saved view init');
    $('section').hide();
    $('#saved').show();
    $('#savedContainer').empty();
    console.log('----- should empty saved');
    loadSavedArray();
    Ride.fetchAll(savedView.appendRides);
  };

  Ride.prototype.savedToHtml = function() {
    // console.log('saved to html');
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
      $('#savedContainer').append(Ride.all[ride -1].savedToHtml());
    });
  };

  module.savedView = savedView;

})(window);
