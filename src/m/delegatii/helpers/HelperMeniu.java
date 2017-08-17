package m.delegatii.helpers;

import java.util.List;

import m.delegatii.beans.NavigationDetails;
import m.delegatii.beans.UserInfo;
import m.delegatii.enums.TipAnjagat;

public class HelperMeniu {

	public static void addMenuOption(List<NavigationDetails> navigationLinks, NavigationDetails nd) {

		// tratare situatie expirare sesiune
		TipAnjagat tipAngajat = UserInfo.getInstance().getTipAngajat();

		switch (tipAngajat) {

		case SD:
		case DZ:
		case DAG:
		case DV:
		case DADMIN:
		case DD:
		case DE:
		case DEA:
		case DENDET:
		case DFIN:
		case DG:
		case DHR:
		case DINV:
		case DIT:
		case DJ:
		case DMK:
		case DRU:
		case DTR:
		case DZBUC:
		case SSJ:

			switch (nd.getNume()) {
			case CREEAZA_DELEGATIE:
			case MODIFICA_DELEGATIE:
			case APROBA_DELEGATIE:
			case AFISEAZA_DELEGATIE:
			case AFISEAZA_TRASEU:
			case EXIT:
				navigationLinks.add(nd);
				break;

			default:
				break;

			}
			break;

		default:
			switch (nd.getNume()) {
			case CREEAZA_DELEGATIE:
			case MODIFICA_DELEGATIE:
			case AFISEAZA_DELEGATIE:
			case EXIT:
				navigationLinks.add(nd);
				break;

			default:
				break;

			}

		}
	}
}
