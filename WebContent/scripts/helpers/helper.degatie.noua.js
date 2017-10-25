var delegatieGen;

function formatDelegatieGenerata(delegatie) {

	delegatieGen = delegatie;

	var content = '<div class="ui-corner-all custom-corners">';

	content += '<div class="ui-body ui-body-a">';

	content += '<div class="ui-grid-b ui-responsive" style="margin:5px; position:relative">';
	content += '<div class="ui-block-a">Data plecare:</div>';
	content += '<div class="ui-block-b">' + delegatie.dataPlecare + '</div>';
	content += '</div>';

	content += '<div class="ui-grid-b ui-responsive" style="margin:5px; position:relative">';
	content += '<div class="ui-block-a">Data sosire:</div>';
	content += '<div class="ui-block-b">' + delegatie.dataSosire + '</div>';
	content += '</div>';

	content += '<div class="ui-grid-b ui-responsive" style="margin:5px; position:relative">';
	content += '<div class="ui-block-a">Nr. auto:</div>';
	content += '<div class="ui-block-b">' + delegatie.nrAuto + '</div>';
	content += '</div>';

	content += '<div class="ui-grid-b ui-responsive" style="margin:5px; position:relative">';
	content += '<div class="ui-block-a">Traseu:</div>';
	content += '<div class="ui-block-b">' + decodeOpriri(delegatie) + '</div>';
	content += '</div>';

	content += '<div class="ui-grid-b ui-responsive" style="margin:5px; position:relative">';
	content += '<div class="ui-block-a">Km alocati:</div>';
	content += '<div class="ui-block-b">'
			+ (delegatie.distantaCalculata + delegatie.kmCota) + '</div>';
	content += '</div>';

	content += '<div class="ui-grid-b ui-responsive" style="margin:5px; position:relative">';
	content += '<div class="ui-block-a">Km realizati:</div>';
	content += '<div class="ui-block-b">' + delegatie.distantaEfectuata
			+ '</div>';
	content += '</div>';

	content += '</div>';

	content += '</div>';

	return content;

}

function decodeOpriri(delegatie) {

	var content = '<table border="0" style="width:100%;" cellpadding="5" data-role="table"  data-mode="columntoggle" class="ui-responsive">';

	var vizitatStr = '<img src="../img/ok.png">';
	var nevizitatStr = '<img src="../img/cancel.png">';

	var status = '';
	var adresa = '';
	for (var i = 0; i < delegatie.listOpriri.length; i++) {

		adresa = '<b>' + delegatie.listOpriri[i].adresa + '</b>';

		if (delegatie.distantaEfectuata > 0) {
			if (delegatie.listOpriri[i].vizitat)
				status = vizitatStr;
			else
				status = nevizitatStr;

			if (delegatie.listOpriri[i].init)
				adresa = '<b>' + delegatie.listOpriri[i].adresa + '</b>';
			else
				adresa = delegatie.listOpriri[i].adresa;

		}

		content += '<tr><td>' + adresa + '</td><td>' + status + '</td></tr>';

		status = '';
	}

	content += '</table>';

	return content;

}

function salveazaDelegatieGenerata() {

	if (delegatieGen.listOpriri.length == 1) {
		showAlertCreare('Info',
				'Delegatia trebuie sa contina cel putin doua localitati.');
		return false;
	}

	var tipAng = $('#tipAng').text();
	var codAng = $('#codAng').text();
	var unitLog = $('#unitLog').text();

	var delegatiiSuprapuse = getDelegatiiSuprapuse(codAng,
			delegatieGen.dataPlecare, delegatieGen.dataSosire);

	var subst = 'delegatia ';
	if (delegatiiSuprapuse.indexOf(',') != -1)
		subst = 'delegatiile ';

	if (delegatiiSuprapuse != '') {
		showAlertCreare('Atentie!', 'Aceasta delegatie se suprapune cu '
				+ subst + delegatiiSuprapuse + ' si nu poate fi salvata.');
		return false;

	}

	var opriri;

	for (var i = 0; i < delegatieGen.listOpriri.length; i++) {

		if (i == 0)
			opriri = delegatieGen.listOpriri[i].adresa.split('/')[1] + ' / '
					+ delegatieGen.listOpriri[i].adresa.split('/')[0];
		else
			opriri += ',' + delegatieGen.listOpriri[i].adresa.split('/')[1]
					+ ' / ' + delegatieGen.listOpriri[i].adresa.split('/')[0];

	}

	var delegatie = new Object();
	delegatie.codAngajat = codAng;
	delegatie.tipAngajat = tipAng;
	delegatie.dataP = delegatieGen.dataPlecare;
	delegatie.oraP = '0700';
	delegatie.dataS = delegatieGen.dataSosire;
	delegatie.distcalc = delegatieGen.distantaCalculata;
	delegatie.stops = opriri;
	delegatie.nrAuto = delegatieGen.nrAuto;
	delegatie.distreal = delegatieGen.distantaEfectuata;
	delegatie.unitlog = unitLog;

	$.mobile.loading('show');

	$.ajax({
		type : "POST",
		url : window.location.origin
				+ "/flota.service/delegatii/adaugaDelegatie",
		data : delegatie,
		cache : false,
		success : onSuccess,
		error : onError
	});

	function onSuccess(data) {

		$.mobile.loading('hide');

		if (data == 1) {
			hideDelGenControls();
			showAlertCreare('Status', 'Date salvate cu succes.');
		} else
			showAlertCreare('Status', 'Eroare salvare date.');

	}

	function onError() {
		$.mobile.loading('hide');
	}

}

function hideDelGenControls() {

	$('#del_generata').hide();
	$('#saveDelegatieGenerata').hide();
}

function getDelegatiiSuprapuse(codAng, dataPlecare, dataSosire) {

	var delegatiiSuprapuse = '';

	$.mobile.loading('show');

	$.ajax({
		type : "GET",
		url : window.location.origin
				+ "/flota.service/delegatii/getDelegatiiSuprapuse",
		data : ({
			codAngajat : codAng,
			dataStart : dataPlecare,
			dataStop : dataSosire,

		}),
		cache : false,
		dataType : "text",
		async : false,
		success : onSuccess
	});

	function onSuccess(data) {
		delegatiiSuprapuse = data;

	}

	$.mobile.loading('hide');

	return delegatiiSuprapuse;
}
