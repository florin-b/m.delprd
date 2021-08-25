package m.delegatii.database;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import m.delegatii.beans.User;
import m.delegatii.beans.UserInfo;
import m.delegatii.enums.EnumTipAprob;
import m.delegatii.enums.TipAnjagat;
import m.delegatii.model.OperatiiAngajat;
import m.delegatii.model.OperatiiMasini;
import m.delegatii.queries.SqlQueries;
import m.delegatii.utils.Utils;

public class Account {

	private Connection conn;
	private String errMessage;

	private static final Logger logger = LogManager.getLogger(Account.class);

	public Account(Connection conn) {
		this.conn = conn;
	}

	public Account() {

	}

	public boolean loginUser(User user) throws SQLException {

		String storedProcedure = "{ call web_pkg.wlogin(?,?,?,?,?,?,?,?,?,?) }";

		CallableStatement callableStatement = null;

		try {
			callableStatement = conn.prepareCall(storedProcedure);
			callableStatement.setString(1, user.getName());
			callableStatement.setString(2, user.getPassword());

			callableStatement.registerOutParameter(3, java.sql.Types.NUMERIC);
			callableStatement.registerOutParameter(4, java.sql.Types.VARCHAR);
			callableStatement.registerOutParameter(5, java.sql.Types.VARCHAR);
			callableStatement.registerOutParameter(6, java.sql.Types.NUMERIC);
			callableStatement.registerOutParameter(7, java.sql.Types.VARCHAR);
			callableStatement.registerOutParameter(8, java.sql.Types.NUMERIC);
			callableStatement.registerOutParameter(9, java.sql.Types.VARCHAR);
			callableStatement.registerOutParameter(10, java.sql.Types.NUMERIC);

			callableStatement.setString(7, user.getIpAddr());
			
			callableStatement.execute();

			if (callableStatement.getInt(3) == 3) {
				user.setFiliala(callableStatement.getString(5));
				user.setUserName(callableStatement.getString(9));

				UserInfo.getInstance().clearData();

				UserInfo.getInstance().setFiliala(user.getFiliala());
				UserInfo.getInstance().setNume(user.getName());
				UserInfo.getInstance().setTipAcces(callableStatement.getString(6));

				String codAgent = callableStatement.getString(8);

				for (int i = 0; i < 8 - callableStatement.getString(8).length(); i++) {
					codAgent = "0" + codAgent;
				}

				UserInfo.getInstance().setNumeAngajat(getNumeAngajat(conn, codAgent));
				UserInfo.getInstance().setCod(codAgent);

				String tipPersNonV = getTipPersNonV(conn, codAgent);
				

				if (tipPersNonV != null) {
					UserInfo.getInstance().setTipAngajat(tipPersNonV);
				} else {
					UserInfo.getInstance().setTipAngajat(callableStatement.getString(6));
				}

				String numeDepart = callableStatement.getString(4);
				
				System.out.println("NumeDepart: " + numeDepart);

				String codDepart = Utils.getDepart(numeDepart);

				if (numeDepart.equalsIgnoreCase("TOAT"))
					codDepart = new OperatiiAngajat().getDepartAngajat(codAgent);
				
				UserInfo.getInstance().setUnitLog(getUnitLogAngajat(conn, UserInfo.getInstance().getCod()));

				UserInfo.getInstance().setCodDepart(codDepart);
				UserInfo.getInstance().setHasSubordonati(userHasSubordonati(conn, UserInfo.getInstance().getTipAngajat()));

				List<String> listMasini = new OperatiiMasini().getMasiniAlocate(UserInfo.getInstance().getCod());

				UserInfo.getInstance().setListMasini(listMasini.toString());
				
				System.out.println("UserInfo: " + UserInfo.getInstance());

				return true;
			} else {
				setErrMessage(callableStatement.getInt(3));
				System.out.println("ERR:" + callableStatement.getInt(3));
				return false;
			}

		} catch (SQLException e) {
			logger.error(Utils.getStackTrace(e));
			setErrMessage(-1);
			return false;

		} finally {
			if (callableStatement != null)
				callableStatement.close();
		}

	}

	private static String getTipPersNonV(Connection conn, String angajatId) {

		String tipPers = null;

		try (PreparedStatement stmt = conn.prepareStatement(SqlQueries.getTipPersNonV(), ResultSet.TYPE_SCROLL_INSENSITIVE, ResultSet.CONCUR_READ_ONLY);) {

			stmt.setString(1, angajatId);

			stmt.executeQuery();

			ResultSet rs = stmt.getResultSet();

			while (rs.next()) {

				tipPers = rs.getString("cod");
			}

		} catch (Exception ex) {
			logger.error(Utils.getStackTrace(ex));
		}

		return tipPers;
	}

	private static String getNumeAngajat(Connection conn, String angajatId) {

		String fullName = null;

		try (PreparedStatement stmt = conn.prepareStatement(SqlQueries.getFullName())) {

			stmt.setString(1, angajatId);

			stmt.executeQuery();

			ResultSet rs = stmt.getResultSet();

			while (rs.next()) {

				fullName = rs.getString("nume");
			}

		} catch (Exception ex) {
			logger.error(Utils.getStackTrace(ex));
		}

		return fullName;
	}

	private static String getUnitLogAngajat(Connection conn, String angajatId) {

		String unitLog = null;

		try (PreparedStatement stmt = conn.prepareStatement(SqlQueries.getUnitLogAngajat())) {

			stmt.setString(1, angajatId);

			stmt.executeQuery();

			ResultSet rs = stmt.getResultSet();

			while (rs.next()) {

				unitLog = rs.getString("filiala");
			}

		} catch (Exception ex) {
			logger.error(Utils.getStackTrace(ex));
		}

		return unitLog;
	}

	private boolean userHasSubordonati(Connection conn, TipAnjagat tipAngajat) {
		boolean hasSubordonati = false;

		try (PreparedStatement stmt = conn.prepareStatement(SqlQueries.userHasSubordonati())) {

			stmt.setString(1, tipAngajat.toString());

			stmt.executeQuery();

			ResultSet rs = stmt.getResultSet();

			while (rs.next()) {

				hasSubordonati = true;
				break;
			}

		} catch (Exception ex) {
			logger.error(Utils.getStackTrace(ex));
		}

		return hasSubordonati;
	}

	private void setErrMessage(int msgId) {

		switch (msgId) {
		case 0:
			errMessage = "Cont inexistent";
			break;

		case 1:
			errMessage = "Cont blocat 60 minute";
			break;

		case 2:
			errMessage = "Parola incorecta";
			break;

		case 4:
			errMessage = "Cont inactiv";
			break;
		default:
			errMessage = "Eroare conectare bd.";
			break;

		}

	}

	public void setConn(Connection conn) {
		this.conn = conn;
	}

	public String getErrMessage() {
		return errMessage;
	}

	public void setErrMessage(String errMessage) {
		this.errMessage = errMessage;
	}

}
