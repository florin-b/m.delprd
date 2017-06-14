var listOpririTest = [];
var json_parsed;
var rowid;

$(document).on('pageshow', '#afiseaza', function() {

});

function afiseazaDelegatii() {
	var date = $('#dateStart').val();

	var codAng = $('#codAng').text();

	$.mobile.loading('show');
	$.ajax({
		type : "GET",
		url : window.location.origin + "/flota.service/delegatii/afiseazaDelegatii",
		data : ({
			codAngajat : codAng
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
					+ delegatie.id + '>' + adaugaDelegatie1(delegatie)
					+ '</div>' + '</li>';

			$('#delegatiiList').append(str).listview('refresh');

		}

		$.mobile.loading('hide')

	}

}

function afisDelegatii() {
	afiseazaDelegatii();
}

function adaugaDelegatie1(delegatie) {

	var content = '<table border="0" style="width:100%;" cellpadding="6" data-role="table"  data-mode="columntoggle" class="ui-responsive table-stroke">';
	content += '<tr><td colspan="2"><b>' + delegatie.numeAngajat
			+ "</b></td></tr>";

	content += '<tr><td width="30%">Data plecare:</td><td> '
			+ delegatie.dataPlecare + "</td></tr>";
	content += '<tr><td>Ora plecare: </td><td>' + delegatie.oraPlecare
			+ "</td></tr>";

	content += decodeOpriri(delegatie.listOpriri);

	content += '<tr><td>Km calculati: </td><td>' + delegatie.distantaCalculata
			+ " km </td></tr>";

	content += '<tr><td>Km realizati: </td><td>' + delegatie.distantaEfectuata
			+ " km </td></tr>";
	content += '<tr><td>Km raprobati: </td><td>' + delegatie.distantaAprobata
			+ " km </td></tr>";

	content += '</table>';

	return content;
}
