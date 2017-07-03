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