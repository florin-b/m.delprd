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
	<div data-role="page" id="init" data-url="">
		<div data-role="header" data-theme="a">
			<h1>DELEGATII</h1>
		</div>

		<div data-role="content" class="ui-content">
			<form method="post"
				action="<%=response.encodeURL("Controller?action=dologin")%>">
				<h3>Autentificare</h3>
				<label for="txt-user">Utilizator</label> <input type="text"
					name="txt_user" value="CPITA"> <label for="txt-password">Parola</label>
				<input type="password" name="txt_password" value="tG6q1x"> <input
					type="submit" value="Login" data-rel="popup" id="btn-submit"
					data-transition="pop" data-position-to="window"
					class="ui-btn ui-btn-b ui-corner-all mc-top-margin-1-5"></input>
			</form>

		</div>

	</div>





</body>
</html>