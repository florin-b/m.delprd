function decodeOpriri(opriri) {

	var tt = opriri + '';
	var arrayOpriri = tt.split(',');
	var content = '<table border="0" style="width:100%;" cellpadding="5" data-role="table"  data-mode="columntoggle" class="ui-responsive">';
	for (var i = 0; i < arrayOpriri.length; i++) {
		content += '<tr><td>' + arrayOpriri[i] + '</td></tr>';
	}

	content += '</table>';

	return content;

}

function getOpriri(idDelegatie, listDelegatii) {
	var stops = [];

	for (var i = 0; i < listDelegatii.length; i++) {

		if (listDelegatii[i].id == idDelegatie) {

			var arrayOpriri = (listDelegatii[i].listOpriri + '').split(',');

			for (var j = 0; j < arrayOpriri.length; j++) {
				stops.push(arrayOpriri[j]);
			}
		}
	}

	return stops;
}

function getCoordsTraseu(idDelegatie) {

	var coordsTraseu;

	$.mobile.loading('show');

	$.ajax({
		type : "GET",
		url : window.location.origin
				+ "/flota.service/delegatii/getCoordsTraseu",
		data : ({
			codMasina : '90033028',
			dataStart : '08-06-2017 06:50',
			dataStop : '08-06-2017 07:02'
		}),
		cache : false,
		dataType : "text",
		async : false,
		success : onSuccess
	});

	function onSuccess(data) {
		coordsTraseu = data;

		$.mobile.loading('hide');

	}

	return coordsTraseu;

}
