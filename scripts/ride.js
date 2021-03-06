(function(module){

  // create Ride object
  function Ride(x) {
    this.id = x.id;
    this.name = x.name;
    this.rideImage1 = x.rideImage1;
    this.rideImage2 = x.rideImage2;
    this.rideImage3 = x.rideImage3;
    this.description = x.description;
    this.teaser = x.teaser;
    this.elevation = x.elevation;
    this.difficulty = x.difficulty;
    this.distance = x.distance;
    this.mapStart = x.mapStart;
    this.mapStartLatLng = x.mapStartLatLng;
    this.mapWaypoints = x.mapWaypoints;
    this.mapEnd = x.mapEnd;
    this.start = x.start;
    this.end = x.end;
  }

  Ride.all = [];
  Ride.savedRides = [];

  Ride.createTable = function(callback) {
    // console.log('inside createTable');

    var myCallback = function(result) {
      // console.log('inside createTable websql callback');
      // console.log('Successfully set up the ride table.', result);
      if (callback) callback();
    };

    webDB.execute(
      // what SQL command do we run here inside these quotes?
      'CREATE TABLE IF NOT EXISTS rides (' +
          'id INTEGER NOT NULL PRIMARY KEY, ' +
          'name VARCHAR(255) NOT NULL, ' +
          'description TEXT(5000), ' +
          'teaser VARCHAR (150), ' +
          'elevation VARCHAR(255), ' +
          'difficulty VARCHAR(255), ' +
          'rideImage1 VARCHAR(255), ' +
          'rideImage2 VARCHAR(255), ' +
          'rideImage3 VARCHAR(255), ' +
          'distance INTEGER NOT NULL, ' +
          'mapStart VARCHAR(255), ' +
          'mapStartLatLng VARCHAR(255), ' +
          'mapWaypoints VARCHAR(255), ' +
          'mapEnd VARCHAR(255), ' +
          'start VARCHAR(255), ' +
          'end VARCHAR(255));',
          myCallback
    );
  };

  Ride.prototype.insertRecord = function(callback) {
    // console.log('gonna go insert a record');
    webDB.execute (
      [
        {
          sql: 'INSERT INTO rides (name, description, teaser, elevation, difficulty, rideImage1, rideImage2, rideImage3, distance, mapStart, mapStartLatLng, mapWaypoints, mapEnd, start, end) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);',
          data: [this.name, this.description, this.teaser, this.elevation, this.difficulty, this.rideImage1, this.rideImage2, this.rideImage3, this.distance, this.mapStart, this.mapStartLatLng, this.mapWaypoints, this.mapEnd, this.start, this.end]}
      ],
    callback);
  };

  Ride.loadFromSQL = function(callback) {
    webDB.execute (
      [
        {
          sql: 'SELECT * FROM rides;',
        }
      ],
    function(rows){
      // console.log('inside loadPage webDb execute callback -------');
      Ride.all = rows.map(function(ele) {
        return new Ride(ele);
      });
      callback();
    });
  };

  Ride.loadFromJSON = function(callback) {
    $.ajax({
      type: 'GET',
      url: './data/rides.json',
      success: function (rawData) {
        // console.log('inside fetchAll ajax success');
        rawData.forEach(function(item){
          new Ride(item).insertRecord();
        });
        Ride.loadFromSQL(callback);
      },
      error: function(xhr, status, error){
        // console.log('inside fetchAll ajax error');
        console.log('ajax error', {xhr: xhr, status: status, error: error});
      }
    });
  };

  Ride.fetchAll = function(callback) {
    // console.log('about to go fetch that data via fetchall');
    // webDB.execute('DELETE FROM books', function(rows){});
    webDB.execute('SELECT * FROM rides LIMIT 1', function(rows){
      if (rows.length !== 0){
        // console.log('inside fetchAll loadPage because rows exist');
        Ride.loadFromSQL(callback);
      } else {
        // console.log('inside fetchAll ajax because rows doent exist');
        Ride.loadFromJSON(callback);
      }
    });
  };


  module.Ride = Ride;
})(window);
