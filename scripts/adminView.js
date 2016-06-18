(function(module){
  // console.log('adminview loads!');

  var adminView = {}

  adminView.init = function() {
    console.log('should load the admin page');
    $('section').hide();
    $('#admin').show();

    $('#routeSubmit').click(newRide);
  }

  function newRide(event) {
    event.preventDefault();
    console.log('rew ride');
    var thisRide = {};
    thisRide.name = $('#routeName').val();
    thisRide.img = $('#routeImg').val();
    thisRide.description = $('#routeDesc').val();
    thisRide.distance = $('#routeDistance').val();

    console.log(thisRide);

    newRide = new Ride(thisRide)
    newRide.insertRecord();
    $('#rides').append(newRide.toHtml());
  }

  module.adminView = adminView;

})(window);
