function afisPozitie() {

	$.ajax({
		type : 'GET',
		url : window.location.origin
				+ "/flota.service/delegatii/getPozitieAngajat",
		data : ({
			codAngajat : angajatiSelectati.trim()

		}),
		beforeSend : function() {
			loading('show');
		},
		complete : function() {
			loading('hide');
		},
		success : function(data) {
			showPositionMap(data);

		},
		error : function(exception) {
			alert('Exeption:' + JSON.stringify(exception));
		}

	});

}

function afisTraseu() {

	var dStart = $('#dateStart').val();

	var dStop = $('#dateStop').val();

	var codAngajat = $('#select-angajat-traseu').val();

	var nrAuto = $('#select-masina-traseu').val();

	$.mobile.loading('show');

	$.ajax({
		type : "GET",
		url : window.location.origin + "/flota.service/delegatii/getTraseu",
		data : ({
			codAngajat : codAngajat,
			dataStart : dStart,
			dataStop : dStop,
			nrMasina : nrAuto
		}),
		cache : false,
		dataType : "text",
		success : onSuccess
	});

	function onSuccess(data) {

		$.mobile.loading('hide');

		showMap(data);

	}

}

function showPositionMap(data) {

	if (getPozitieValida(data) == null) {
		$("#map_pozitie").hide();
		return;
	}

	if (data == null || data.length == 0) {
		$("#map_pozitie").hide();
		return;
	}

	$("#map_pozitie").show();

	var minZoomLevel = 12;
	var map = new google.maps.Map(document.getElementById('map_pozitie'), {
		zoom : minZoomLevel,
		center : new google.maps.LatLng(
				getPozitieValida(data).pozitie.latitudine,
				getPozitieValida(data).pozitie.longitudine),
		mapTypeId : google.maps.MapTypeId.ROADMAP,
		gestureHandling : 'cooperative'
	});

	var lContent;

	for (var j = 0; j < data.length; j++) {

		if (data[j].pozitie == null)
			continue;

		lContent = data[j].numeAngajat + '<br>' + data[j].pozitie.data;

		new MarkerWithLabel({
			position : new google.maps.LatLng(data[j].pozitie.latitudine,
					data[j].pozitie.longitudine),

			labelContent : lContent,
			map : map,

			icon : '../img/purple_car.png',

			labelAnchor : new google.maps.Point(22, 0),
			labelClass : "labels",
			labelStyle : {
				opacity : 0.75
			}

		});

	}

	scrollToMap();

}

function getPozitieValida(data) {
	for (var j = 0; j < data.length; j++) {

		if (data[j].pozitie == null)
			continue;

		return data[j];

	}

	return null;

}

function scrollToMap() {
	$(function() {
		$('html, body').animate({
			scrollTop : $('#map_pozitie').offset().top
		});
	});
}
