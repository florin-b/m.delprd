package m.delegatii.model;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import m.delegatii.database.DBManager;
import m.delegatii.queries.SqlQueries;
import m.delegatii.utils.Utils;

public class OperatiiAngajat {

	private static final Logger logger = LogManager.getLogger(OperatiiAngajat.class);

	public String getTipAngajat(String codAngajat) {

		String tipAngajat = "";

		try (Connection conn = new DBManager().getProdDataSource().getConnection();
				PreparedStatement stmt = conn.prepareStatement(SqlQueries.getTipAngajat())) {

			stmt.setString(1, codAngajat);
			stmt.executeQuery();

			ResultSet rs = stmt.getResultSet();

			while (rs.next()) {
				tipAngajat = rs.getString("functie");
			}

		}

		catch (SQLException e) {
			logger.error(Utils.getStackTrace(e));

		}

		return tipAngajat;
	}

	public String getDepartAngajat(String codAngajat) {

		String tipAngajat = "";

		try (Connection conn = new DBManager().getProdDataSource().getConnection();
				PreparedStatement stmt = conn.prepareStatement(SqlQueries.getDepartAngajat())) {

			stmt.setString(1, codAngajat);
			stmt.executeQuery();

			ResultSet rs = stmt.getResultSet();

			while (rs.next()) {
				tipAngajat = rs.getString("functie");
			}

		}

		catch (SQLException e) {
			logger.error(Utils.getStackTrace(e));

		}

		return tipAngajat;
	}

}
