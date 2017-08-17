var listOpririTest = [];
var json_parsed;
var rowid;

$(document).on('pagecreate', '#afiseaza', function() {

	setDivsVisibility();
	initDateFields();

});

function setDivsVisibility() {

	var tipAng = $('#tipAng').text();

	if (hasSubords(tipAng))
		$("#divTipDelegatie").show();
	else
		$("#divTipDelegatie").hide();

}

function afiseazaDelegatii() {
	var dStart = $('#dateStart').val();

	var dStop = $('#dateStop').val();

	var codAng = $('#codAng').text();
	var tipAng = $('#tipAng').text();
	var unitLog = $('#unitLog').text();
	var depart = $('#codDepart').text();

	var tipDel = $('input[name=radio-del]:checked').val();

	$.mobile.loading('show');
	$.ajax({
		type : "GET",
		url : window.location.origin
				+ "/flota.service/delegatii/afiseazaDelegatii",
		data : ({
			codAngajat : codAng,
			dataStart : dStart,
			dataStop : dStop,
			tipAngajat : tipAng,
			unitLog : unitLog,
			codDepart : depart,
			tipAfis : tipDel
		}),
		cache : false,
		dataType : "text",
		success : onSuccess
	});

	function onSuccess(data) {

		json_parsed = $.parseJSON(data);
		$('#delegatiiList').empty();

		for (var u = 0; u < json_parsed.length; u++) {
			var delegatie = json_parsed[u];

			var str = '<li data-rowid = ' + delegatie.id + '>' + '<div id ='
					+ delegatie.id + '>' + adaugaDelegatieAfis(delegatie)
					+ '</div>' + '</li>';

			$('#delegatiiList').append(str).listview('refresh');

		}

		$.mobile.loading('hide');

	}

}

function afisDelegatii() {
	afiseazaDelegatii();

}

function adaugaDelegatieAfis(delegatie) {

	var content = '<div class="ui-corner-all custom-corners">';

	content += '<div class="ui-bar ui-bar-a">' + delegatie.numeAngajat + '  ' + delegatie.id
			+ "</div>";

	content += '<div class="ui-body ui-body-a">';

	content += '<div class="ui-grid-b ui-responsive" style="margin:10px; position:relative">';
	content += '<div class="ui-block-a">Data plecare:</div>';
	content += '<div class="ui-block-b">' + delegatie.dataPlecare + '</div>';
	content += '</div>';

	content += '<div class="ui-grid-b ui-responsive" style="margin:10px; position:relative">';
	content += '<div class="ui-block-a">Ora plecare:</div>';
	content += '<div class="ui-block-b">' + delegatie.oraPlecare + '</div>';
	content += '</div>';

	content += '<div class="ui-grid-b ui-responsive" style="margin:10px; position:relative">';
	content += '<div class="ui-block-a">Data sosire:</div>';
	content += '<div class="ui-block-b">' + delegatie.dataSosire + '</div>';
	content += '</div>';

	content += '<div class="ui-grid-b ui-responsive" style="margin:10px; position:relative">';
	content += '<div class="ui-block-a">Traseu:</div>';
	content += '<div class="ui-block-b">' + decodeOpriri(delegatie) + '</div>';
	content += '</div>';

	content += '<div class="ui-grid-b ui-responsive" style="margin:10px; position:relative">';
	content += '<div class="ui-block-a">Km alocati:</div>';
	content += '<div class="ui-block-b">' + delegatie.distantaCalculata
			+ '</div>';
	content += '</div>';

	content += '<div class="ui-grid-b ui-responsive" style="margin:10px; position:relative">';
	content += '<div class="ui-block-a">Km realizati:</div>';
	content += '<div class="ui-block-b">' + delegatie.distantaEfectuata
			+ '</div>';
	content += '</div>';

	content += '<div class="ui-grid-b ui-responsive" style="margin:10px; position:relative">';
	content += '<div class="ui-block-a">Km respinsi:</div>';
	content += '<div class="ui-block-b">' + delegatie.distantaRespinsa
			+ '</div>';
	content += '</div>';

	content += '<div class="ui-grid-b ui-responsive" style="margin:10px; position:relative">';
	content += '<div class="ui-block-a">Stare:</div>';
	content += '<div class="ui-block-b">'
			+ getStatusDelegatie(delegatie.statusCode) + '</div>';
	content += '</div>';

	content += '</div>';

	content += '</div>';

	return content;
}

function initDateFields() {
	$("#dateStart").datepicker({
		dateFormat : "dd-mm-yy"
	});

	$("#dateStop").datepicker({
		dateFormat : "dd-mm-yy"
	});

	var firstDate = new Date();
	var lastDate = new Date();

	var daysToAdd = 0;

	firstDate.setDate(1);
	lastDate.setDate(lastDate.getDate() + daysToAdd);
	$("#dateStart").datepicker("setDate", firstDate);
	$("#dateStop").datepicker("setDate", lastDate);
}

function getStatusDelegatie(codStatus) {
	var strStatus = 'Nedefinit';

	switch (codStatus) {
	case "-1":
		strStatus = " <b>Trimisa spre aprobare</b>"
		break;

	case "1":
	case "2":
		strStatus = "  <b>Aprobata</b>"
		break;

	case "6":
		strStatus = "  <b>Respinsa</b>"
		break;

	}

	return strStatus;

}
