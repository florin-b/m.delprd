
$('#aprobList').on('click', 'li', function(e) {

	e.stopImmediatePropagation();

	rowid = $(this).data("rowid");

	listOpririTest = getOpriri(rowid, json_parsed.delegatii);

});

$("#aprobList").on("click", "li input", function(e) {
	e.stopImmediatePropagation();
	var rowid = $(this).parents("li").data("rowid");
	var btnText = $(this).val();

	alert(rowid);
	

	return false;
});
