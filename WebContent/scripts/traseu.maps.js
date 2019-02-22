function afisTraseu() {

	var dStart = $('#dateStart').val();

	var dStop = $('#dateStop').val();

	var start = $("#dateStart").datepicker("getDate");
	var end = $("#dateStop").datepicker("getDate");
	var days = (end - start) / (1000 * 60 * 60 * 24);

	if (days > 1) {
		showAlertTraseu("Info",
				"Intervalul nu trebuie sa fie mai mare de 2 zile.");
		return;

	}

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

function showMap(data) {
	
	

	var objTraseu = $.parseJSON(data);
	
	

	if (objTraseu.coordonate == null) {
		$("#map_traseu").hide();
		$("#divDistanta").hide();
		alert('Nu exista informatii');
		return;
	}

	$("#map_traseu").show();

	$("#divDistanta").show();
	$('#kmDistanta').text(objTraseu.distanta + ' km');

	var coordTraseu = [];
	var position;
	for (var i = 0; i < objTraseu.coordonate.length - 1; i++) {

		position = new google.maps.LatLng(objTraseu.coordonate[i].lat,
				objTraseu.coordonate[i].lng);
		coordTraseu.push(position);
	}

	if (coordTraseu.length == 0)
		$("#map_traseu").hide();

	var minZoomLevel = 12;
	var map = new google.maps.Map(document.getElementById('map_traseu'), {
		zoom : minZoomLevel,
		center : new google.maps.LatLng(
				objTraseu.opriri[0].pozitieGps.latitudine,
				objTraseu.opriri[0].pozitieGps.longitudine),
		mapTypeId : google.maps.MapTypeId.ROADMAP,
		gestureHandling : 'cooperative'
	});

	var lineSymbol = {
		path : google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
		scale : 5,
		strokeColor : '#393'
	};

	var traseuPath = new google.maps.Polyline({
		path : coordTraseu,
		geodesic : true,
		icons : [ {
			icon : lineSymbol,
			offset : '100%'
		} ],
		strokeColor : '#FF0000',
		strokeOpacity : 1.0,
		strokeWeight : 3
	});

	var stopMarker;

	try {

		for (var j = 0; j < objTraseu.opriri.length; j++) {

			stopMarker = new MarkerWithLabel({
				position : new google.maps.LatLng(
						objTraseu.opriri[j].pozitieGps.latitudine,
						objTraseu.opriri[j].pozitieGps.longitudine),
				labelContent : objTraseu.opriri[j].durata + '<br>' + objTraseu.opriri[j].data + '<br>' +  
				objTraseu.opriri[j].pozitieGps.latitudine +' , ' + objTraseu.opriri[j].pozitieGps.longitudine,
				map : map,

				icon : '../img/stop-icon.png',

				labelAnchor : new google.maps.Point(22, 0),
				labelClass : "labels",
				labelStyle : {
					opacity : 0.75
				}

			});

		}

	} catch (err) {
		alert(err);
	}

	traseuPath.setMap(map);
	animateCircle(traseuPath);

	scrollToMap();
}

function scrollToMap() {
	$(function() {
		$('html, body').animate({
			scrollTop : $('#map_traseu').offset().top
		});
	});
}

function animateCircle(line) {
	var count = 0;
	window.setInterval(function() {
		count = (count + 1) % 300;

		var icons = line.get('icons');
		icons[0].offset = (count / 2) + '%';
		line.set('icons', icons);
	}, 150);
}
