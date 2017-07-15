function decodeOpriri(delegatie) {

	var content = '<table border="0" style="width:100%;" cellpadding="5" data-role="table"  data-mode="columntoggle" class="ui-responsive">';

	var vizitatStr = '<img src="../img/ok.png">';
	var nevizitatStr = '<img src="../img/cancel.png">';

	var status = '';
	for (var i = 0; i < delegatie.listOpriri.length; i++) {

		if (i > 0 && i < delegatie.listOpriri.length
				&& delegatie.distantaEfectuata > 0) {
			if (delegatie.listOpriri[i].vizitat)
				status = vizitatStr;
			else
				status = nevizitatStr;
		}

		content += '<tr><td>' + delegatie.listOpriri[i].adresa + '</td><td>'
				+ status + '</td></tr>';

		status = '';
	}

	content += '</table>';

	return content;

}

function getOpriri(idDelegatie, listDelegatii) {
	var stops = [];

	for (var i = 0; i < listDelegatii.length; i++) {

		if (listDelegatii[i].id == idDelegatie) {

			for (var j = 0; j < listDelegatii[i].listOpriri.length; j++) {
				stops.push(listDelegatii[i].listOpriri[j].adresa);
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
			idDelegatie : idDelegatie
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
