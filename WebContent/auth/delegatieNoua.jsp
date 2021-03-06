<!DOCTYPE html>
<html>
<head>
<title>DELEGATII</title>

<meta name="viewport" content="width=device-width, initial-scale=1">




<link rel="stylesheet"
	href="https://code.jquery.com/mobile/1.4.5/jquery.mobile-1.4.5.min.css">
<script src="https://code.jquery.com/jquery-1.11.3.min.js"></script>



<script type="text/javascript" src="../scripts/helpers/helper.adrese.js"></script>

<link rel="stylesheet"
	href="//code.jquery.com/ui/1.12.1/themes/smoothness/jquery-ui.css">
<script src="//code.jquery.com/jquery-1.12.4.js"></script>
<script src="//code.jquery.com/ui/1.12.1/jquery-ui.js"></script>

<style>
#sortable {
	list-style-type: none;
	margin: 0;
	padding: 0;
	width: 60%;
}

#sortable li {
	margin: 0 3px 3px 3px;
	padding: 0.4em;
	padding-left: 1.5em;
	font-size: 1.4em;
	height: 18px;
}

#sortable li span {
	position: absolute;
	margin-left: -1.3em;
}
</style>


<script
	src="https://code.jquery.com/mobile/1.4.5/jquery.mobile-1.4.5.min.js"></script>


<script type="text/javascript" src="../scripts/delegatie.noua.auto.js"></script>


<style>
#mapcontent {
	padding: 0px;
	position: absolute !important;
	top: 90px !important;
	right: 0;
	bottom: 40px !important;
	left: 0 !important;
}
</style>


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
	<div data-role="page" id="new-page" data-theme="d" data-url="">
		<div data-role="header" data-theme="a">
			<h1>Delegatie noua</h1>
			<a href="#left-panel" data-theme="a" data-icon="arrow-r"
				data-iconpos="notext" data-shadow="false" data-iconshadow="false"
				class="ui-icon-nodisc">Meniu</a>
		</div>
		<!-- /header -->
		<div data-role="content">


			<form>
				<fieldset data-role="controlgroup" data-theme="a" id="field_tip_del"
					data-type="horizontal">
					<legend></legend>
					<input type="radio" name="radio-tip-delegatie" id="radio-dnoua"
						value="dnoua" checked="checked"> <label for="radio-dnoua">Delegatia
						urmeaza sa inceapa</label> <input type="radio" name="radio-tip-delegatie"
						id="radio-defectuata" value="defectuata"> <label
						for="radio-defectuata">Delegatia s-a incheiat</label>

				</fieldset>
			</form>

			<br>

			<div class="ui-corner-all custom-corners" id="div_nrauto">

				<div class="ui-bar ui-bar-a">Nr. auto</div>

				<div class="ui-body ui-body-a">

					<div class="ui-grid-a ui-responsive">

						<div class="ui-block-a">Curent</div>

						<div class="ui-block-b">
							<input type="text" name="nrAuto" class="ui-corner-all"
								id="nrAuto" readonly="readonly" />
						</div>



					</div>


					<div class="ui-grid-a ui-responsive">

						<div class="ui-block-a"></div>

						<div class="ui-block-b">
							<input type="button" name="schimbaAuto" id="schimbaAuto"
								class="ui-btn ui-corner-all" data-theme="a" value="Schimba" />
						</div>
					</div>



					<div class="ui-grid-a ui-responsive" id="alegeAutoDiv"
						style="display: none;">

						<div class="ui-block-a">Selecteaza nr. auto</div>

						<div class="ui-block-b">
							<div class="ui-field-contain">
								<select name="select-auto" id="select-auto">

								</select>

							</div>
						</div>



					</div>


					<div class="ui-grid-a ui-responsive" id="salveazaAutoDiv"
						style="display: none;">

						<div class="ui-block-a"></div>

						<div class="ui-block-b">
							<input type="button" name="salveazaAuto" id="salveazaAuto"
								class="ui-btn ui-corner-all" data-theme="a" value="Salveaza" />
						</div>
					</div>

				</div>
			</div>







			<div class="ui-corner-all custom-corners" id="div_intervaldelgen">


				<div class="ui-bar ui-bar-a">Interval delegatie</div>


				<div class="ui-body ui-body-a">

					<div class="ui-grid-a ui-responsive">

						<div class="ui-block-a">Plecare</div>

						<div class="ui-block-b">
							<input id="dateStartEfect" type="text" readonly="readonly"
								style="position: relative; z-index: 100000;" />

						</div>


						<div class="ui-block-a">Intoarcere</div>

						<div class="ui-block-b">
							<input id="dateStopEfect" type="text" readonly="readonly"
								style="position: relative; z-index: 100000;" />

						</div>

					</div>


				</div>
			</div>


			<div id="div_genereaza">

				<br> <a href="#" class="ui-btn ui-corner-all" id="calcDist"
					style="background: #7CCD7C; color: white;"
					onclick="genereazaDelegatie();">Genereaza delegatie</a> <br>

			</div>

			<div id="del_generata"></div>

			<br> <a href="#" class="ui-btn ui-corner-all"
				id="saveDelegatieGenerata"
				style="background: #7CCD7C; color: white;"
				onclick="salveazaDelegatieGenerata();">Salveaza</a>


			<div class="ui-corner-all custom-corners" id="div_dateplecare">


				<div class="ui-bar ui-bar-a">Plecare in delegatie</div>


				<div class="ui-body ui-body-a">

					<div class="ui-grid-a ui-responsive">

						<div class="ui-block-a">Data</div>

						<div class="ui-block-b">
							<input id="dateStart" type="text" readonly="readonly"
								style="position: relative; z-index: 100000;" />

						</div>

					</div>


					<div class="ui-grid-a ui-responsive">
						<div class="ui-block-a">Ora</div>
						<div class="ui-block-b">
							<select name="select-ora" id="select-ora">
								<option value="0500">05:00</option>
								<option value="0600">06:00</option>
								<option value="0700">07:00</option>
								<option value="0800">08:00</option>
								<option value="0900">09:00</option>
								<option value="1000">10:00</option>
								<option value="1100">11:00</option>
								<option value="1200">12:00</option>
								<option value="1300">13:00</option>
								<option value="1400">14:00</option>
								<option value="1500">15:00</option>
								<option value="1600">16:00</option>
								<option value="1700">17:00</option>
								<option value="1800">18:00</option>
								<option value="1900">19:00</option>
								<option value="2000">20:00</option>
								<option value="2100">21:00</option>
								<option value="2200">22:00</option>
								<option value="2300">23:00</option>
								<option value="2400">24:00</option>
							</select>
						</div>
					</div>




					<div class="ui-grid-a ui-responsive">

						<div class="ui-block-a">Localitate</div>

						<div class="ui-block-b">

							<form class="ui-filterable">
								<input id="start-loc-input" data-type="search"
									placeholder="Cautati o localitate">
							</form>
							<ul id="list-start-loc" data-role="listview" data-inset="true"
								data-filter="true" data-input="#start-loc-input">

							</ul>

						</div>

					</div>

				</div>
			</div>

			<br> <br>

			<div class="ui-corner-all custom-corners" id="div_datesosire">

				<div class="ui-bar ui-bar-a">Intoarcere din delegatie</div>


				<div class="ui-body ui-body-a">

					<div class="ui-grid-a ui-responsive">

						<div class="ui-block-a">Data</div>

						<div class="ui-block-b">
							<input type="text" id="dateStop" readonly="readonly"
								style="position: relative; z-index: 100000;" />
						</div>

					</div>

					<div class="ui-grid-a ui-responsive">

						<div class="ui-block-a">Localitate</div>

						<div class="ui-block-b">

							<form class="ui-filterable">
								<input id="stop-loc-input" data-type="search"
									placeholder="Cautati o localitate">
							</form>
							<ul id="list-stop-loc" data-role="listview" data-inset="true"
								data-filter="true" data-input="#stop-loc-input">

							</ul>

						</div>

					</div>

				</div>

			</div>




			<br> <br>


			<div class="ui-corner-all custom-corners" id="div_localitati">

				<div class="ui-bar ui-bar-a">Puncte definire traseu</div>

				<div class="ui-body ui-body-a">

					<div class="ui-grid-a ui-responsive">

						<div class="ui-block-a">Localitate</div>

						<div class="ui-block-b">

							<form class="ui-filterable">
								<input id="punct-loc-input" data-type="search"
									placeholder="Cautati o localitate">
							</form>
							<ul id="list-punct-loc" data-role="listview" data-inset="true"
								data-filter="true" data-input="#punct-loc-input">

							</ul>

						</div>

					</div>


					<div class="ui-grid-a ui-responsive">
						<div class="ui-block-a"></div>
						<div class="ui-block-b">

							<input type="button" class="ui-btn ui-corner-all" data-theme="a"
								onclick="adaugaStop();" value="Adauga">

						</div>
					</div>

					<br>
					<ul data-role="listview" id="stopsList" data-split-icon="delete"
						data-split-theme="d" class="stopsList" style="margin: 5px;">

					</ul>


				</div>


			</div>



			<br>

			<div id="div_calculeaza">
				<a href="#" class="ui-btn ui-corner-all" id="calcDist"
					style="background: #7CCD7C; color: white;"
					onclick="calculeazaDistanta();">Calculeaza km normati</a> <br>

			</div>





			<div class="ui-corner-all custom-corners" id="dateTraseu">
				<div class="ui-bar ui-bar-a">Rezultat</div>

				<div class="ui-body ui-body-a">

					<div>
						<div class="boxInline" id="labelTraseu1">Km normati:</div>
						<div id="kmtraseu" class="boxInline"></div>
						<div id="labelTraseu2" class="boxInline"></div>
					</div>


					<div data-role="content" id="mapcontentdelegatie">
						<div id="map_canvas_delegatie" style="height: 400px">



							<script>
								loadjsfile();
							</script>

							<script type="text/javascript"
								src="../scripts/delegatie.noua.maps.js"></script>


						</div>

					</div>

				</div>

			</div>

			<br> <a href="#" class="ui-btn ui-corner-all" id="saveDelegatie"
				style="background: #7CCD7C; color: white;"
				onclick="salveazaDelegatie();">Salveaza</a> <br> <br> <br>



		</div>
		<!-- /content -->
		<div data-role="panel" data-display="overlay" id="left-panel"
			data-theme="a">
			<ul data-role="listview">
				<jsp:include page="navbar.jsp">
					<jsp:param name="tipuser" value="${sessionScope.user.tipAng }" />
					<jsp:param name="numeuser" value="${sessionScope.user.numeAng }" />
				</jsp:include>
			</ul>
		</div>

	</div>



	<div data-role="dialog" id="dialogCreare">
		<div data-role="header">
			<h1>
				<div id="tipAlertC"></div>
			</h1>
		</div>
		<div data-role="content">
			<div id="textAlertC"></div>
		</div>
	</div>

	<script type="text/javascript"
		src="../scripts/helpers/helper.degatie.noua.js"></script>
	<script type="text/javascript" src="../scripts/delegatie.noua.js"></script>

	<div id="codAng" style="visibility: hidden">${sessionScope.user.cod}</div>
	<div id="tipAng" style="visibility: hidden">${sessionScope.user.tipAng}</div>
	<div id="unitLog" style="visibility: hidden">${sessionScope.user.unitLog}</div>
	<div id="listMasini" style="visibility: hidden">${sessionScope.user.listMasini}</div>
</body>
</html>
