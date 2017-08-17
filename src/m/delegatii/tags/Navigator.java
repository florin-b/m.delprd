package m.delegatii.tags;

import java.io.IOException;
import java.util.ArrayList;

import javax.servlet.jsp.JspException;
import javax.servlet.jsp.PageContext;
import javax.servlet.jsp.tagext.SimpleTagSupport;

import m.delegatii.beans.NavigationDetails;
import m.delegatii.enums.EnumMeniu;
import m.delegatii.helpers.HelperMeniu;

public class Navigator extends SimpleTagSupport {

	private ArrayList<NavigationDetails> navigationLinks;

	private void CreateNavigationLinks() {

		navigationLinks = new ArrayList<>();

		PageContext pageContext = (PageContext) getJspContext();
		String root = pageContext.getServletContext().getContextPath();

		NavigationDetails nd;

		nd = new NavigationDetails();
		nd.setLink(String.format("%s/auth/delegatieNoua.jsp", root));
		nd.setText("Creeaza delegatie");
		nd.setNume(EnumMeniu.CREEAZA_DELEGATIE);
		HelperMeniu.addMenuOption(navigationLinks, nd);

		nd = new NavigationDetails();
		nd.setLink(String.format("%s/auth/modificaDelegatie.jsp", root));
		nd.setText("Modifica delegatie");
		nd.setNume(EnumMeniu.MODIFICA_DELEGATIE);
		HelperMeniu.addMenuOption(navigationLinks, nd);

		nd = new NavigationDetails();
		nd.setLink(String.format("%s/auth/aprobaDelegatie.jsp", root));
		nd.setText("Aproba delegatie");
		nd.setNume(EnumMeniu.APROBA_DELEGATIE);
		HelperMeniu.addMenuOption(navigationLinks, nd);

		nd = new NavigationDetails();
		nd.setLink(String.format("%s/auth/afiseazaDelegatie.jsp", root));
		nd.setText("Afiseaza delegatie");
		nd.setNume(EnumMeniu.AFISEAZA_DELEGATIE);
		HelperMeniu.addMenuOption(navigationLinks, nd);

		nd = new NavigationDetails();
		nd.setLink(String.format("%s/auth/afiseazaTraseu.jsp", root));
		nd.setText("Afiseaza traseu");
		nd.setNume(EnumMeniu.AFISEAZA_TRASEU);
		HelperMeniu.addMenuOption(navigationLinks, nd);

		nd = new NavigationDetails();
		nd.setLink(String.format("%s/exit.jsp", root));
		nd.setText("Iesire");
		nd.setNume(EnumMeniu.EXIT);
		HelperMeniu.addMenuOption(navigationLinks, nd);

	}

	@Override
	public void doTag() throws JspException, IOException {

		CreateNavigationLinks();

		for (NavigationDetails nd : navigationLinks) {
			getJspContext().setAttribute("navdetails", nd);
			getJspBody().invoke(null);
		}
	}

}
