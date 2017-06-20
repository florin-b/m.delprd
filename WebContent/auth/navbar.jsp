

<%@ taglib prefix="menuoptions" uri="/WEB-INF/tlds/navigator.tld"%>

<ul data-role="listview">

	<li data-icon="delete"><a href="#" data-rel="close">Inchide meniu</a></li>

	<menuoptions:navigator>
		<li><a href="${navdetails.link}" data-ajax="false">${navdetails.text}</a></li>
	</menuoptions:navigator>
</ul>




