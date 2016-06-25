(function(module){

  rideDetailView = {};

  // Ride function method for turning rides json data into HTML
  Ride.prototype.detailToHtml = function() {
    // console.log('using handlebars');
    var rideDetailTemplate = $('#rideDetailTemplate').html();
    var compiledDetailTemplate = Handlebars.compile(rideDetailTemplate);
    // console.log(this.description);
    this.description = marked(this.description);
    var html = compiledDetailTemplate(this);
    // console.log(this.description);
    return(html);
  };

  rideDetailView.appendRides = function(id) {
    // console.log('populate the rides by appending');
    // put each JSON element into the projects array after making it a Project object
    $('#rideDetails').empty();
    rideDetailToAppend = Ride.all[id-1];
    $('#rideDetails').append(rideDetailToAppend.detailToHtml());
  };

  rideDetailView.loadSaved = function() {
    // console.log('------- this ride ' + rideDetailToAppend.id);
    // console.log(Ride.savedRides);
    // console.log($.inArray(rideDetailToAppend.id,Ride.savedRides));
    if ($.inArray(rideDetailToAppend.id,Ride.savedRides)>-1) {
      // console.log('this ride was saved');
      document.getElementById('heart').classList.add('saved');
    }
  };

  rideDetailView.appendStopovers = function(waypoints) {
    stopoverHTML = document.getElementById('rideLocations');
    if(waypoints.length>0) {
      // console.log('has waypoints, append');
      for(i = 0; i < waypoints.length; i ++) {
        var li = document.createElement('li');
        // console.log(waypoints[i].location);
        li.innerHTML = waypoints[i].location;
        stopoverHTML.appendChild(li);
      }
    } else {
      // console.log('no waypoints, empty');
      stopoverHTML.innerHTML = '';
    }
  };

  rideDetailView.initMap = function() {
    // console.log('initMap on rideDetailView called');
    var directionsService = new google.maps.DirectionsService;
    var directionsDisplay = new google.maps.DirectionsRenderer;
    var map = new google.maps.Map(document.getElementById('rideDetailMap'), {
      zoom: 9,
      center: {lat: +45.523, lng: -122.676},
      scrollwheel: false
    });
    directionsDisplay.setMap(map);

    // initialize the map!
    rideDetailView.calculateAndDisplayRoute(directionsService, directionsDisplay);
  };

  rideDetailView.calculateAndDisplayRoute = function(directionsService, directionsDisplay) {
    waypointObject = JSON.parse(rideDetailToAppend.mapWaypoints);
    waypointValues =
    waypointObject.map(function(waypoint){
      return {
        location: waypoint.location,
        stopover: true
      };
    });
    rideDetailView.appendStopovers(waypointValues);

    directionsService.route({
      origin: {'placeId': rideDetailToAppend.mapStart},
      destination: {'placeId': rideDetailToAppend.mapEnd},
      travelMode: google.maps.TravelMode.BICYCLING,
      unitSystem: google.maps.UnitSystem.IMPERIAL,
      waypoints: waypointValues
    }, function(response, status) {
      if (status === google.maps.DirectionsStatus.OK) {
        directionsDisplay.setDirections(response);
        // console.log(response);
      } else {
        window.alert('Directions request failed due to ' + status);
      }
    });
  };

  rideDetailView.getWeather = function () {
    var startLocation = JSON.parse(rideDetailToAppend.mapStartLatLng);
    var weatherAPI = 'http://api.wunderground.com/api/c57bffbbb79db788/conditions/q/' + startLocation.lat + ',' + startLocation.lng + '.json';
    var weatherSuccess = function(data) {
      // console.log(data.current_observation.temp_f);
      document.getElementById('currentTemp').innerHTML = ('Currently ' + Math.round(data.current_observation.temp_f) + '&#176; F');
    };//end
    $.getJSON(weatherAPI, weatherSuccess);
  };

  function saveRide(e) {
    saveLink = document.getElementById('heart');
    // console.log(saveLink);
    e.preventDefault();
    ride = e.target.baseURI.split('rides/')[1];
    if (saveLink.classList.contains('saved')) {
      // console.log('was saved, now remove ' + ride);
      saveLink.classList.remove('saved');
      storeSaved(ride,'remove');
    }
    else {
      // console.log('wasnt saved, now save ' + ride);
      saveLink.classList.add('saved');
      storeSaved(ride,'add');
    }
  }

  function storeSaved(ride,action) {
    // console.log('store saved');
    if (action == 'add') {
      Ride.savedRides.push(parseInt(ride));
    } else if (action == 'remove') {
      Ride.savedRides.splice(Ride.savedRides.indexOf(ride,1));
    }
    localStorage.setItem('savedRides',JSON.stringify(Ride.savedRides));
  }

  rideDetailView.loadSavedArray = function() {
    if(localStorage.getItem('savedRides') != null) {
      // console.log('theres a saved ride');
      Ride.savedRides = JSON.parse(localStorage.getItem('savedRides'));
      // console.log(Ride.savedRides);
    }
  };

  rideDetailView.init = function(id) {
    // console.log('rendering ride detail view');
    $('section').hide();
    $('#rideDetails').show();
    rideDetailView.appendRides(id);
    rideDetailView.loadSavedArray();
    rideDetailView.loadSaved();
    rideDetailView.getWeather();
    rideDetailView.initMap();
    document.getElementById('heart').addEventListener('click',saveRide);
  };

  module.rideDetailView = rideDetailView;

})(window);
