<!DOCTYPE html>
<html>
<head>
<title>DELEGATII</title>



<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="viewport" content="width=device-width, initial-scale=1">


<link rel="stylesheet"
	href="https://code.jquery.com/mobile/1.4.5/jquery.mobile-1.4.5.min.css">
<script src="https://code.jquery.com/jquery-1.11.3.min.js"></script>

<link rel="stylesheet" type="text/css"
	href="../css/markers/OneMarkerStyle.css">
<link rel="stylesheet" type="text/css"
	href="../css/markers/MarkerLabelStyle.css">



<script type="text/javascript" src="../scripts/helpers/helper.adrese.js"></script>

<link rel="stylesheet"
	href="//code.jquery.com/ui/1.12.1/themes/smoothness/jquery-ui.css">
<script src="//code.jquery.com/jquery-1.12.4.js"></script>
<script src="//code.jquery.com/ui/1.12.1/jquery-ui.js"></script>


<script
	src="https://code.jquery.com/mobile/1.4.5/jquery.mobile-1.4.5.min.js"></script>


<script type="text/javascript"
	src="../scripts/helpers/helper.angajat.js"></script>




</head>
<body>


	<div data-role="page" id="traseu" data-theme="d" data-url="">


		<div data-role="panel" data-display="overlay" data-position="left"
			id="left-panel" data-theme="a">
			<ul data-role="listview">
				<jsp:include page="navbar.jsp" />
			</ul>
		</div>
		<div data-role="header" data-theme="a">
			<h1>Afiseaza traseu</h1>
			<a href="#left-panel" data-theme="d" data-icon="arrow-r"
				data-iconpos="notext" data-shadow="false" data-iconshadow="false"
				class="ui-icon-nodisc">Meniu</a>
		</div>
		<!-- /header -->
		<div data-role="content" id="loadContent">


			<div class="ui-corner-all custom-corners">

				<div class="ui-bar ui-bar-a">Criterii</div>

				<div class="ui-body ui-body-a">

					<div class="ui-grid-a ui-responsive">

						<div class="ui-block-a">Inceput interval</div>

						<div class="ui-block-b">
							<input id="dateStart" type="text" readonly="readonly"
								style='position: relative; z-index: 100000;' />
						</div>



					</div>


					<div class="ui-grid-a ui-responsive">

						<div class="ui-block-a">Sfarsit interval</div>

						<div class="ui-block-b">
							<input id="dateStop" type="text" readonly="readonly"
								style='position: relative; z-index: 100000;' />
						</div>

					</div>



					<div class="ui-grid-a ui-responsive" id='divAngajat'>

						<div class="ui-block-a">Angajat</div>

						<div class="ui-block-b">
							<div class="ui-field-contain">
								<select name="select-angajat-traseu" id="select-angajat-traseu">

								</select>

							</div>
						</div>

					</div>


					<div class="ui-grid-a ui-responsive" id='divMasina'>

						<div class="ui-block-a">Masina</div>

						<div class="ui-block-b">
							<div class="ui-field-contain">
								<select name="select-masina-traseu" id="select-masina-traseu">

								</select>

							</div>
						</div>

					</div>



					<div class="ui-grid-a ui-responsive">

						<div class="ui-block-a"></div>

						<div class="ui-block-b">
							<a href="#" class="ui-btn ui-corner-all" onclick="afisTraseu();">Afiseaza</a>
						</div>

					</div>

				</div>

			</div>


<br>


			<div class="ui-corner-all custom-corners" id="divDistanta">

				<div class="ui-bar ui-bar-a">Date traseu</div>


				<div class="ui-body ui-body-a">

					<div class="ui-grid-a ui-responsive">

						<div class="ui-block-a">Distanta parcursa</div>

						<div class="ui-block-b" id="kmDistanta">
							
						</div>

					</div>

					

				</div>

			</div>


			<script type="text/javascript" src="../scripts/afiseaza.traseu.js"></script>


			<br>

			<div data-role="content" id="div_traseu">
				<div id="map_traseu" style="height: 500px">

					<script
						src='https://maps.googleapis.com/maps/api/js?key=AIzaSyBhGZckc6WAio9WiiLstQTTpVtAvQ7kIEc'></script>

					<script type="text/javascript"
						src='../scripts/helpers/markerwithlabel.js'></script>
					<script type="text/javascript" src="../scripts/traseu.maps.js"></script>

				</div>

			</div>



		</div>


	</div>


	<div id="codAng" style="visibility: hidden">${sessionScope.user.cod}</div>
	<div id="tipAng" style="visibility: hidden">${sessionScope.user.tipAng}</div>
	<div id="unitLog" style="visibility: hidden">${sessionScope.user.unitLog}</div>
	<div id="codDepart" style="visibility: hidden">${sessionScope.user.codDepart}</div>



</body>
</html>
