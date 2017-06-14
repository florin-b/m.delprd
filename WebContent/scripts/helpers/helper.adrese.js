function getCodJudet(numeJudet) {

	var codJudet = '01';

	if (numeJudet == 'AG10')
		codJudet = '03';

	if (numeJudet == 'BC10')
		codJudet = '04';

	if (numeJudet == 'BH10')
		codJudet = '05';

	if (numeJudet == 'BU10')
		codJudet = '40';

	if (numeJudet == 'BV10')
		codJudet = '08';

	if (numeJudet == 'BZ10')
		codJudet = '10';

	if (numeJudet == 'CJ10')
		codJudet = '12';

	if (numeJudet == 'CT10')
		codJudet = '13';

	if (numeJudet == 'DJ10')
		codJudet = '16';

	if (numeJudet == 'GL10')
		codJudet = '17';

	return codJudet;

}

function getDefaultLoc(codJudet) {
	var numeLoc = '';

	if (codJudet == '04')
		numeLoc = 'BACAU';

	if (codJudet == '09')
		numeLoc = 'BRAILA';

	if (codJudet == '10')
		numeLoc = 'BUZAU';

	if (codJudet == '13')
		numeLoc = 'CONSTANTA';

	if (codJudet == '17')
		numeLoc = 'GALATI';

	if (codJudet == '22')
		numeLoc = 'IASI';

	if (codJudet == '27')
		numeLoc = 'PIATRA NEAMT';

	if (codJudet == '40')
		numeLoc = 'BUCURESTI';

	if (codJudet == '29')
		numeLoc = 'PLOIESTI';

	return numeLoc;

}
