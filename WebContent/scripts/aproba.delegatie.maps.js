var map;

function showMapRoute(listOpriri) {

	
	
	
	var minZoomLevel = 12;

	map = new google.maps.Map(document.getElementById('map_canvas'), {
		zoom : minZoomLevel,
		mapTypeId : google.maps.MapTypeId.ROADMAP
	});

	var directionsDisplay = new google.maps.DirectionsRenderer;
	var directionsService = new google.maps.DirectionsService;

	var stopsArray = [];
	for (var i = 0; i < listOpriri.length; i++) {
		var currentLine = (listOpriri[i] + '').split("/");

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

}