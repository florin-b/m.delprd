$(document)
		.on(
				"pagecreate",
				"#modifica",
				function() {

					$('#list-start-locM').on('click', 'li', function() {

						$('#start-loc-inputM').val($(this).text());
						$("#list-start-locM").hide();

					});

					$("#list-start-locM")
							.on(
									"filterablebeforefilter",
									function(e, data) {
										var $ul = $(this), $input = $(data.input), value = $input
												.val(), html = "";
										$ul.html("");
										if (value && value.length > 2) {

											$("#list-start-locM").show();

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

					$('#list-stop-locM').on('click', 'li', function() {

						$('#stop-loc-inputM').val($(this).text());
						$("#list-stop-locM").hide();

					});

					$("#list-stop-locM")
							.on(
									"filterablebeforefilter",
									function(e, data) {
										var $ul = $(this), $input = $(data.input), value = $input
												.val(), html = "";
										$ul.html("");
										if (value && value.length > 2) {

											$("#list-stop-locM").show();

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
					
					
					
					
					$('#list-punct-locM').on('click', 'li', function() {

						$('#punct-loc-inputM').val($(this).text());
						$("#list-punct-locM").hide();

					});

					$("#list-punct-locM")
							.on(
									"filterablebeforefilter",
									function(e, data) {
										var $ul = $(this), $input = $(data.input), value = $input
												.val(), html = "";
										$ul.html("");
										if (value && value.length > 2) {

											$("#list-punct-locM").show();

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