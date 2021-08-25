var categoriiSelectate = ' ';
var globalListCategorii;
var globalListAngajati = [];
var angajatiSelectati = ' ';

$(document).on('pagecreate', '#pozitie', function() {

	getCategoriiAngajati();

});

$(document).on(
		'pageshow',
		'#pozitie',
		function() {
			$('#listCategorii').on(
					'click',
					'li',
					function(e) {

						e.preventDefault();
						e.stopImmediatePropagation();

						var categorieId = $(this).attr("data-rowid");

						if ($('#check' + categorieId).is(":checked")) {
							$('#check' + categorieId).prop("checked", false);
							categoriiSelectate = categoriiSelectate.replace(
									categorieId + ';', '');

						} else {
							$('#check' + categorieId).prop("checked", true);

							categoriiSelectate += categorieId + ';';

						}

						if (categoriiSelectate.trim().length > 0)
							getAngajatiCategorie();
						else
							clearAngajatiCategorie();

					});

			$('#listAngajati').on(
					'click',
					'li',
					function(e) {

						e.preventDefault();
						e.stopImmediatePropagation();

						var angajatId = $(this).attr("data-rowid");

						if ($('#angaj' + angajatId).is(":checked")) {
							$('#angaj' + angajatId).prop("checked", false);
							angajatiSelectati = angajatiSelectati.replace(
									angajatId + ';', '');

						} else {
							$('#angaj' + angajatId).prop("checked", true);
							angajatiSelectati += angajatId + ';';

						}

					});

		});

$('#toateCateg').on('change', function() {

	$('#toateCateg').prop("disabled", true);

	if (!this.checked) {
		for (var u = 0; u < globalListCategorii.length; u++) {
			$('#check' + globalListCategorii[u].tip).prop("checked", false);
			categoriiSelectate = ' ';
		}
	} else {
		for (var u = 0; u < globalListCategorii.length; u++) {
			$('#check' + globalListCategorii[u].tip).prop("checked", true);
			categoriiSelectate += globalListCategorii[u].tip + ';';
		}
	}

	getAngajatiCategorie();
});

$('#totiAngajatii').on('change', function() {

	if (!this.checked) {
		for (var u = 0; u < globalListAngajati.length; u++) {
			$('#angaj' + globalListAngajati[u].cod).prop("checked", false);
			angajatiSelectati = ' ';
		}
	} else {
		for (u = 0; u < globalListAngajati.length; u++) {
			$('#angaj' + globalListAngajati[u].cod).prop("checked", true);
			angajatiSelectati += globalListAngajati[u].cod + ';';
		}
	}

});

function getCategoriiAngajati() {

	var tipAng = $('#tipAng').text();

	$.ajax({
		type : 'GET',
		url : window.location.origin
				+ "/flota.service/delegatii/getCategoriiSubord",
		data : ({
			tipAngajat : tipAng
		}),
		beforeSend : function() {
			loading('show');
		},
		complete : function() {
			loading('hide');
		},
		success : function(data) {
			loadCategoriiList(data);

		},
		error : function(exception) {
			alert('Exeption:' + JSON.stringify(exception));
		}

	});

}

function loadCategoriiList(listCategorii) {

	globalListCategorii = listCategorii;

	$('#listCategorii').empty().listview('refresh');

	for (var u = 0; u < listCategorii.length; u++) {
		var categorie = listCategorii[u];

		var li = $('<li/>').attr('data-rowid', categorie.tip).html(
				getCategorieItem(categorie));

		$('#listCategorii').append(li).listview('refresh');

	}

}

function getCategorieItem(categorie) {

	var item = '<table><tr><td><input type="checkbox" name="'
			+ categorie.descriere + '" id="check' + categorie.tip + '"></td>';

	item += '<td><label for="check' + categorie.tip + '">'
			+ categorie.descriere + ' (' + categorie.tip
			+ ')</label></td></tr></table>';

	return item;

}

function getCategorieItemNew(categorie) {

	var tip = $('<input/>', {
		'type' : 'checkbox',
		'id' : 'check' + categorie.tip,
		'name' : categorie.descriere
	}).after($('<label />', {
		'for' : 'check' + categorie.tip
	}).text(categorie.descriere));

	return tip;

}

function getAngajatiCategorie() {

	var unitLog = $('#unitLog').text();
	var depart = $('#codDepart').text();

	$.ajax({
		type : 'GET',
		url : window.location.origin
				+ "/flota.service/delegatii/getAngajatiCategorie",
		data : ({
			filiala : unitLog,
			tipAngajat : categoriiSelectate,
			departament : depart
		}),
		beforeSend : function() {
			loading('show');
		},
		complete : function() {
			loading('hide');
		},
		success : function(data) {
			loadListAngajati(data);

		},
		error : function(exception) {
			alert('Exeption:' + JSON.stringify(exception));
		}

	});

}

function loadListAngajati(listAngajati) {
	
	

	jQuery('#totiAngajatii').prop({
		'checked' : false
	}).checkboxradio('refresh');

	globalListAngajati = listAngajati;
	afisListAngajati(listAngajati);

}

function afisListAngajati(angajati) {

	$('#listAngajati').empty().listview('refresh');

	angajatiSelectati = ' ';

	for (var u = 0; u < angajati.length; u++) {
		var angajat = angajati[u];

		var li = $('<li/>').attr('data-rowid', angajat.cod).html(
				getAngajatItem(angajat));

		$('#listAngajati').append(li).listview('refresh');

	}

	$('#listAngajati').listview('refresh');

	jQuery('#toateCateg').prop({
		'disabled' : false
	}).checkboxradio('refresh');

}

function getAngajatItem(angajat) {

	var item = '<table><tr><td><input type="checkbox" name="' + angajat.nume
			+ '" id="angaj' + angajat.cod + '"></td>';

	item += '<td><label for="angaj' + angajat.cod + '">' + angajat.nume
			+ '</label></td></tr></table>';

	return item;

}

function deleteTipAngajat(tipAngajat) {

	var i = globalListAngajati.length;

	while (i--) {
		if (globalListAngajati[i].categorie == tipAngajat)
			globalListAngajati.splice($.inArray(globalListAngajati[i],
					globalListAngajati), 1);
	}

	afisListAngajati(globalListAngajati);

}

function clearAngajatiCategorie() {
	$('#listAngajati').empty().listview('refresh');

}

function loading(showOrHide) {
	setTimeout(function() {
		$.mobile.loading(showOrHide);
	}, 1);
}