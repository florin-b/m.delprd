$(document)
		.on(
				"pagecreate",
				"#new-page",
				function() {

					$('#list-start-loc').on('click', 'li', function() {

						$('#start-loc-input').val($(this).text());
						$("#list-start-loc").hide();

					});

					$("#list-start-loc")
							.on(
									"filterablebeforefilter",
									function(e, data) {
										var $ul = $(this), $input = $(data.input), value = $input
												.val(), html = "";
										$ul.html("");
										if (value && value.length > 2) {

											$("#list-start-loc").show();

											$ul
													.html("<li><div class='ui-loader'><span class='ui-icon ui-icon-loading'></span></div></li>");
											$ul.listview("refresh");
											$
													.ajax(
															{
																type : "GET",
																url : window.location.origin
																		+ "/flota.service/delegatii/cautaLocalitati",
																cache : false,
																dataType : "text",
																data : {
																	numeLoc : $input
																			.val()
																}
															})
													.then(

															function(response) {

																var arrayLoc = response
																		.split(",");

																for (var i = 0; i < arrayLoc.length; i++) {
																	html += "<li>"
																			+ arrayLoc[i]
																			+ "</li>";
																}

																$ul.html(html);
																$ul
																		.listview("refresh");
																$ul
																		.trigger("updatelayout");
															});
										}
									});

					$('#list-stop-loc').on('click', 'li', function() {

						$('#stop-loc-input').val($(this).text());
						$("#list-stop-loc").hide();

					});

					$("#list-stop-loc")
							.on(
									"filterablebeforefilter",
									function(e, data) {
										var $ul = $(this), $input = $(data.input), value = $input
												.val(), html = "";
										$ul.html("");
										if (value && value.length > 2) {

											$("#list-stop-loc").show();

											$ul
													.html("<li><div class='ui-loader'><span class='ui-icon ui-icon-loading'></span></div></li>");
											$ul.listview("refresh");
											$
													.ajax(
															{
																type : "GET",
																url : window.location.origin
																		+ "/flota.service/delegatii/cautaLocalitati",
																cache : false,
																dataType : "text",
																data : {
																	numeLoc : $input
																			.val()
																}
															})
													.then(

															function(response) {

																var arrayLoc = response
																		.split(",");

																for (var i = 0; i < arrayLoc.length; i++) {
																	html += "<li>"
																			+ arrayLoc[i]
																			+ "</li>";
																}

																$ul.html(html);
																$ul
																		.listview("refresh");
																$ul
																		.trigger("updatelayout");
															});
										}
									});

					$('#list-punct-loc').on('click', 'li', function() {

						$('#punct-loc-input').val($(this).text());
						$("#list-punct-loc").hide();

					});

					$("#list-punct-loc")
							.on(
									"filterablebeforefilter",
									function(e, data) {
										var $ul = $(this), $input = $(data.input), value = $input
												.val(), html = "";
										$ul.html("");
										if (value && value.length > 2) {

											$("#list-punct-loc").show();

											$ul
													.html("<li><div class='ui-loader'><span class='ui-icon ui-icon-loading'></span></div></li>");
											$ul.listview("refresh");
											$
													.ajax(
															{
																type : "GET",
																url : window.location.origin
																		+ "/flota.service/delegatii/cautaLocalitati",
																cache : false,
																dataType : "text",
																data : {
																	numeLoc : $input
																			.val()
																}
															})
													.then(

															function(response) {

																var arrayLoc = response
																		.split(",");

																for (var i = 0; i < arrayLoc.length; i++) {
																	html += "<li>"
																			+ arrayLoc[i]
																			+ "</li>";
																}

																$ul.html(html);
																$ul
																		.listview("refresh");
																$ul
																		.trigger("updatelayout");
															});
										}
									});

				});

function loadjsfile() {

	var googleSrc = 'https://maps.googleapis.com/maps/api/js?key='
			+ getMapKey();

	var fileref = document.createElement('script');
	fileref.setAttribute("type", "text/javascript");
	fileref.setAttribute("src", googleSrc);

	document.getElementsByTagName("head")[0].appendChild(fileref)

}

function getMapKey() {

	var key1 = "AIzaSyC6KA9_ltzZ7nJOnZdZlJv4N9YTiaGYG5Y";
	var key2 = "AIzaSyBsFNT-vjdopb3dI_4hSDfXb2Qv3wqTwZ4";
	var key3 = "AIzaSyC5LRmkHjtEYCRB99GJrZkoKTZ0Xh3uGJw";
	var key4 = "AIzaSyCOSA-8X5rldxSzkJVDJzvNcC7nVNZPtKA";
	var key5 = "AIzaSyCduykhBCHNaIGtZyQ2dtNOzjvEquWQxWs";
	var key6 = "AIzaSyDOS5_XfXpFBIjJ1-X_N3nGGT7Csx-X-Po";
	var key7 = "AIzaSyDmwmvsWujoSasKPneKKese-3yp4r_hQyY";

	var rnd = Math.floor((Math.random() * 7) + 1);

	var key;

	switch (rnd) {
	case 2:
		key = key2;
		break;
	case 3:
		key = key3;
		break;
	case 4:
		key = key4;
		break;
	case 5:
		key = key5;
		break;
	case 6:
		key = key6;
		break;
	case 7:
		key = key7;
		break;
	case 1:
	default:
		key = key1;
		break;

	}

	return key;

}
