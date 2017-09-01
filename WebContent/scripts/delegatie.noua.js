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

});

$('#punct-loc-input').on('focus', function() {
	/*
	$(function() {
		$('html, body').animate({
			scrollTop : $('#punct-loc-input').offset().top
		});
	});
	
	
	$('#punct-loc-input').focus();
	*/
});
$('#punct-loc-input').on('blur', function() {
	//$.mobile.silentScroll($('#punct-loc-input').position().top);
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
	$.mobile.changePage('#dialogCreare');
}

function salveazaDelegatie() {

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

	$.mobile.loading('show');

	$.ajax({
		type : "POST",
		url : window.location.origin
				+ "/flota.service/delegatii/adaugaDelegatie",
		data : ({
			codAngajat : codAng,
			tipAngajat : tipAng,
			dataP : dataPlecare,
			oraP : oraPlecare,
			dataS : dataSosire,
			distcalc : distkm,
			stops : opriri,
			nrAuto : nrAuto
		}),
		cache : false,
		dataType : "text",
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
	$("#dateStart").datepicker({
		minDate : "-1D",
		maxDate : "+10D",
		dateFormat : "dd-mm-yy",
		onSelect : function(selected) {
			$("#dateStop").datepicker("option", "minDate", selected)

		}

	});

	$("#dateStop").datepicker({
		minDate : 0,
		maxDate : "+30D",
		dateFormat : "dd-mm-yy",

	});

	var cDate = new Date();
	var daysToAdd = 1;
	cDate.setDate(cDate.getDate() + daysToAdd);

	$("#dateStart").datepicker("setDate", cDate);
	$("#dateStop").datepicker("setDate", cDate);
}

function initNrAutoFields() {

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
