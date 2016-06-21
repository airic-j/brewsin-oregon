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
    console.log('initMap called');
    var directionsService = new google.maps.DirectionsService;
    var directionsDisplay = new google.maps.DirectionsRenderer ({
      draggable: true
    });
    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 9,
      center: {lat: +45.523, lng: -122.676}
    });

    var geocoder = new google.maps.Geocoder();
    // document.getElementById('getDirections').addEventListener('click', function() {
    //     geocodeAddress(geocoder, map);
    // });
    directionsDisplay.setMap(map);

    var onChangeHandler = function() {
      calculateAndDisplayRoute(directionsService, directionsDisplay);
    };
    document.getElementById('getDirections').addEventListener('click', onChangeHandler);
    // document.getElementById('endAddress').addEventListener('change', onChangeHandler);
  }

  // get the address and encode it
  function geocodeAddress(geocoder, resultsMap) {
    var address = document.getElementById('startAddress').value;
    geocoder.geocode({'startAddress': address}, function(results, status) {
      if (status === google.maps.GeocoderStatus.OK) {
        resultsMap.setCenter(results[0].geometry.location);
        var marker = new google.maps.Marker({
          map: resultsMap,
          position: results[0].geometry.location
        });
      } else {
        alert('Geocode was not successful for the following reason: ' + status);
      }
    });
  }

  // display the route
  function calculateAndDisplayRoute(directionsService, directionsDisplay) {
    directionsService.route({
      origin: document.getElementById('startAddress').value,
      destination: document.getElementById('endAddress').value,
      travelMode: google.maps.TravelMode.BICYCLING
    }, function(response, status) {
      if (status === google.maps.DirectionsStatus.OK) {
        directionsDisplay.setDirections(response);
        console.log(response);
      } else {
        window.alert('Directions request failed due to ' + status);
      }
    });
  }

  // end maps

  function newRide(event) {
    event.preventDefault();
    console.log('rew ride');
    var thisRide = {};
    thisRide.name = $('#routeName').val();
    thisRide.img = $('#routeImg').val();
    thisRide.description = $('#routeDesc').val();
    thisRide.distance = $('#routeDistance').val();
    // TODO save response object in db for map, then render maps based on object

    console.log(thisRide);

    newRide = new Ride(thisRide)
    newRide.insertRecord();
    $('#rides').append(newRide.toHtml());
  }

  module.adminView = adminView;

})(window);
