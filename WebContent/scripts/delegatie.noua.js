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

var serverDate;

$(document).on("pagecreate", "#new-page", function() {

	$('body').on('click', '.deleteMe', function() {
		$(this).parent().remove();
		$('#stopsList').listview('refresh');
	});

	$("#saveDelegatie").hide();
	$("#dateTraseu").hide();

	$("#stopsList").sortable();
	$("#stopsList").disableSelection();

	$("#stopsList").on("sortstop", function(event, ui) {
		$('#stopsList').listview('refresh');
	});

	initNrAutoFields();

	initDateFields();

	var unitLog = $('#unitLog').text();

	/*
	if (unitLog.substring('GL10') != -1)
		$('#field_tip_del').show();
	else
		$('#field_tip_del').hide();
	*/
	
	$('#field_tip_del').hide();

	showDelegatieNoua();

});

$("form input:radio").change(function() {
	if ($(this).val() == "dnoua") {

		showDelegatieNoua();

	} else if ($(this).val() == "defectuata") {

		showDelegatieEfectuata();
	}
});
function adaugaStop() {

	var locStop = $('#punct-loc-input').val();

	if (locStop.indexOf('/') != -1) {

		$('#calcDist').show();

		$('#stopsList').append(
				'<li><a>' + locStop
						+ '</span></a><a class="deleteMe"></a></li>').listview(
				'refresh');

	}

	$('#punct-loc-input').val('');

}

function showAlertCreare(tipAlert, mesajAlert) {
	$('#tipAlertC').text(tipAlert);
	$('#textAlertC').text(mesajAlert);
	$.mobile.changePage('#dialogCreare', {
		transition : "none"
	});
}

function salveazaDelegatie() {

	try {

		var judetPlecare = $('#start-loc-input').val().split('/')[1];
		var locPlecare = $('#start-loc-input').val().split('/')[0];

		var judetSosire = $('#stop-loc-input').val().split('/')[1];
		var locSosire = $('#stop-loc-input').val().split('/')[0];

		var nrAuto = $('#nrAuto').val();
		var dataPlecare = $('#dateStart').val();
		var oraPlecare = $('#select-ora').val();
		var distkm = $('#kmtraseu').text();
		var dataSosire = $('#dateStop').val();

		var tipAng = $('#tipAng').text();
		var codAng = $('#codAng').text();
		var unitLog = $('#unitLog').text();

		if (locPlecare == '') {
			showAlertCreare('Atentie!', 'Selectati localitatea de plecare.');
			return false;
		}

		if (locSosire == '') {
			showAlertCreare('Atentie!', 'Selectati localitatea de sosire.');
			return false;
		}

		if (nrAuto == '') {
			showAlertCreare('Atentie!', 'Completati nr. auto.');
			return false;
		}

		if (dataPlecare == '') {
			showAlertCreare('Atentie!', 'Selectati data plecare.');
			return false;
		}

		if (oraPlecare == '') {
			showAlertCreare('Atentie!', 'Selectati ora plecare.');
			return false;
		}

		if (dataSosire == '') {
			showAlertCreare('Atentie!', 'Selectati data sosire.');
			return false;
		}

		var delegatiiSuprapuse = getDelegatiiSuprapuse(codAng, dataPlecare,
				dataSosire);

		var subst = 'delegatia ';
		if (delegatiiSuprapuse.indexOf(',') != -1)
			subst = 'delegatiile ';

		if (delegatiiSuprapuse != '') {
			showAlertCreare('Atentie!', 'Aceasta delegatie se suprapune cu '
					+ subst + delegatiiSuprapuse + ' si nu poate fi salvata.');
			return false;

		}

		var opriri = locPlecare + ' / ' + judetPlecare;

		$('.stopsList').each(
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

		var delegatie = new Object();
		delegatie.codAngajat = codAng;
		delegatie.tipAngajat = tipAng;
		delegatie.dataP = dataPlecare;
		delegatie.oraP = oraPlecare;
		delegatie.dataS = dataSosire;
		delegatie.distcalc = distkm;
		delegatie.stops = opriri;
		delegatie.nrAuto = nrAuto;
		delegatie.distreal = '0';
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

			if (data == 1)
				showAlertCreare('Status', 'Date salvate cu succes.');
			else
				showAlertCreare('Status', 'Eroare salvare date.');
			hideControls();

		}

		function onError() {
			$.mobile.loading('hide');
		}

	} catch (err) {
		alert(err.message);
	}

}

$('#schimbaAuto').on('click', function(e) {
	e.stopImmediatePropagation();
	e.preventDefault();

	if ($('#alegeAutoDiv').is(':visible')) {
		$("#alegeAutoDiv").hide();
		$("#salveazaAutoDiv").hide();
	} else {
		$("#alegeAutoDiv").show();
		$("#salveazaAutoDiv").show();
	}

});

$('#salveazaAuto').on('click', function(e) {
	e.stopImmediatePropagation();
	e.preventDefault();

	var selAuto = $('#select-auto').val();

	$('#nrAuto').val(selAuto);

	$("#alegeAutoDiv").hide();
	$("#salveazaAutoDiv").hide();

});

function hideControls() {

	$('#stopsList').empty();
	$('#nrAuto').empty();

	$("#map_canvas_delegatie").hide();
	$("#dateTraseu").hide();
	$(this).hide();

	$('#calcDist').hide();
	$('#saveDelegatie').hide();

}

function initDateFields() {

	var dateStart;
	var dateStop;

	$("#dateStart").datepicker(
			{
				minDate : -90,
				maxDate : "+30D",
				dateFormat : "dd-mm-yy",
				onSelect : function(selected) {
					$("#dateStop").datepicker("option", "minDate", selected)

					calcDays($('#dateStart').datepicker('getDate'), $(
							'#dateStop').datepicker('getDate'));

				}

			});

	$("#dateStop").datepicker(
			{
				minDate : 0,
				maxDate : "+60D",
				dateFormat : "dd-mm-yy",
				onSelect : function() {
					calcDays($('#dateStart').datepicker('getDate'), $(
							'#dateStop').datepicker('getDate'));

				}

			});

	var cDate = new Date();
	var daysToAdd = 1;
	cDate.setDate(cDate.getDate() + daysToAdd);

	$("#dateStart").datepicker("setDate", cDate);
	$("#dateStop").datepicker("setDate", cDate);

	initDateDelegatieEfectuata();

}

function calcDays(dateStart, dateEnd) {

	var days = (dateEnd - dateStart) / 1000 / 60 / 60 / 24;

	if (days > 0)
		showAlertCreare(
				'Info',
				'Durata delegatiei este de '
						+ (days + 1)
						+ ' zile. Acesta este un mesaj informativ cu scopul de a evita crearea din greseala a unei delegatii pe mai multe zile. Apasati X pentru a continua.');

}

function getDaysBack() {

	var today = new Date();
	var dd = today.getDate();
	var mm = today.getMonth() + 1;
	var yyyy = today.getFullYear();

	if (dd <= 30 && mm < 10 && yyyy == 2017)
		return new Date('2017/09/01');

	else {

		var d = new Date();
		var n = d.getDay();

		if (n == 1)
			return "-3D";

		return "-1D";
	}
}

function initNrAutoFields() {

	getServerDate();

	var listMasini = $('#listMasini').text().replace('[', '').replace(']', '')
			.split(',');

	$('#nrAuto').val(listMasini[0]);

	$('#select-auto').empty();

	$('#schimbaAuto').hide();
	
	if (listMasini.length > 0) {

		var i;

		for (i = 1; i <= listMasini.length - 1; i++) {
			$('#select-auto').append(
					'<option value=' + listMasini[i] + '>' + listMasini[i]
							+ '</option>');

		}

		if (i > 1)
			$('#schimbaAuto').show();

		$("#select-auto option[value='" + listMasini[1] + "']").attr(
				'selected', 'selected');
		$('#select-auto').selectmenu('refresh');
		$('#select-auto').trigger('change');
	}

}

function getServerDate() {

	$.ajax({
		type : "GET",
		url : window.location.origin + "/flota.service/delegatii/getDate",
		cache : false,
		dataType : "text",
		success : onSuccess
	});

	function onSuccess(data) {
		serverDate = data;

	}

}

function showDelegatieNoua() {

	$('#div_nrauto').show();
	$('#div_dateplecare').show();
	$('#div_datesosire').show();
	$('#div_localitati').show();
	$('#div_calculeaza').show();
	$('#div_intervaldelgen').hide();
	$('#div_genereaza').hide();
	$('#del_generata').hide();
	$('#saveDelegatieGenerata').hide();

}

function showDelegatieEfectuata() {

	$('#div_nrauto').hide();
	$('#div_dateplecare').hide();
	$('#div_datesosire').hide();
	$('#div_localitati').hide();
	$('#div_calculeaza').hide();
	$('#dateTraseu').hide();
	$('#div_intervaldelgen').show();
	$('#div_genereaza').show();
	$('#saveDelegatie').hide();

}

function initDateDelegatieEfectuata() {

	$("#dateStartEfect").datepicker({
		minDate : "-30D",
		maxDate : "-1D",
		dateFormat : "dd-mm-yy",
		onSelect : function(selected) {
			$("#dateStopEfect").datepicker("option", "minDate", selected);

		}

	});

	$("#dateStopEfect").datepicker({
		minDate : "-1D",
		maxDate : "-1D",
		dateFormat : "dd-mm-yy"

	});

	var cDate = new Date();
	var daysToAdd = -1;
	cDate.setDate(cDate.getDate() + daysToAdd);

	$("#dateStartEfect").datepicker("setDate", cDate);
	$("#dateStopEfect").datepicker("setDate", cDate);

}

function genereazaDelegatie() {

	var dataPlecare = $('#dateStartEfect').val();
	var dataSosire = $('#dateStopEfect').val();
	var codAng = $('#codAng').text();

	$.mobile.loading('show');

	$.ajax({
		type : "GET",
		url : window.location.origin
				+ "/flota.service/delegatii/genereazaDelegatie",
		data : ({
			codAngajat : codAng,
			dataStart : dataPlecare,
			dataStop : dataSosire
		}),
		cache : false,
		dataType : "text",
		success : onSuccess

	});

	function onSuccess(data) {
		$.mobile.loading('hide');
		afiseazaDelegatieGenerata(data);

	}

}

function afiseazaDelegatieGenerata(data) {

	$('#del_generata').show();
	$('#del_generata').html(formatDelegatieGenerata($.parseJSON(data)));
	$('#saveDelegatieGenerata').show();

	scrollToDelegatie();

}

function scrollToDelegatie() {
	$(function() {
		$('html, body').animate({
			scrollTop : $('#del_generata').offset().top
		});
	});
}
