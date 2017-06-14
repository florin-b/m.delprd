package m.delegatii.model;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.LinkedHashSet;
import java.util.List;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import m.delegatii.beans.BeanDelegatieAprobare;
import m.delegatii.beans.UserInfo;
import m.delegatii.database.DBManager;
import m.delegatii.enums.EnumJudete;
import m.delegatii.enums.EnumTipAprob;
import m.delegatii.queries.SqlQueries;
import m.delegatii.utils.DateUtils;
import m.delegatii.utils.Utils;

public class OperatiiDelegatii {

	private static final Logger logger = LogManager.getLogger(OperatiiDelegatii.class);

	public boolean adaugaDelegatie(String datePlecare, String oraPlecare, String distanta, String opriri, String dataSosire) {

		boolean success = true;

		try (Connection conn = DBManager.getTestInstance().getConnection();
				PreparedStatement stmt = conn.prepareStatement(SqlQueries.adaugaAntetDelegatie(), ResultSet.TYPE_SCROLL_INSENSITIVE, ResultSet.CONCUR_READ_ONLY);) {

			String idDelegatieNoua = Utils.getId();

			stmt.setString(1, idDelegatieNoua);
			stmt.setString(2, UserInfo.getInstance().getCod());
			stmt.setString(3, DateUtils.getCurrentDate());
			stmt.setString(4, DateUtils.getCurrentTime());
			stmt.setString(5, datePlecare);
			stmt.setString(6, oraPlecare);
			stmt.setDouble(7, Double.valueOf(distanta));
			stmt.setString(8, String.valueOf(EnumTipAprob.getCodAprob(UserInfo.getInstance().getTipAngajat())));
			stmt.setString(9, dataSosire);

			stmt.executeQuery();

			String[] arrayOpriri = opriri.split(",");

			PreparedStatement stmt1 = null;

			for (int i = 0; i < arrayOpriri.length; i++) {
				stmt1 = conn.prepareStatement(SqlQueries.adaugaOpririDelegatie(), ResultSet.TYPE_SCROLL_INSENSITIVE, ResultSet.CONCUR_READ_ONLY);

				String[] arrayAdresa = arrayOpriri[i].split("/");
				stmt1.setString(1, idDelegatieNoua);
				stmt1.setString(2, String.valueOf(i + 1));
				stmt1.setString(3, arrayAdresa[0].trim());
				stmt1.setString(4, arrayAdresa[2].trim());

				stmt1.executeQuery();

			}

			if (stmt1 != null)
				stmt1.close();

		} catch (SQLException e) {
			logger.error(Utils.getStackTrace(e));
			success = false;

		}

		return success;

	}

	public List<BeanDelegatieAprobare> getDelegatiiAprobari() {

		List<BeanDelegatieAprobare> listDelegatii = new ArrayList<>();

		try (Connection conn = DBManager.getTestInstance().getConnection();
				PreparedStatement stmt = conn.prepareStatement(SqlQueries.getDelegatiiAprobareHeader(), ResultSet.TYPE_SCROLL_INSENSITIVE, ResultSet.CONCUR_READ_ONLY);) {

			stmt.setString(1, UserInfo.getInstance().getTipAngajat().toString());
			stmt.setString(2, UserInfo.getInstance().getUnitLog());
			stmt.executeQuery();

			ResultSet rs = stmt.getResultSet();

			while (rs.next()) {
				BeanDelegatieAprobare delegatie = new BeanDelegatieAprobare();
				delegatie.setId(rs.getString("id"));
				delegatie.setDataPlecare(DateUtils.formatDate(rs.getString("data_plecare")));
				delegatie.setDataSosire(DateUtils.formatDate(rs.getString("data_sosire")));
				delegatie.setOraPlecare(DateUtils.formatTime(rs.getString("ora_plecare")));
				delegatie.setNumeAngajat(rs.getString("nume"));
				delegatie.setListOpriri(getOpriri(conn, delegatie.getId()));
				delegatie.setDistantaCalculata(rs.getDouble("distcalc"));
				delegatie.setDistantaAprobata(rs.getDouble("distaprob"));
				listDelegatii.add(delegatie);
			}

		} catch (SQLException e) {
			logger.error(Utils.getStackTrace(e));
		}

		return listDelegatii;

	}
	
	
	
	public List<BeanDelegatieAprobare> afiseazaDelegatii() {

		List<BeanDelegatieAprobare> listDelegatii = new ArrayList<>();

		try (Connection conn = DBManager.getTestInstance().getConnection();
				PreparedStatement stmt = conn.prepareStatement(SqlQueries.afiseazaDelegatii(), ResultSet.TYPE_SCROLL_INSENSITIVE, ResultSet.CONCUR_READ_ONLY);) {

			stmt.setString(1, UserInfo.getInstance().getCod());
			stmt.executeQuery();

			ResultSet rs = stmt.getResultSet();

			while (rs.next()) {
				BeanDelegatieAprobare delegatie = new BeanDelegatieAprobare();
				delegatie.setId(rs.getString("id"));
				delegatie.setDataPlecare(DateUtils.formatDate(rs.getString("data_plecare")));
				delegatie.setDataSosire(DateUtils.formatDate(rs.getString("data_sosire")));
				delegatie.setOraPlecare(DateUtils.formatTime(rs.getString("ora_plecare")));
				delegatie.setNumeAngajat(rs.getString("nume"));
				delegatie.setListOpriri(getOpriri(conn, delegatie.getId()));
				delegatie.setDistantaCalculata(rs.getDouble("distcalc"));
				delegatie.setDistantaAprobata(rs.getDouble("distaprob"));
				listDelegatii.add(delegatie);
			}

		} catch (SQLException e) {
			logger.error(Utils.getStackTrace(e));
		}

		return listDelegatii;

	}	
	
	

	private LinkedHashSet<String> getOpriri(Connection conn, String idDelegatie) {
		LinkedHashSet<String> listLocalitati = new LinkedHashSet<>();

		try {
			PreparedStatement stmt = conn.prepareStatement(SqlQueries.getDelegatiiAprobareRuta(), ResultSet.TYPE_SCROLL_INSENSITIVE, ResultSet.CONCUR_READ_ONLY);

			stmt.setString(1, idDelegatie);

			stmt.executeQuery();

			ResultSet rs = stmt.getResultSet();

			while (rs.next()) {
				listLocalitati.add(EnumJudete.getNumeJudet(Integer.valueOf(rs.getString("codjudet"))) + " / " + rs.getString("localitate"));
			}

			rs.close();
			stmt.close();

		} catch (SQLException e) {
			logger.error(Utils.getStackTrace(e));
		}

		return listLocalitati;
	}

	public void aprobaDelegatie(String idDelegatie, double kmAprobati) {
		try (Connection conn = DBManager.getTestInstance().getConnection();
				PreparedStatement stmt = conn.prepareStatement(SqlQueries.opereazaDelegatie(), ResultSet.TYPE_SCROLL_INSENSITIVE, ResultSet.CONCUR_READ_ONLY);) {

			stmt.setString(1, idDelegatie);
			stmt.setString(2, UserInfo.getInstance().getTipAngajat().toString());
			stmt.setString(3, "1");

			stmt.setString(4, DateUtils.getCurrentDate());
			stmt.setString(5, DateUtils.getCurrentTime());

			stmt.executeQuery();

			PreparedStatement stmt1 = conn.prepareStatement(SqlQueries.aprobaKm(), ResultSet.TYPE_SCROLL_INSENSITIVE, ResultSet.CONCUR_READ_ONLY);
			stmt1.setDouble(1, kmAprobati);
			stmt1.setString(2, idDelegatie);

			stmt1.executeQuery();

			stmt1.close();

		} catch (Exception ex) {
			logger.error(Utils.getStackTrace(ex));
			System.out.println(ex.toString());
		}

	}

	public void respingeDelegatie(String idDelegatie) {

		try (Connection conn = DBManager.getTestInstance().getConnection();
				PreparedStatement stmt = conn.prepareStatement(SqlQueries.opereazaDelegatie(), ResultSet.TYPE_SCROLL_INSENSITIVE, ResultSet.CONCUR_READ_ONLY);) {

			stmt.setString(1, idDelegatie);
			stmt.setString(2, UserInfo.getInstance().getTipAngajat().toString());
			stmt.setString(3, "6");

			stmt.setString(4, DateUtils.getCurrentDate());
			stmt.setString(5, DateUtils.getCurrentTime());

			stmt.executeQuery();

		} catch (Exception ex) {
			logger.error(Utils.getStackTrace(ex));
			System.out.println(ex.toString());
		}

	}

}
