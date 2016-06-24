page('/', indexController.index);
page('/rides', rideController.index);
page('/rides/:id', rideDetailController.index);
page('/saved', savedController.index);
page('/admin', adminController.index);
page();
