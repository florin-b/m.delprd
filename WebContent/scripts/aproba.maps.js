$(document).on('pageshow', '#custDetails', function() {

	var currentId = document.getElementById("delid").value;

	listOpririTest = getOpriri(currentId, json_parsed);


	var minZoomLevel = 12;

	var map = new google.maps.Map(document.getElementById('map_canvas'), {
		zoom : minZoomLevel,
		mapTypeId : google.maps.MapTypeId.ROADMAP,
		gestureHandling : 'cooperative'

	});

	var directionsDisplay = new google.maps.DirectionsRenderer;
	var directionsService = new google.maps.DirectionsService;

	var stopsArray = [];
	for (var i = 0; i < listOpririTest.length; i++) {
		var currentLine = (listOpririTest[i] + '').split("/");

		stopsArray.push("Romania," + currentLine[0] + "," + currentLine[1]);
	}

	var waypts = [];

	for (var ii = 1; ii < stopsArray.length; ii++) {

		waypts.push({
			location : stopsArray[ii],
			stopover : true
		});

	}

	directionsDisplay.setMap(map);

	directionsService.route({
		origin : stopsArray[0],
		destination : stopsArray[0],
		waypoints : waypts,
		optimizeWaypoints : true,
		travelMode : 'DRIVING'
	}, function(response, status) {
		if (status === 'OK') {

			directionsDisplay.setDirections(response);
			google.maps.event.trigger(map, 'resize');

		} else {
			window.alert('Eroare calculare distanta ' + status);
		}
	});

});
