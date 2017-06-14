var listOpririTest = [];
var json_parsed;
var rowid;

var init = 0;

$(document).on('pageshow', '#aproba', function() {

	afisDelegatiiAprob();

});

function aprobaDelegatie(delegatieId) {

	var kmAprob = $('#' + delegatieId).find("#kmaprob").val();

	if (!$.isNumeric(kmAprob)) {
		showAlertAprob('Atentie!', 'Valoare km aprobati invalida.');
		return;
	}

	var tipAng = $('#tipAng').text();
	var codAng = $('#codAng').text();

	$.mobile.loading('show');

	$.ajax({
		type : "POST",
		url : window.location.origin + "/flota.service/delegatii/aprobaDelegatie",
		data : ({
			idDelegatie : delegatieId,
			tipAngajat : tipAng,
			kmAprobati : kmAprob,
			codAngajat : codAng
		}),
		cache : false,
		dataType : "text",
		success : onSuccess
	});

	function onSuccess(data) {
		showAlertAprob('Status', 'Delegatie aprobata');
		$.mobile.loading('hide');
		afisDelegatiiAprob();
	}

}

function showAlertAprob(tipAlert, mesajAlert) {
	$('#tipAlertAp').text(tipAlert);
	$('#textAlertAp').text(mesajAlert);
	$.mobile.changePage('#dialogAprobare');
}

function respingeDelegatie(delegatieId) {

	var tipAng = $('#tipAng').text();
	var codAng = $('#codAng').text();

	
	
	$.mobile.loading('show');

	$
			.ajax({
				type : "POST",
				url : window.location.origin + "/flota.service/delegatii/respingeDelegatie",
				data : ({
					idDelegatie : delegatieId,
					tipAngajat : tipAng,
					codAngajat : codAng
				}),
				cache : false,
				dataType : "text",
				success : onSuccess
			});

	function onSuccess(data) {
		$.mobile.loading('hide');
		showAlertAprob('Status', 'Delegatie respinsa');
		afisDelegatiiAprob();
	}

}

function afisDelegatiiAprob() {

	$.mobile.loading('show');

	var tipAng = $('#tipAng').text();
	var unitLog = $('#unitLog').text();

	$
			.ajax({
				type : "GET",
				url : window.location.origin + "/flota.service/delegatii/afisDelegatiiAprob",
				data : ({
					tipAngajat : tipAng,
					unitLog : unitLog
				}),
				cache : false,
				dataType : "text",
				success : onSuccess
			});

	function onSuccess(data) {

		json_parsed = $.parseJSON(data);
		$('#aprobList').empty();

		for (var u = 0; u < json_parsed.length; u++) {
			var delegatie = json_parsed[u];

			var str = '<li data-rowid = ' + delegatie.id + '>' + '<div id ='
					+ delegatie.id + '>' + adaugaDelegatie(delegatie)
					+ '</div>' + '</li>';

			$('#aprobList').append(str).listview('refresh');

		}

		$.mobile.loading('hide')

	}

}

function setDelSelected(delegatieId) {

	document.getElementById("delid").value = delegatieId;

}

function adaugaDelegatie(delegatie) {

	var content = '<table border="0" style="width:100%;" cellpadding="6" data-role="table"  data-mode="columntoggle:none" class="ui-responsive table-stroke">';
	content += '<tr><td colspan="2"><b>' + delegatie.numeAngajat
			+ "</b></td></tr>";

	content += '<tr><td width="30%">Data plecare:</td><td> '
			+ delegatie.dataPlecare + "</td></tr>";
	content += '<tr><td>Ora plecare: </td><td>' + delegatie.oraPlecare
			+ "</td></tr>";

	content += '<tr><td width="30%">Data sosire:</td><td> '
			+ delegatie.dataSosire + "</td></tr>";

	content += decodeOpriri(delegatie.listOpriri);

	content += '<tr><td>Km calculati: </td><td>' + delegatie.distantaCalculata
			+ " km </td></tr>";

	content += '<tr><td>Km realizati: </td><td>' + delegatie.distantaEfectuata
			+ " km </td></tr>";
	content += '<tr><td> Km aprobati: </td>';

	content += '<td><input type="text" name="name" id="kmaprob" value="0"></td></tr>';

	content += '</table>';

	content += '<div class="ui-grid-b ui-responsive">';

	content += '<div class="ui-block-a" ><a href="#" class="ui-btn ui-corner-all" style="background: #7CCD7C; color: white;" onclick="aprobaDelegatie('
			+ delegatie.id + ');">Aproba</a></div>';

	content += '<div class="ui-block-b" ><a href="#" class="ui-btn ui-corner-all" style="background: #EE8262; color: white;" onclick="respingeDelegatie('
			+ delegatie.id + ');">Respinge</a></div>';

	content += '<div class="ui-block-c" ><a href="#custDetails" class="ui-btn ui-corner-all" style="background: #87CEEB; color: white;" data-transition="slide" onclick="setDelSelected('
			+ delegatie.id + ');">Harta traseu</a></div>';

	content += '</div>';

	return content;
}
