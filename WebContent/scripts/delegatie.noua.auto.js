$(document)
		.on(
				"pagecreate",
				"#new-page",
				function() {

					$(document).on(
							"click",
							"li",
							function() {
								var text = $(this).text();
								$(this).closest("ul").prev("form")
										.find("input").val(text);

								$("#autocomplete").hide();

							});

					$("#autocomplete")
							.on(
									"filterablebeforefilter",
									function(e, data) {
										var $ul = $(this), $input = $(data.input), value = $input
												.val(), html = "";
										$ul.html("");
										if (value && value.length > 2) {

											$("#autocomplete").show();

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