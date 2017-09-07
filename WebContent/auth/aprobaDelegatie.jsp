<!DOCTYPE html>
<html>
<head>
<title>DELEGATII</title>



<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="stylesheet"
	href="https://code.jquery.com/mobile/1.4.5/jquery.mobile-1.4.5.min.css">
<script src="https://code.jquery.com/jquery-1.11.3.min.js"></script>
<script
	src="https://code.jquery.com/mobile/1.4.5/jquery.mobile-1.4.5.min.js"></script>



<style>
#mapcontent {
	padding: 20px;
	position: absolute !important;
	top: 90px !important;
	right: 0;
	bottom: 40px !important;
	left: 0 !important;
}
</style>


</head>
<body>


	<div data-role="page" id="aproba" data-theme="d" data-url="">


		<div data-role="panel" data-display="overlay" data-position="left"
			id="left-panel2" data-theme="a">
			<ul data-role="listview">
				<jsp:include page="navbar.jsp">
					<jsp:param name="tipuser" value="${sessionScope.user.tipAng }" />
				</jsp:include>
			</ul>
		</div>
		<div data-role="header" data-theme="a">
			<h1>Aproba delegatie</h1>
			<a href="#left-panel2" data-theme="d" data-icon="arrow-r"
				data-iconpos="notext" data-shadow="false" data-iconshadow="false"
				class="ui-icon-nodisc">Meniu</a>
		</div>
		<!-- /header -->
		<div data-role="content" id="loadContent11">


			<script type="text/javascript"
				src="../scripts/helpers/helper.aprob.delegatie.js"></script>
			<script type="text/javascript" src="../scripts/aproba.delegatie.js"></script>


			<ol data-role="listview" id="aprobList" style="margin: 5px;">


			</ol>

			<div id="delid" style="visibility: hidden"></div>

		</div>
		<!-- /content -->


	</div>


	<div id="codAng" style="visibility: hidden">${sessionScope.user.cod}</div>
	<div id="tipAng" style="visibility: hidden">${sessionScope.user.tipAng}</div>
	<div id="unitLog" style="visibility: hidden">${sessionScope.user.unitLog}</div>
	<div id="codDepart" style="visibility: hidden">${sessionScope.user.codDepart}</div>

	<div data-role="page" id="custDetails" data-theme="a">

		<a href="#aproba" class="ui-btn ui-corner-all" data-rel="back"
			data-corners="false">Inapoi</a>


		<div data-role="content">

			<div role="main" class="ui-content">
				<table data-role="table" id="legend-table" data-mode="reflow"
					class="ui-responsive table-stroke">
					<thead>
						<tr>

						</tr>
					</thead>
					<tbody>
						<tr>
							<td>Traseu calculat</td>
							<td width="10%"><div style="background-color: #009ACD">&nbsp</div></td>
						</tr>
						<tr>
							<td>Traseu realizat</td>
							<td><div style="background-color: #EE9572">&nbsp</div></td>
						</tr>


					</tbody>
				</table>

			</div>

			<br>
			<div id="map_canvas" style="height: 400px">

				<script
					src='https://maps.googleapis.com/maps/api/js?key=AIzaSyBhGZckc6WAio9WiiLstQTTpVtAvQ7kIEc'></script>

				<script type="text/javascript" src="../scripts/aproba.maps.js"></script>

			</div>

		</div>


	</div>

	<div data-role="dialog" id="dialogAprobare">
		<div data-role="header">
			<h1>
				<div id="tipAlertAp"></div>
			</h1>
		</div>
		<div data-role="content">
			<div id="textAlertAp"></div>
		</div>
	</div>


	<div data-role="dialog" id="aprob" data-title="Confirmare">
		<div data-role="content">
			<h3 class="aprob-1"></h3>
			<p class="aprob-2"></p>
			<a href="#" class="aprob-da" data-role="button" data-theme="b"
				data-rel="back">Da</a> <a href="#" data-role="button" data-theme="c"
				data-rel="back">Renunta</a>
		</div>
	</div>


	<div data-role="dialog" id="resping" data-title="Confirmare">
		<div data-role="content">
			<h3 class="resping-1"></h3>
			<p class="resping-2"></p>
			<a href="#" class="resping-da" data-role="button" data-theme="b"
				data-rel="back">Da</a> <a href="#" data-role="button" data-theme="c"
				data-rel="back">Renunta</a>
		</div>
	</div>




</body>
</html>
