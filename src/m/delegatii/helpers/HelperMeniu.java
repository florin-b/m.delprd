package m.delegatii.helpers;

import java.util.List;

import m.delegatii.beans.NavigationDetails;

public class HelperMeniu {

	public static void addMenuOption(List<NavigationDetails> navigationLinks, NavigationDetails nd, String tipUser) {

		switch (tipUser) {

		case "SD":
		case "DZ":
		case "DAG":
		case "DV":
		case "DADMIN":
		case "DD":
		case "DE":
		case "DEA":
		case "DENDET":
		case "DFIN":
		case "DG":
		case "DHR":
		case "DINV":
		case "DIT":
		case "DJ":
		case "DMK":
		case "DRU":
		case "DTR":
		case "DZBUC":
		case "SSJ":
		case "SDKA":
		case "SDCVA":
		case "SM":
		case "SMR":
		case "SMW":
		case "SMG":
		case "SSLO":
		case "SDIP":

			switch (nd.getNume()) {
			case CREEAZA_DELEGATIE:
			case MODIFICA_DELEGATIE:
			case APROBA_DELEGATIE:
			case AFISEAZA_DELEGATIE:
			case AFISEAZA_TRASEU:
			case AFISEAZA_POZITIE:
			case STARE_GPS:
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
			case AFISEAZA_TRASEU:
			case STARE_GPS:
			case EXIT:
				navigationLinks.add(nd);
				break;

			default:
				break;

			}

		}
	}
}
