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

$(document).on(
		"pagecreate",
		"#new-page",
		function() {

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

			initDateFields();

			setDefaultJudetPlecare();
			setDefaultJudetSosire();

			$('body').on(
					'change',
					'#select-judet-opriri',
					function() {

						var judet = $(this[this.selectedIndex]).val();

						$.mobile.loading('show');

						$.ajax({
							type : "GET",
							url : window.location.origin
									+ "/flota.service/delegatii/localitati",
							data : ({
								codJudet : judet
							}),
							cache : false,
							dataType : "text",
							success : onSuccess
						});

						function onSuccess(data) {

							var locList = formatLocalitatiList(data);

							$('#select-loc-opriri').empty();
							$('#select-loc-opriri').append(locList);
							$('#select-loc-opriri').selectmenu('refresh');
							$.mobile.loading('hide')

							var defaultLoc = getDefaultLoc(judet);
							if (defaultLoc != '')
								$('#select-loc-opriri').val(defaultLoc)
										.selectmenu('refresh');

						}

					});

		});

function formatLocalitatiList(strLocalitati) {

	var arrayLoc = strLocalitati.substring(1, strLocalitati.length - 1).split(
			",");

	var formattedList = '';

	for (var i = 0; i < arrayLoc.length; i++) {
		formattedList += '<option>';
		formattedList += arrayLoc[i];
		formattedList += '</option>';

	}

	return formattedList;

}

function adaugaStop() {

	var numejudet = $('#select-judet-opriri').find(":selected").text();

	var codjudet = $('#select-judet-opriri').find(":selected").val();

	var localitate = $('#select-loc-opriri').find(":selected").text();

	var stop = numejudet + ' / ' + localitate;

	if (localitate != '') {

		$('#calcDist').show();

		$('#stopsList').append(
				'<li value = ' + codjudet + '><a>' + stop
						+ '</span></a><a class="deleteMe"></a></li>').listview(
				'refresh');

	} else {
		showAlertCreare('Atentie!', 'Selectati o localitate.');
	}
}

function showAlertCreare(tipAlert, mesajAlert) {
	$('#tipAlertC').text(tipAlert);
	$('#textAlertC').text(mesajAlert);
	$.mobile.changePage('#dialogCreare');
}

function salveazaDelegatie() {

	var judetPlecare = $('#select-judet-plecare').find(":selected").val();
	var locPlecare = $('#select-loc-plecare').find(":selected").text();

	var judetSosire = $('#select-judet-sosire').find(":selected").val();
	var locSosire = $('#select-loc-sosire').find(":selected").text();

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

	var opriri = judetPlecare + ' / ' + locPlecare;

	$('.stopsList').each(
			function() {
				var list = $(this).find('li');
				$(list.get()).each(
						function() {
							var currentStop = $(this).val() + ' / '
									+ $(this).text().split('/')[1];

							opriri += "," + currentStop;

						});

			})

	opriri += ',' + judetSosire + ' / ' + locSosire;

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
	$('#select-loc').empty();
	$('#select-loc').selectmenu('refresh');
	$("#map_canvas_delegatie").hide();
	$("#dateTraseu").hide();
	$(this).hide();

	$('#select-judet').val('00');

	$('#select-judet').selectmenu('refresh');

	$('#calcDist').hide();
	$('#saveDelegatie').hide();

}

$('body').on('change', '#select-judet-plecare', function() {

	var judet = $(this[this.selectedIndex]).val();

	$.mobile.loading('show');

	$.ajax({
		type : "GET",
		url : window.location.origin + "/flota.service/delegatii/localitati",
		data : ({
			codJudet : judet
		}),
		cache : false,
		dataType : "text",
		success : onSuccess
	});

	function onSuccess(data) {

		var locList = formatLocalitatiList(data);

		$('#select-loc-plecare').empty();
		$('#select-loc-plecare').append(locList);
		$('#select-loc-plecare').selectmenu('refresh');
		$.mobile.loading('hide')

		var defaultLoc = getDefaultLoc(judet);

		if (defaultLoc != '')
			$('#select-loc-plecare').val(defaultLoc).selectmenu('refresh');

	}

});

$('body').on('change', '#select-judet-sosire', function() {

	var judet = $(this[this.selectedIndex]).val();

	$.mobile.loading('show');

	$.ajax({
		type : "GET",
		url : window.location.origin + "/flota.service/delegatii/localitati",
		data : ({
			codJudet : judet
		}),
		cache : false,
		dataType : "text",
		success : onSuccess
	});

	function onSuccess(data) {

		var locList = formatLocalitatiList(data);

		$('#select-loc-sosire').empty();
		$('#select-loc-sosire').append(locList);
		$('#select-loc-sosire').selectmenu('refresh');
		$.mobile.loading('hide')

		var defaultLoc = getDefaultLoc(judet);
		if (defaultLoc != '')
			$('#select-loc-sosire').val(defaultLoc).selectmenu('refresh');

	}

});

function setDefaultJudetPlecare() {
	var unitLog = $('#unitLog').text();

	var codJudet = getCodJudet(unitLog);

	$("#select-judet-plecare option[value='" + codJudet + "']").attr(
			'selected', 'selected');
	$('#select-judet-plecare').selectmenu('refresh');
	$('#select-judet-plecare').trigger('change');

}

function setDefaultJudetSosire() {
	var unitLog = $('#unitLog').text();

	var codJudet = getCodJudet(unitLog);

	$("#select-judet-sosire option[value='" + codJudet + "']").attr('selected',
			'selected');
	$('#select-judet-sosire').selectmenu('refresh');
	$('#select-judet-sosire').trigger('change');

}

function initDateFields() {
	$("#dateStart").datepicker({
		dateFormat : "dd-mm-yy"
	});

	$("#dateStop").datepicker({
		dateFormat : "dd-mm-yy"
	});

	var cDate = new Date();
	var daysToAdd = 1;
	cDate.setDate(cDate.getDate() + daysToAdd);

	$("#dateStart").datepicker("setDate", cDate);
	$("#dateStop").datepicker("setDate", cDate);
}
