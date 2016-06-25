(function(module){

  var savedView = {};
  var savedNotes = {};

  savedView.init = function() {
    $('section').hide();
    $('#saved').show();
    $('#savedContainer').empty();
    loadSavedArray();
    Ride.fetchAll(savedView.appendRidesAndNotes);
  };

  Ride.prototype.savedToHtml = function() {
    var savedTemplate = $('#savedRidesTemplate').html();
    var savedRidesTemplate = Handlebars.compile(savedTemplate);
    var html = savedRidesTemplate(this);
    return(html);
  };

  savedView.loadNotes = function() {
    if (localStorage.getItem('rideNotes') != null) {
      notesToLoad = JSON.parse(localStorage.getItem('rideNotes'));
      Ride.savedRides.forEach(function(savedRide){
        if (notesToLoad[savedRide] != null) {
          Ride.all[savedRide-1].notes = notesToLoad[savedRide];
        };
      });
    }
  };

  function loadSavedArray() {
    if(localStorage.getItem('savedRides') != null) {
      Ride.savedRides = JSON.parse(localStorage.getItem('savedRides'));
    }
  };

  savedView.appendRidesAndNotes = function() {
    savedView.loadNotes();
    Ride.savedRides.forEach(function(ride){
      $('#savedContainer').append(Ride.all[ride -1].savedToHtml());
    });
    savedView.bindCommentEvent();
  };

  savedView.bindCommentEvent = function() {
    rideComments = document.getElementsByClassName('rideComment');
    for (i = 0; i < rideComments.length; i ++ ) {
      rideComments[i].addEventListener('blur',noteSubmit);
    }
  };


  function noteSubmit() {
    note = this.value;
    id = this.parentElement.getAttribute('data-id');
    savedNotes[id] = note;
    localStorage.setItem('rideNotes',JSON.stringify(savedNotes));
  };

  module.savedView = savedView;

})(window);
