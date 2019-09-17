var listOpririTest = [];
var json_parsed;
var rowid;

$(document).on('pagecreate', '#traseu', function() {

	initDateFields();
	afisAngajati();

	$("#divDistanta").hide();

});

function afisAngajati() {

	var tipAng = $('#tipAng').text();
	var unitLog = $('#unitLog').text();
	var depart = $('#codDepart').text();
	var codAng = $('#codAng').text();

	$.mobile.loading('show');

	$.ajax({
		type : "GET",
		url : window.location.origin + "/flota.service/delegatii/getAngajati",
		data : ({
			tipAngajat : tipAng,
			unitLog : unitLog,
			codDepart : depart,
			codAng : codAng
		}),
		cache : false,
		dataType : "text",
		success : onSuccess
	});

	function onSuccess(data) {

		$.mobile.loading('hide');

		formatListAngajati(data);

	}

}

function formatListAngajati(listAngajati) {

	var objAngajati = $.parseJSON(listAngajati);

	$('#select-angajat-traseu').empty();

	for (var u = 0; u < objAngajati.length; u++) {
		var angajat = objAngajati[u];

		$('#select-angajat-traseu').append(
				'<option value=' + angajat.cod + '>' + angajat.nume
						+ '</option>');

	}

	$('#select-angajat-traseu').selectmenu('refresh');
	$('#select-angajat-traseu').trigger('change');

}

$('#select-angajat-traseu').change(function() {

	var dStart = $('#dateStart').val();
	var codAngajat = $(this).val();

	getListMasini(codAngajat, dStart);
});

function getListMasini(codAngajat, dStart) {

	$.mobile.loading('show');

	$.ajax({
		type : "GET",
		url : window.location.origin
				+ "/flota.service/delegatii/getMasiniAngajat",
		data : ({
			codAngajat : codAngajat,
			dataStart : dStart
		}),
		cache : false,
		dataType : "text",
		success : onSuccess
	});

	function onSuccess(data) {

		$.mobile.loading('hide');

		populateListMasini(data);

	}

}

function populateListMasini(listMasini) {
	var arrayMasini = listMasini.replace('[', '').replace(']', '').split(',');

	$('#text_stare_gps').empty();

	if (arrayMasini.length > 0) {

		var i;

		for (i = 0; i < arrayMasini.length; i++) {

			var nrMasina = arrayMasini[i].replace(/"/g, '');

			$('#select-masina-traseu').append(
					'<option value=' + nrMasina + '>' + nrMasina + '</option>');

		}

		$("#select-masina-traseu option[value='" + arrayMasini[1] + "']").attr(
				'selected', 'selected');
		$('#select-masina-traseu').selectmenu('refresh');
		$('#select-masina-traseu').trigger('change');
	}

}

function initDateFields() {
	$("#dateStart").datepicker({
		dateFormat : "dd-mm-yy",
		minDate:'-30d'
	});

	$("#dateStop").datepicker({
		dateFormat : "dd-mm-yy"
	});

	var firstDate = new Date();
	var lastDate = new Date();

	var daysToAdd = 0;

	firstDate.setDate(lastDate.getDate() + daysToAdd);
	lastDate.setDate(lastDate.getDate() + daysToAdd);
	$("#dateStart").datepicker("setDate", firstDate);
	$("#dateStop").datepicker("setDate", lastDate);
}


function showAlertTraseu(tipAlert, mesajAlert) {
	$('#tipAlertT').text(tipAlert);
	$('#textAlertT').text(mesajAlert);
	$.mobile.changePage('#dialogTraseu');
}

