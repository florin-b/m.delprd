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

</head>
<body>


	<div data-role="page" id="afiseaza" data-theme="d" data-url="">


		<div data-role="panel" data-display="push" data-position="left"
			id="left-panel" data-theme="a">
			<ul data-role="listview">
				<jsp:include page="navbar.jsp" />
			</ul>
		</div>
		<div data-role="header" data-theme="a">
			<h1>Afiseaza delegatie</h1>
			<a href="#left-panel" data-theme="d" data-icon="arrow-r"
				data-iconpos="notext" data-shadow="false" data-iconshadow="false"
				class="ui-icon-nodisc">Meniu</a>
		</div>
		<!-- /header -->
		<div data-role="content" id="loadContent">


			<table style="width: 100%;" cellpadding="6" data-role="table"
				data-mode="columntoggle:none" class="ui-responsive table-stroke">


				<tr>
					<td colspan="2"><b>Interval cautare</b></td>
				</tr>

				<tr>
					<td width="30%">Start</td>
					<td><input type="date" name="date" id="dateStart" value="" />
					</td>
				</tr>

				<tr>
					<td width="30%">Stop</td>
					<td><input type="date" name="date" id="dateStop" value="" />
					</td>
				</tr>


				<tr>
					<td colspan=2><a href="#" class="ui-btn ui-corner-all"
						style="background: #7CCD7C; color: white;"
						onclick="afisDelegatii();">Cauta</a></td>
			</table>



			<script type="text/javascript"
				src="../scripts/helpers/helper.aprob.delegatie.js"></script>
			<script type="text/javascript" src="../scripts/afiseaza.delegatie.js"></script>


			<ol data-role="listview" id="delegatiiList" style="margin: 5px;">

			</ol>


		</div>
		<!-- /content -->



	</div>


	<div id="codAng" style="visibility: hidden">${sessionScope.user.cod}</div>
	<div id="tipAng" style="visibility: hidden">${sessionScope.user.tipAng}</div>
	<div id="unitLog" style="visibility: hidden">${sessionScope.user.unitLog}</div>



</body>
</html>
