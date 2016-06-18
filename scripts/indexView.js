(function(module){
  // console.log('it loads!');

  var indexView = {}

  indexView.init = function() {
    $('section').hide();
    $('#home').show();
    console.log('should load the index');
  }

  module.indexView = indexView;

})(window);
