package m.delegatii.helpers;

import java.util.List;

import m.delegatii.beans.NavigationDetails;
import m.delegatii.beans.UserInfo;
import m.delegatii.enums.TipAnjagat;

public class HelperMeniu {

	public static void addMenuOption(List<NavigationDetails> navigationLinks, NavigationDetails nd) {

		TipAnjagat tipAngajat = UserInfo.getInstance().getTipAngajat();

		switch (tipAngajat) {
		case AV:
			switch (nd.getNume()) {
			case CREEAZA_DELEGATIE:
			case AFISEAZA_DELEGATIE:
			case EXIT:
				navigationLinks.add(nd);
				break;

			default:
				break;

			}
			break;

		case SD:
			switch (nd.getNume()) {
			case CREEAZA_DELEGATIE:
			case APROBA_DELEGATIE:
			case AFISEAZA_DELEGATIE:
			case EXIT:
				navigationLinks.add(nd);
				break;

			default:
				break;

			}
			break;

		case DV:
			switch (nd.getNume()) {
			case APROBA_DELEGATIE:
			case AFISEAZA_DELEGATIE:
			case EXIT:
				navigationLinks.add(nd);
				break;

			default:
				break;

			}
			break;

		default:
			break;
		}

	}

}
