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
	src="../scripts/helpers/helper.angajat.js"></script>

</head>
<body>


	<div data-role="page" id="afiseaza" data-theme="d" data-url="">


		<div data-role="panel" data-display="overlay" data-position="left"
			id="left-panel" data-theme="a">
			<ul data-role="listview">
				<jsp:include page="navbar.jsp">
					<jsp:param name="tipuser" value="${sessionScope.user.tipAng }" />
					<jsp:param name="numeuser" value="${sessionScope.user.numeAng }" />
				</jsp:include>
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


			<div class="ui-corner-all custom-corners">

				<div class="ui-bar ui-bar-a">Interval cautare</div>

				<div class="ui-body ui-body-a">

					<div class="ui-grid-a ui-responsive">

						<div class="ui-block-a">Start</div>

						<div class="ui-block-b">
							<input id="dateStart" type="text" readonly="readonly"
								style="position: relative; z-index: 100000;" />
						</div>



					</div>


					<div class="ui-grid-a ui-responsive">

						<div class="ui-block-a">Stop</div>

						<div class="ui-block-b">
							<input id="dateStop" type="text" readonly="readonly"
								style="position: relative; z-index: 100000;" />
						</div>

					</div>



					<div class="ui-grid-a ui-responsive" id='divTipDelegatie'>

						<div class="ui-block-a"></div>

						<div class="ui-block-b">
							<fieldset data-role="controlgroup" data-type="vertical">

								<input type="radio" name="radio-del" id="radio-proprii"
									value="P" checked="checked"> <label for="radio-proprii">Delegatii
									proprii</label> <input type="radio" name="radio-del" id="radio-subord"
									value="S"> <label for="radio-subord">Delegatii
									subordonati</label>
							</fieldset>
						</div>

					</div>


					<div class="ui-grid-a ui-responsive">

						<div class="ui-block-a"></div>

						<div class="ui-block-b">
							<a href="#" class="ui-btn ui-corner-all"
								onclick="afisDelegatii();">Cauta</a>
						</div>

					</div>


				</div>

			</div>



			<script type="text/javascript"
				src="../scripts/helpers/helper.aprob.delegatie.js"></script>
			<script type="text/javascript" src="../scripts/afiseaza.delegatie.js"></script>


			<br>

			<ul data-role="listview" id="delegatiiList">

			</ul>


		</div>


	</div>


	<div id="codAng" style="visibility: hidden">${sessionScope.user.cod}</div>
	<div id="tipAng" style="visibility: hidden">${sessionScope.user.tipAng}</div>
	<div id="unitLog" style="visibility: hidden">${sessionScope.user.unitLog}</div>
	<div id="codDepart" style="visibility: hidden">${sessionScope.user.codDepart}</div>



</body>
</html>
