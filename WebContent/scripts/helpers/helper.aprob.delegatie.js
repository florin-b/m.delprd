function decodeOpriri(opriri) {

	var tt = opriri + '';
	var arrayOpriri = tt.split(',');
	var content = '';
	var label = 'Traseu';
	for (var i = 0; i < arrayOpriri.length; i++) {
		if (i > 0)
			label = '';
		content += '<tr><td>' + label + '</td><td>' + arrayOpriri[i]
				+ '</td></tr>';
	}

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