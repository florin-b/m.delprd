var listOpririTest = [];
var json_parsed;
var rowid;

$(document).on('pagecreate', '#afiseaza', function() {

	setDivsVisibility();
	initDateFields();

});

function book(title, author) {
	this.title = title;
	this.author = author;
}

function setDivsVisibility() {

	var tipAng = $('#tipAng').text();

	if (hasSubords(tipAng))
		$("#divTipDelegatie").show();
	else
		$("#divTipDelegatie").hide();

}

function TestObject(prop1, prop2) {
	this.prop1 = prop1;
	this.prop2 = prop2;

}

function testBeanObiectiv() {

	var myObj = new Object();

	myObj.tip = 'tip';
	myObj.nume = 'nume';
	myObj.stare = 1;
	myObj.categorie = 2;
	myObj.etapa = 4;
	myObj.faza = 11;

	myObj.valoareEstimata = 222;
	myObj.dataStartAutorizatie = '';
	myObj.dataSfarsitAutorizatie = '';

	myObj.dataInceput = '';
	myObj.dataSfarist = '';
	myObj.durataFaza = 22;

	myObj.numeMeserias = 'meserias 123';
	myObj.telMeserias = 'tel meserias';
	myObj.codExecutant = 'cod exec';
	myObj.numeExecutant = 'nume exec';
	myObj.cuiExecutant = 'cui exec';
	myObj.tipBeneficiar = 22;
	myObj.numeBeneficiar = 'nume benef';
	myObj.cuiPersJuridica = 'cui';
	myObj.nrRcPersJuridica = 'nr c';
	myObj.codJudetBenef = '22';
	myObj.localitateBenef = 'localitate';
	myObj.adresaBenef = 'adresa';

	alert(JSON.stringify(myObj));

	$.mobile.loading('show');
	$.ajax({
		type : "POST",
		url : "http://10.1.5.28:8080/obiective.service/obiective/adauga",
		data : myObj,
		cache : false,
		success : onSuccess1,
		error : function(data) {
			alert(JSON.stringify(data));
		}
	});

	function onSuccess1(data) {

		alert(data);

	}

	$.mobile.loading('hide');

}

function testBean() {

	var myObj = new Object();

	myObj.name = "Bean Name";
	myObj.address = "Bean Address";

	alert(JSON.stringify(myObj));

	$.mobile.loading('show');
	$.ajax({
		type : "POST",
		url : "http://10.1.5.28:8080/flota.service/delegatii/testBean",
		data : myObj,
		cache : false,
		success : onSuccess1,
		error : function(data) {
			alert(JSON.stringify(data));
		}
	});

	function onSuccess1(data) {

		alert(data);

	}

	$.mobile.loading('hide');

}

function afiseazaDelegatii_test() {
	var myObj = new TestObject("Perl", "Python");

	alert(JSON.stringify(myObj));

	var url = "http://10.1.3.72:8080/flota.service.test/delegatii/getObjectRemote";

	alert(url);

	$.mobile.loading('show');
	$.ajax({
		type : "POST",
		url : url,
		data : ({
			codJudet : JSON.stringify(myObj)

		}),
		cache : false,
		dataType : "text",
		success : onSuccess1,
		error : function(data) {
			alert(JSON.stringify(data));
		}
	});

	function onSuccess1(data) {

		alert(data);

	}

	$.mobile.loading('hide');

}

function afiseazaDelegatii_OK() {
	var myObj = new TestObject("Perl", "Python");

	alert(JSON.stringify(myObj));

	$.mobile.loading('show');
	$.ajax({
		type : "POST",
		url : window.location.origin + "/flota.service/delegatii/getObject",
		data : JSON.stringify(myObj),
		cache : false,
		dataType : "json",
		contentType : "application/json; charset=utf-8",
		success : onSuccess1,
		error : function(data) {
			alert(JSON.stringify(data));
		}
	});

	function onSuccess1(data) {

		alert(data);

	}

	$.mobile.loading('hide');

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

	content += '<div class="ui-bar ui-bar-a">' + delegatie.numeAngajat + '  '
			+ delegatie.id + "</div>";

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
