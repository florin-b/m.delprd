$(document)
		.on(
				'pageshow',
				'#new-page',
				function(e, data) {

					document.getElementById('map_canvas_delegatie').style.visibility = "hidden";

					document.getElementById('labelTraseu1').style.visibility = "hidden";
					document.getElementById('labelTraseu2').style.visibility = "hidden";

				});

function calculeazaDistanta() {

	// validare date

	var judetPlecare = $('#start-loc-input').val().split('/')[1];
	var locPlecare = $('#start-loc-input').val().split('/')[0];

	var judetSosire = $('#stop-loc-input').val().split('/')[1];
	var locSosire = $('#stop-loc-input').val().split('/')[0];

	if (locPlecare == '') {
		showAlertCreare('Atentie!', 'Selectati localitatea de plecare.');
		return false;
	}

	if (locSosire == '') {
		showAlertCreare('Atentie!', 'Selectati localitatea de sosire.');
		return false;
	}

	var stopsArray = [];

	stopsArray.push("Romania, " + judetPlecare + ", " + locPlecare);

	$('.stopsList').each(
			function() {
				var list = $(this).find('li');
				$(list.get()).each(
						function() {
							var currentLine = $(this).text().split("/");

							stopsArray.push("Romania," + currentLine[1] + ","
									+ currentLine[0]);

						});
			})

	stopsArray.push("Romania, " + judetSosire + ", " + locSosire);

	if (locPlecare == locSosire && stopsArray.length == 2) {
		showAlertCreare('Atentie!', 'Adaugati o oprire.');
		return false;
	}

	var minZoomLevel = 12;

	var map = new google.maps.Map(document
			.getElementById('map_canvas_delegatie'), {
		zoom : minZoomLevel,
		mapTypeId : google.maps.MapTypeId.ROADMAP,
		gestureHandling : 'cooperative'
	});

	var directionsDisplay = new google.maps.DirectionsRenderer;
	var directionsService = new google.maps.DirectionsService;

	$("#map_canvas_delegatie").show();
	$("#dateTraseu").show();

	document.getElementById('map_canvas_delegatie').style.visibility = "visible";
	document.getElementById('labelTraseu1').style.visibility = "visible";
	document.getElementById('labelTraseu2').style.visibility = "visible";

	var waypts = [];

	for (var i = 1; i < stopsArray.length - 1; i++) {

		waypts.push({
			location : stopsArray[i],
			stopover : true
		});

	}

	directionsDisplay.setMap(map);

	directionsService.route({
		origin : stopsArray[0],
		destination : stopsArray[stopsArray.length - 1],
		waypoints : waypts,
		optimizeWaypoints : false,
		travelMode : 'DRIVING'
	}, function(response, status) {
		if (status === 'OK') {

			directionsDisplay.setDirections(response);

			google.maps.event.trigger(map, 'resize');

			var route = response.routes[0];

			var distanta = 0;

			for (var i = 0; i < route.legs.length; i++) {

				distanta += route.legs[i].distance.value;
			}

			$('#kmtraseu').text('' + parseInt(distanta / 1000));
			$("#saveDelegatie").show();

			scrollToMap();

		} else {
			window.alert('Eroare calculare distanta ' + status);
		}
	});

	function scrollToMap() {
		$(function() {
			$('html, body').animate({
				scrollTop : $('#map_canvas_delegatie').offset().top
			});
		});
	}
	
}
