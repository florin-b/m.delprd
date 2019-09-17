var listOpririTest = [];
var json_parsed;
var rowid;

var init = 0;
var delegatieSelIndex = 0;
var delegatieSelId = 0;

$(document).on('pageshow', '#modifica', function() {

	getStareGps();

});

function getStareGps() {

	var codAng = $('#codAng').text();

	$.mobile.loading('show');

	$.ajax({
		type : "GET",
		url : window.location.origin + "/flota.service/delegatii/getStareGps",
		data : ({
			codAngajat : codAng
		}),
		cache : false,
		dataType : "text",
		success : onSuccess
	});

	function onSuccess(data) {

		var obj_parsed = $.parseJSON(data);

		var textAfis;

		if (obj_parsed.data != null)
			textAfis = 'La data de ' + obj_parsed.data
					+ ' gps-ul autoturismului ' + obj_parsed.nrAuto
					+ ' se afla in starea  ' + obj_parsed.stareGps + '.';
		else
			textAfis = 'Nu exista informatii.'

		$('#stareGps').text(textAfis);

		$.mobile.loading('hide');

	}

}
