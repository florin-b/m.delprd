
function hasSubords(tipAngajat) {

	var subords;

	switch (tipAngajat) {

	case 'DADMIN':
	case 'DAG':
	case 'DD':
	case 'DE':
	case 'DEA':
	case 'DENDET':
	case 'DFIN':
	case 'DG':
	case 'DHR':
	case 'DINV':
	case 'DIT':
	case 'DJ':
	case 'DMK':
	case 'DRU':
	case 'DTR':
	case 'DZ':
	case 'DZBUC':
	case 'SSJ':
	case 'DV':
	case 'SD':
	case 'SDCVA':
	case 'SDKA':
		subords = true;
		break;
	default:
		subords = false;

	}

	return subords;

}
