(function(module){
  // console.log('adminview loads!');

  var adminView = {}

  adminView.init = function() {
    console.log('should load the admin page');
    $('section').hide();
    $('#admin').show();
    $('#routeSubmit').click(newRide);
  }

// start map
  var map;

  // initialize map and other details
  adminView.initMap = function() {
    // console.log('initMap on adminpage called');
    var directionsService = new google.maps.DirectionsService;
    var directionsDisplay = new google.maps.DirectionsRenderer ({
      draggable: true
    });
    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 9,
      center: {lat: +45.523, lng: -122.676}
    });

    directionsDisplay.setMap(map);

    var onChangeHandler = function() {
      console.log('inside onChangeHandler');
      calculateAndDisplayRoute(directionsService, directionsDisplay);
    };

    // return directions on click
    document.getElementById('getDirections').addEventListener('click', onChangeHandler);

    // TODO make it possible to drag the directions

    var startInput = document.getElementById('startAddress');
    var endInput = document.getElementById('endAddress');
    var waypointInputs = document.getElementById('waypoints').children;

    var startAutocomplete = new google.maps.places.Autocomplete(startInput);
    var endAutocomplete = new google.maps.places.Autocomplete(endInput);

  }


  // display the route
  function calculateAndDisplayRoute(directionsService, directionsDisplay) {

    waypointValues = [];

    function renderWaypoints() {
      x = document.getElementById('waypoints').children;
      for (i = 0; i < x.length; i ++) {
        waypointValues.push({
          location: x[i].value,
          stopover: true
        });
      }
    };
    renderWaypoints();

    directionsService.route({
      origin: document.getElementById('startAddress').value,
      destination: document.getElementById('endAddress').value,
      travelMode: google.maps.TravelMode.BICYCLING,
      unitSystem: google.maps.UnitSystem.IMPERIAL,
      waypoints: waypointValues
    }, function(response, status) {
      if (status === google.maps.DirectionsStatus.OK) {
        directionsDisplay.setDirections(response);
        rideRoute = response;
        console.log(rideRoute);
        $('#routeStartId').val(JSON.stringify(rideRoute.geocoded_waypoints[0].place_id));
        $('#routeEndId').val(JSON.stringify(rideRoute.geocoded_waypoints[rideRoute.geocoded_waypoints.length -1].place_id));
        console.log('should run get start lat');
        getStartLatLng(rideRoute.geocoded_waypoints[0].place_id);
        getDistance(rideRoute);
        $('#routeDistance').val(adminView.totalDistance);
      } else {
        window.alert('Directions request failed due to ' + status);
      }
    });
  }

  var addWaypoint = function() {
    console.log('addwaypoint');
    var input = document.createElement('input');
    input.type = "text";
    input.name = "waypoint";
    input.placeholder = "waypoint";
    document.getElementById('waypoints').appendChild(input);
    var waypointAutocomplete = new google.maps.places.Autocomplete(input);
  }

  function getStartLatLng(start) {
    $.ajax({
      url: 'https://maps.googleapis.com/maps/api/geocode/json?place_id=' + start + '&key=AIzaSyChN4izM35xnsX--Lz2AnR304UhyRC50SE'
      , success: function(response){
        console.log(response.results[0].geometry.location);
        adminView.rideStartLatLng = response.results[0].geometry.location;
        }
      , error: console.log('error in ajax call')
    });
  }

  document.getElementById('createWaypoint').addEventListener('click', addWaypoint);

  function getDistance(response) {
    legs = response.routes[0].legs;
    adminView.totalDistance = legs.reduce(function(acc, leg){
      console.log('leg',leg);
      console.log('acc',acc);
      acc = acc + parseInt(leg.distance.text.split(/[ ,]+/)[0],10);
      return acc;
    }, 0)
  };

  // end maps

  function newRide(event) {
    console.log(rideRoute);
    event.preventDefault();
    var thisRide = {};
    thisRide.name = $('#routeName').val();
    thisRide.rideImage1 = $('#routeImg1').val();
    thisRide.rideImage2 = $('#routeImg2').val();
    thisRide.rideImage3 = $('#routeImg3').val();
    thisRide.description = $('#routeDesc').val();
    this.teaser = $('#routeTeaser').val();
    thisRide.difficulty = $('#routeDifficulty').val();
    thisRide.elevation = $('#routeElevation').val();
    thisRide.start = $('#routeStartCity').val();
    thisRide.end = $('#routeEndCity').val();
    thisRide.mapStart = rideRoute.geocoded_waypoints[0].place_id;
    thisRide.mapStartLatLng = JSON.stringify(adminView.rideStartLatLng);
    thisRide.mapWaypoints = JSON.stringify(rideRoute.request.waypoints);
    thisRide.mapEnd = rideRoute.geocoded_waypoints[rideRoute.geocoded_waypoints.length -1].place_id;
    thisRide.distance = adminView.totalDistance;

    newRide = new Ride(thisRide)
    newRide.insertRecord();
    $('#rides').append(newRide.toHtml());
  }

  module.adminView = adminView;

})(window);
