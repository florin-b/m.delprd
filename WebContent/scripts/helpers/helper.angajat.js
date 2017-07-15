function hasSubords(tipAngajat) {

	var subords = false;

	if (tipAngajat == 'SD' || tipAngajat == 'DV' || tipAngajat == 'DD'
			|| tipAngajat == 'DAG')
		subords = true;

	return subords;

}