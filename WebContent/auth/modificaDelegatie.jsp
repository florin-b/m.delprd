<!DOCTYPE html>
<html>
<head>
<title>DELEGATII</title>



<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="viewport" content="width=device-width, initial-scale=1">


<link rel="stylesheet"
	href="https://code.jquery.com/mobile/1.4.5/jquery.mobile-1.4.5.min.css">
<script src="https://code.jquery.com/jquery-1.11.3.min.js"></script>



<script type="text/javascript" src="../scripts/helpers/helper.adrese.js"></script>

<link rel="stylesheet"
	href="//code.jquery.com/ui/1.12.1/themes/smoothness/jquery-ui.css">
<script src="//code.jquery.com/jquery-1.12.4.js"></script>
<script src="//code.jquery.com/ui/1.12.1/jquery-ui.js"></script>


<script
	src="https://code.jquery.com/mobile/1.4.5/jquery.mobile-1.4.5.min.js"></script>


<script type="text/javascript"
	src="../scripts/modifica.delegatie.auto.js"></script>

<style>
#block_container {
	text-align: center;
}

#bloc1, #bloc2 {
	display: inline;
}

.boxInline {
	display: inline-block;
	margin: 1em;
	left: 5px;
}

.ui-block-a {
	text-align: left;
	vertical-align: middle;
	padding: 10px;
}

.ui-block-b {
	text-align: left;
	vertical-align: middle;
	padding: 10px;
}
</style>

</head>
<body>


	<div data-role="page" id="modifica" data-url="">


		<div data-role="panel" data-display="overlay" data-position="left"
			id="left-panel" data-theme="a">
			<ul data-role="listview">
				<jsp:include page="navbar.jsp">
					<jsp:param name="tipuser" value="${sessionScope.user.tipAng }" />
				</jsp:include>
			</ul>
		</div>
		<div data-role="header" data-theme="a">
			<h1>Modifica delegatie</h1>
			<a href="#left-panel" data-theme="d" data-icon="arrow-r"
				data-iconpos="notext" data-shadow="false" data-iconshadow="false"
				class="ui-icon-nodisc">Meniu</a>
		</div>
		<!-- /header -->
		<div data-role="content" id="delegatieContent">

			<div id='labelInfo' style="margin: 5px;">Selectati o delegatie</div>

			<br>
			<div class="ui-corner-all custom-corners">
				<ul data-role="listview" id="listdel" data-inset="true"
					style="height: 200px; overflow: auto;">

				</ul>
			</div>





			<div id='detaliiDelegatie'>


				<div id='selectedDel' style="margin: 5px;"></div>
				<br>




				<div class="ui-corner-all custom-corners">

					<div class="ui-bar ui-bar-a">Nr. auto</div>

					<div class="ui-body ui-body-a">

						<div class="ui-grid-a ui-responsive">

							<div class="ui-block-a">Curent</div>

							<div class="ui-block-b">
								<input type="text" name="nrAutoM" class="ui-corner-all"
									id="nrAutoM" readonly="readonly" />
							</div>



						</div>


						<div class="ui-grid-a ui-responsive">

							<div class="ui-block-a"></div>

							<div class="ui-block-b">
								<input type="button" name="schimbaAutoM" id="schimbaAutoM"
									class="ui-btn ui-corner-all" data-theme="a" value="Schimba" />
							</div>
						</div>

						<div class="ui-grid-a ui-responsive" id="alegeAutoDivM"
							style="display: none;">

							<div class="ui-block-a">Selecteaza nr. auto</div>

							<div class="ui-block-b">
								<div class="ui-field-contain">
									<select name="select-autoM" id="select-autoM">

									</select>

								</div>
							</div>

						</div>

						<div class="ui-grid-a ui-responsive" id="salveazaAutoDivM"
							style="display: none;">

							<div class="ui-block-a"></div>

							<div class="ui-block-b">
								<input type="button" name="salveazaAutoM" id="salveazaAutoM"
									class="ui-btn ui-corner-all" data-theme="a" value="Salveaza" />
							</div>
						</div>

					</div>
				</div>


				<br>

				<div class="ui-corner-all custom-corners">
					<div class="ui-bar ui-bar-a">Plecare</div>

					<div class="ui-body ui-body-a">

						<div class="ui-grid-a ui-responsive">

							<div class="ui-block-a">Data</div>

							<div class="ui-block-b">
								<input id="dateStartM" type="text" readonly="readonly"
									style="position: relative; z-index: 100000;" />



							</div>

						</div>


						<div class="ui-grid-a ui-responsive">
							<div class="ui-block-a">Ora</div>
							<div class="ui-block-b">
								<select name="select-oraM" id="select-oraM">
									<option value="0500">05:00</option>
									<option value="0600">06:00</option>
									<option value="0700">07:00</option>
									<option value="0800">08:00</option>
									<option value="0900">09:00</option>
									<option value="1000">10:00</option>
									<option value="1100">11:00</option>
									<option value="1200">12:00</option>
									<option value="1300">13:00</option>
								</select>
							</div>
						</div>


						<div class="ui-grid-a ui-responsive">

							<div class="ui-block-a">Localitate</div>

							<div class="ui-block-b">

								<form class="ui-filterable">
									<input id="start-loc-inputM" data-type="search"
										placeholder="Cautati o localitate">
								</form>
								<ul id="list-start-locM" data-role="listview" data-inset="true"
									data-filter="true" data-input="#start-loc-inputM">

								</ul>

							</div>

						</div>

					</div>
				</div>

				<br>

				<div class="ui-corner-all custom-corners">

					<div class="ui-bar ui-bar-a">Sosire</div>


					<div class="ui-body ui-body-a">

						<div class="ui-grid-a ui-responsive">

							<div class="ui-block-a">Data</div>

							<div class="ui-block-b">
								<input type="text" id="dateStopM" readonly="readonly"
									style="position: relative; z-index: 100000;" />
							</div>

						</div>

						<div class="ui-grid-a ui-responsive">

							<div class="ui-block-a">Localitate</div>

							<div class="ui-block-b">

								<form class="ui-filterable">
									<input id="stop-loc-inputM" data-type="search"
										placeholder="Cautati o localitate">
								</form>
								<ul id="list-stop-locM" data-role="listview" data-inset="true"
									data-filter="true" data-input="#stop-loc-inputM">

								</ul>

							</div>

						</div>

					</div>

				</div>


				<br>


				<div class="ui-corner-all custom-corners">

					<div class="ui-bar ui-bar-a">Puncte definire traseu</div>

					<div class="ui-body ui-body-a">

						<div class="ui-grid-a ui-responsive">

							<div class="ui-block-a">Localitate</div>

							<div class="ui-block-b">

								<form class="ui-filterable">
									<input id="punct-loc-inputM" data-type="search"
										placeholder="Cautati o localitate">
								</form>
								<ul id="list-punct-locM" data-role="listview" data-inset="true"
									data-filter="true" data-input="#punct-loc-inputM">

								</ul>

							</div>

						</div>


						<div class="ui-grid-a ui-responsive">
							<div class="ui-block-a"></div>
							<div class="ui-block-b">

								<input type="button" class="ui-btn ui-corner-all" data-theme="a"
									onclick="adaugaStop();" value="Adauga"></a>

							</div>
						</div>

						<br>
						<ul data-role="listview" id="stopsListM" data-split-icon="delete"
							data-split-theme="d" class="stopsListM" style="margin: 5px;">

						</ul>


					</div>


				</div>



				<br> <a href="#" class="ui-btn ui-corner-all" id="calcDistM"
					style="background: #7CCD7C; color: white;"
					onclick="calculeazaDistanta();">Calculeaza km normati</a> <br>


				<div class="ui-corner-all custom-corners" id="dateTraseuM">
					<div class="ui-bar ui-bar-a">Rezultat</div>

					<div class="ui-body ui-body-a">

						<div>
							<div class="boxInline" id="labelTraseu1M">Km normati:</div>
							<div id="kmtraseuM" class="boxInline"></div>
							<div id="labelTraseu2M" class="boxInline"></div>
						</div>


						<div data-role="content" id="mapcontentdelegatie">
							<div id="map_canvas_delegatieM" style="height: 400px">

								<script
									src='https://maps.googleapis.com/maps/api/js?key=AIzaSyBhGZckc6WAio9WiiLstQTTpVtAvQ7kIEc'></script>
								<script type="text/javascript"
									src="../scripts/modifica.delegatie.maps.js"></script>
							</div>

						</div>

					</div>
				</div>


				<br> <a href="#" class="ui-btn ui-corner-all"
					id="saveDelegatieM" style="background: #7CCD7C; color: white;"
					onclick="salveazaDelegatieM();">Salveaza</a> <br> <br> <br>



			</div>

			<!-- /content -->
		</div>
	</div>

	<div data-role="dialog" id="dialogModif">
		<div data-role="header">
			<h1>
				<div id="tipAlertM"></div>
			</h1>
		</div>
		<div data-role="content">
			<div id="textAlertM"></div>
		</div>
	</div>


	<div id="codAng" style="visibility: hidden">${sessionScope.user.cod}</div>
	<div id="tipAng" style="visibility: hidden">${sessionScope.user.tipAng}</div>
	<div id="unitLog" style="visibility: hidden">${sessionScope.user.unitLog}</div>
	<div id="listMasini" style="visibility: hidden">${sessionScope.user.listMasini}</div>

	<script type="text/javascript" src="../scripts/modifica.delegatie.js"></script>
</body>
</html>
