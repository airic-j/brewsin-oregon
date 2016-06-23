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
    console.log('initMap on adminpage called');
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
  }


  // display the route
  function calculateAndDisplayRoute(directionsService, directionsDisplay) {
    directionsService.route({
      origin: document.getElementById('startAddress').value,
      destination: document.getElementById('endAddress').value,
      travelMode: google.maps.TravelMode.BICYCLING,
      unitSystem: google.maps.UnitSystem.IMPERIAL
    }, function(response, status) {
      if (status === google.maps.DirectionsStatus.OK) {
        directionsDisplay.setDirections(response);
        rideRoute = response;
        console.log(rideRoute);
        $('#routeStartId').val(JSON.stringify(rideRoute.geocoded_waypoints[0].place_id));
        $('#routeEndId').val(JSON.stringify(rideRoute.geocoded_waypoints[rideRoute.geocoded_waypoints.length -1].place_id));
        $('#routeDistance').val(JSON.stringify(rideRoute.routes[0].legs[0].distance.text));
        $('#routeDuration').val(JSON.stringify(rideRoute.routes[0].legs[0].duration.text));

      } else {
        window.alert('Directions request failed due to ' + status);
      }
    });
  }

  // end maps

  function newRide(event) {
    event.preventDefault();
    var thisRide = {};
    thisRide.name = $('#routeName').val();
    thisRide.rideImage1 = $('#routeImg1').val();
    thisRide.rideImage2 = $('#routeImg2').val();
    thisRide.rideImage3 = $('#routeImg3').val();
    thisRide.description = $('#routeDesc').val();
    thisRide.difficulty = $('#routeDifficulty').val();
    thisRide.elevation = $('#routeElevation').val();
    thisRide.start = thisRide.start = $('#routeStartCity').val();
    thisRide.end = thisRide.end = $('#routeEndCity').val();

    thisRide.mapStart = rideRoute.geocoded_waypoints[0].place_id;
    thisRide.mapEnd = rideRoute.geocoded_waypoints[rideRoute.geocoded_waypoints.length -1].place_id;
    thisRide.distance = rideRoute.routes[0].legs[0].distance.text;
    thisRide.duration = rideRoute.routes[0].legs[0].duration.text;

    // thisRide.routeDetails = JSON.stringify(rideRoute.routes[0].legs[0]);

    newRide = new Ride(thisRide)
    newRide.insertRecord();
    $('#rides').append(newRide.toHtml());
  }

  module.adminView = adminView;

})(window);
