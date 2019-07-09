package m.delegatii.queries;

public class SqlQueries {

	public static String getLocalitatiJudet() {
		StringBuilder sqlString = new StringBuilder();
		sqlString.append("select upper(localitate) localitate from sapprd.zlocalitati where bland=? order by localitate");

		return sqlString.toString();
	}

	public static String adaugaAntetDelegatie() {
		StringBuilder sqlString = new StringBuilder();

		sqlString.append(
				" insert into sapprd.zdelegatiehead(mandt, id, codangajat, datac, orac, data_plecare, ora_plecare, distcalc, distaprob, idaprob, data_sosire) ");
		sqlString.append(" values ('900',?,?,?,?,?,?,?,0,?,?) ");

		return sqlString.toString();
	}

	public static String adaugaOpririDelegatie() {
		StringBuilder sqlString = new StringBuilder();

		sqlString.append(" insert into sapprd.zdelegatieruta(mandt, id, poz, codjudet, localitate) ");
		sqlString.append(" values ('900',?,?,?,?) ");

		return sqlString.toString();
	}

	public static String getDelegatiiAprobareHeader() {
		StringBuilder sqlString = new StringBuilder();

		sqlString.append(" select h.id,  h.codangajat, h.data_plecare, h.ora_plecare, ag.nume, h.distcalc, h.distaprob, h.data_sosire ");
		sqlString.append(" from sapprd.zdelegatiehead h, agenti ag where ");
		sqlString.append(" h.idaprob = (select idaprob from sapprd.zdeltipaprob where tipaprob=?) ");
		sqlString.append(" and ag.filiala =? and h.codangajat = ag.cod ");
		sqlString.append(" and not exists (select 1 from sapprd.zdelstataprob b where b.iddelegatie = h.id and status in ('1','6')) ");
		sqlString.append(" order by h.id ");

		return sqlString.toString();
	}

	public static String afiseazaDelegatii() {
		StringBuilder sqlString = new StringBuilder();

		sqlString.append(" select h.id,  h.codangajat, h.data_plecare, h.ora_plecare, ag.nume, h.distcalc, h.distaprob, h.data_sosire ");
		sqlString.append(" from sapprd.zdelegatiehead h, agenti ag where h.codangajat = ag.cod and ");
		sqlString.append(" h.codangajat = ? ");
		sqlString.append(" order by h.id ");

		return sqlString.toString();
	}

	public static String getDelegatiiAprobareRuta() {
		StringBuilder sqlString = new StringBuilder();
		sqlString.append(" select r.codjudet, r.localitate from sapprd.zdelegatieruta r where r.id = ?  order by r.poz  ");
		return sqlString.toString();
	}

	public static String opereazaDelegatie() {
		StringBuilder sqlString = new StringBuilder();
		sqlString.append(" insert into sapprd.zdelstataprob (mandt, iddelegatie, tipaprob, status, dataaprob, oraaprob) values ('900',?,?,?,?,?) ");
		return sqlString.toString();
	}

	public static String aprobaKm() {
		StringBuilder sqlString = new StringBuilder();

		sqlString.append("update sapprd.zdelegatiehead set distaprob=? where id = ?");
		return sqlString.toString();

	}

	public static String getMasiniAlocate() {
		StringBuilder sqlString = new StringBuilder();

		sqlString.append(" select distinct replace(c.ktext,' ','') ktext,a.adatu ");
		sqlString.append(" from sapprd.anlz a join sapprd.anla b on b.anln1 = a.anln1 and b.anln2 = a.anln2 and b.mandt=a.mandt ");
		sqlString.append(" join sapprd.aufk c on c.aufnr = a.caufn and c.mandt=a.mandt ");
		sqlString.append(" where a.pernr =? ");
		sqlString.append(" and a.bdatu >= (select to_char(sysdate-15,'YYYYMMDD') from dual) and b.deakt = '00000000' and a.mandt='900' and c.auart = '2001' ");
		sqlString.append(" order by a.adatu desc ");

		return sqlString.toString();

	}

	public static String getTipPersNonV() {
		StringBuilder sqlString = new StringBuilder();

		sqlString.append("select f.cod from personal u, functii_non_vanzari f where u.cod =? and f.cod = u.functie");

		return sqlString.toString();
	}

	public static String getFullName() {
		StringBuilder sqlString = new StringBuilder();

		sqlString.append("select nume from personal where cod =? ");

		return sqlString.toString();
	}

	public static String getTipAngajat()

	{
		StringBuilder sqlString = new StringBuilder();

		sqlString.append("select  functie from personal where cod=?");

		return sqlString.toString();
	}

	public static String getDepartAngajat()

	{
		StringBuilder sqlString = new StringBuilder();

		sqlString.append("select departament functie from personal where cod=?");

		return sqlString.toString();
	}

	public static String getUnitLogAngajat() {
		StringBuilder sqlString = new StringBuilder();

		sqlString.append("select filiala from personal  where cod=? ");

		return sqlString.toString();
	}

	public static String getExtraFilialeAngajat() {
		StringBuilder sqlString = new StringBuilder();

		sqlString.append(" select ul from sapprd.zextrafildlg where mandt='900' and codangajat=? ");

		return sqlString.toString();
	}

	public static String userHasSubordonati() {
		StringBuilder sqlString = new StringBuilder();

		sqlString.append(" select 1 from functii_non_vanzari where aprobat =? ");

		return sqlString.toString();
	}

}
