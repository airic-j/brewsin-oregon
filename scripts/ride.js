(function(module){

  // create Ride object
  function Ride(x) {
    this.name = x.name;
    this.img = x.img;
    this.description = x.description;
    this.distance = x.distance;
  }

  Ride.all = [];

  // Ride.clearTable = function() {
  //   webDB.execute(
  //     // what SQL command do we run here inside these quotes?
  //     'DROP TABLE rides;'
  //   );
  // }

  Ride.createTable = function(callback) {
    // console.log('inside createTable');

    var myCallback = function(result) {
      // console.log('inside createTable websql callback');
      console.log('Successfully set up the ride table.', result);
      if (callback) callback();
    };

    webDB.execute(
      // what SQL command do we run here inside these quotes?
      'CREATE TABLE IF NOT EXISTS rides (' +
          'name VARCHAR(255) NOT NULL, ' +
          'description VARCHAR(255), ' +
          'img VARCHAR(255), ' +
          'distance INTEGER NOT NULL);',
          myCallback
    );
  };

  Ride.prototype.insertRecord = function(callback) {
    // console.log('gonna go insert a record');
    webDB.execute (
        [
            {
              sql: 'INSERT INTO rides (name, description, img, distance) VALUES (?, ?, ?, ?);',
              data: [this.name, this.description, this.img, this.distance]
            }
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
      // rideView.appendRides();
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
        // rideView.appendRides();
      },
      error: function(xhr, status, error){
        console.log('inside fetchAll ajax error');
        console.log('ajax error', {xhr: xhr, status: status, error: error});
      }
    });
  }

  Ride.fetchAll = function(callback) {
    // console.log('about to go fetch that data via fetchall');
    // webDB.execute('DELETE FROM books', function(rows){});
    webDB.execute('SELECT * FROM rides LIMIT 1', function(rows){
      if (rows.length !== 0){
        console.log('inside fetchAll loadPage because rows exist');
        Ride.loadFromSQL(callback);
      } else {
        console.log('inside fetchAll ajax because rows doent exist');
        Ride.loadFromJSON(callback);
      }
    });
  };


  module.Ride = Ride;
})(window);
