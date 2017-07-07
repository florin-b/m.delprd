(function(b) {
	b.support.touch = "ontouchend" in document;
	if (!b.support.touch) {
		return;
	}
	var c = b.ui.mouse.prototype, e = c._mouseInit, a;
	function d(g, h) {
		if (g.originalEvent.touches.length > 1) {
			return;
		}
		g.preventDefault();
		var i = g.originalEvent.changedTouches[0], f = document
				.createEvent("MouseEvents");
		f.initMouseEvent(h, true, true, window, 1, i.screenX, i.screenY,
				i.clientX, i.clientY, false, false, false, false, 0, null);
		g.target.dispatchEvent(f);
	}
	c._touchStart = function(g) {
		var f = this;
		if (a || !f._mouseCapture(g.originalEvent.changedTouches[0])) {
			return;
		}
		a = true;
		f._touchMoved = false;
		d(g, "mouseover");
		d(g, "mousemove");
		d(g, "mousedown");
	};
	c._touchMove = function(f) {
		if (!a) {
			return;
		}
		this._touchMoved = true;
		d(f, "mousemove");
	};
	c._touchEnd = function(f) {
		if (!a) {
			return;
		}
		d(f, "mouseup");
		d(f, "mouseout");
		if (!this._touchMoved) {
			d(f, "click");
		}
		a = false;
	};
	c._mouseInit = function() {
		var f = this;
		f.element.bind("touchstart", b.proxy(f, "_touchStart")).bind(
				"touchmove", b.proxy(f, "_touchMove")).bind("touchend",
				b.proxy(f, "_touchEnd"));
		e.call(f);
	};
})(jQuery);

var listOpririTest = [];
var json_parsed;
var rowid;

var init = 0;
var delegatieSelIndex = 0;
var delegatieSelId = 0;

$(document).on('pageshow', '#modifica', function() {

	$('body').on('click', '.deleteMe', function() {
		$(this).parent().remove();
		$('#stopsList').listview('refresh');
	});

	$("#stopsListM").sortable();
	$("#stopsListM").disableSelection();

	$("#saveDelegatieM").hide();
	$("#dateTraseuM").hide();

	afisListDelegatii();
	initNrAutoFields();

	$("#detaliiDelegatie").hide();
	$("#labelInfo").html('Incarcare lista delegatii. Asteptati...');

	$('#listdel').on('click', 'li', function() {

		delegatieSelIndex = $(this).closest("li").index() + 1;
		delegatieSelId = $(this).attr("data-rowid");

		afisDetaliiDelegatie(delegatieSelId);

	});

});

function adaugaStop() {

	var locStop = $('#punct-loc-inputM').val();

	if (locStop.indexOf('/') != -1) {

		$('#calcDistM').show();

		$('#stopsListM').append(
				'<li><a>' + locStop
						+ '</span></a><a class="deleteMe"></a></li>').listview(
				'refresh');

	}

	$('#punct-loc-inputM').val('');

}

function showAlertModif(tipAlert, mesajAlert) {
	$('#tipAlertM').text(tipAlert);
	$('#textAlertM').text(mesajAlert);
	$.mobile.changePage('#dialogModif');
}

function afisListDelegatii() {

	$.mobile.loading('show');

	var codAng = $('#codAng').text();

	$.ajax({
		type : "GET",
		url : window.location.origin
				+ "/flota.service/delegatii/afisListDelModif",
		data : ({
			codAngajat : codAng
		}),
		cache : false,
		dataType : "text",
		success : onSuccess
	});

	function onSuccess(data) {

		json_parsed = $.parseJSON(data);

		$('#listdel').empty().listview('refresh');

		for (var u = 0; u < json_parsed.length; u++) {
			var delegatie = json_parsed[u];

			var str = '<li data-rowid = ' + delegatie.id + '>' + '<div id ='
					+ delegatie.id + '>' + adaugaDelegatieAfis(u, delegatie)
					+ '</div>' + '</li>';

			$('#listdel').append(str).listview('refresh');

		}

		$.mobile.loading('hide');

		if (json_parsed.length > 0)
			$("#labelInfo").html('Selectati o delegatie.');
		else
			$("#labelInfo").html('Nu exista delegatii.');
	}

}

function afisDetaliiDelegatie(delegatieId) {

	$.mobile.loading('show');

	$.ajax({
		type : "GET",
		url : window.location.origin
				+ "/flota.service/delegatii/afisDelegatieModif",
		data : ({
			idDelegatie : delegatieId
		}),
		cache : false,
		dataType : "text",
		success : onSuccess
	});

	function onSuccess(data) {

		showDelegatieData(data);

		$.mobile.loading('hide');

	}
}

function showDelegatieData(delegatie) {

	var delegatieObj = $.parseJSON(delegatie);

	$("#detaliiDelegatie").show();
	$('#selectedDel').html('Modificare delegatie ' + delegatieSelIndex);

	$('#nrAutoM').val(delegatieObj.nrAuto);

	$('#dateStartM').val(delegatieObj.dataPlecare);

	var el = $('#select-oraM');

	el.val(delegatieObj.oraPlecare).attr('selected', true).siblings('option')
			.removeAttr('selected');

	el.selectmenu();

	el.selectmenu("refresh", true);

	$('#start-loc-inputM').val(delegatieObj.locPlecare);

	$('#dateStopM').val(delegatieObj.dataSosire);
	$('#stop-loc-inputM').val(delegatieObj.locSosire);

	$('#stopsListM').empty();
	if (('' + delegatieObj.ruta).indexOf(',') != -1) {

		var arrayDel = ('' + delegatieObj.ruta).split(',');

		for (var ii = 0; ii < arrayDel.length; ii++) {
			$('#stopsListM').append(
					'<li><a>' + arrayDel[ii]
							+ '</span></a><a class="deleteMe"></a></li>')
					.listview('refresh');
		}

	} else if (delegatieObj.ruta != null && delegatieObj.ruta != '') {

		$('#stopsListM').append(
				'<li><a>' + delegatieObj.ruta
						+ '</span></a><a class="deleteMe"></a></li>').listview(
				'refresh');
	}

}

$('#schimbaAutoM').on('click', function(e) {
	e.stopImmediatePropagation();
	e.preventDefault();

	if ($('#alegeAutoDivM').is(':visible')) {
		$("#alegeAutoDivM").hide();
		$("#salveazaAutoDivM").hide();
	} else {
		$("#alegeAutoDivM").show();
		$("#salveazaAutoDivM").show();
	}

});

$('#salveazaAutoM').on('click', function(e) {
	e.stopImmediatePropagation();
	e.preventDefault();

	var selAuto = $('#select-autoM').val();

	$('#nrAutoM').val(selAuto);

	$("#alegeAutoDivM").hide();
	$("#salveazaAutoDivM").hide();

});

function initNrAutoFields() {

	var listMasini = $('#listMasini').text().replace('[', '').replace(']', '')
			.split(',');

	$('#nrAutoM').val(listMasini[0]);

	$('#select-autoM').empty();

	if (listMasini.length > 0) {
		for (var i = 1; i <= listMasini.length - 1; i++) {
			$('#select-autoM').append(
					'<option value=' + listMasini[i] + '>' + listMasini[i]
							+ '</option>');

		}

		$("#select-autoM option[value='" + listMasini[1] + "']").attr(
				'selected', 'selected');
		$('#select-autoM').selectmenu('refresh');
		$('#select-autoM').trigger('change');
	}

}

function adaugaDelegatieAfis(i, delegatie) {

	var content = '<table>';

	content += '<tr><td><b>Delegatia</b></td>';
	content += '<td><b>' + (i + 1) + '</b></td>';
	content += '</tr>';

	content += '<tr><td>Plecare</td>';
	content += '<td>' + delegatie.dataPlecare + '</td>';
	content += '<td>din</td>';
	content += '<td>' + delegatie.localitateStart + '</td>';
	content += '</tr>';

	content += '<tr><td>Sosire</td>';
	content += '<td>' + delegatie.dataSosire + '</td>';
	content += '<td>in</td>';
	content += '<td>' + delegatie.localitateStop + '</td>';
	content += '</tr>';

	content += '</table>';

	return content;
}

function salveazaDelegatieM() {

	var judetPlecare = $('#start-loc-inputM').val().split('/')[1];
	var locPlecare = $('#start-loc-inputM').val().split('/')[0];

	var judetSosire = $('#stop-loc-inputM').val().split('/')[1];
	var locSosire = $('#stop-loc-inputM').val().split('/')[0];

	var nrAuto = $('#nrAutoM').val();
	var dataPlecare = $('#dateStartM').val();
	var oraPlecare = $('#select-oraM').val();
	var distkm = $('#kmtraseuM').text();
	var dataSosire = $('#dateStopM').val();

	var tipAng = $('#tipAng').text();
	var codAng = $('#codAng').text();

	if (locPlecare == '') {
		showAlertModif('Atentie!', 'Selectati localitatea de plecare.');
		return false;
	}

	if (locSosire == '') {
		showAlertModif('Atentie!', 'Selectati localitatea de sosire.');
		return false;
	}

	if (nrAuto == '') {
		showAlertModif('Atentie!', 'Completati nr. auto.');
		return false;
	}

	if (dataPlecare == '') {
		showAlertModif('Atentie!', 'Selectati data plecare.');
		return false;
	}

	if (oraPlecare == '') {
		showAlertModif('Atentie!', 'Selectati ora plecare.');
		return false;
	}

	if (dataSosire == '') {
		showAshowAlertModiflertCreare('Atentie!', 'Selectati data sosire.');
		return false;
	}

	var opriri = locPlecare + ' / ' + judetPlecare;

	$('.stopsListM').each(
			function() {
				var list = $(this).find('li');
				$(list.get()).each(
						function() {
							var currentStop = $(this).text().split('/')[0]
									+ ' / ' + $(this).text().split('/')[1];

							opriri += "," + currentStop;

						});

			})

	opriri += ',' + locSosire + ' / ' + judetSosire;

	$.mobile.loading('show');

	$.ajax({
		type : "POST",
		url : window.location.origin
				+ "/flota.service/delegatii/modificaDelegatie",
		data : ({
			codAngajat : codAng,
			tipAngajat : tipAng,
			dataP : dataPlecare,
			oraP : oraPlecare,
			dataS : dataSosire,
			distcalc : distkm,
			stops : opriri,
			nrAuto : nrAuto,
			idDelegatie : delegatieSelId
		}),
		cache : false,
		dataType : "text",
		success : onSuccess,
		error : onError
	});

	function onSuccess(data) {

		$.mobile.loading('hide');

		if (data == 1)
			showAlertModif('Status', 'Date salvate cu succes.');
		else
			showAlertModif('Status', 'Eroare salvare date.');
		hideControlsM();

	}

	function onError() {
		$.mobile.loading('hide');
	}

}

function hideControlsM() {

	$('#stopsListM').empty();
	$('#nrAutoM').empty();

	$("#map_canvas_delegatieM").hide();
	$("#dateTraseuM").hide();
	$(this).hide();

	$('#calcDistM').hide();
	$('#saveDelegatieM').hide();

}
