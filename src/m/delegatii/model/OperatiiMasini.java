package m.delegatii.model;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import m.delegatii.database.DBManager;
import m.delegatii.queries.SqlQueries;
import m.delegatii.utils.Utils;

public class OperatiiMasini {

	private static final Logger logger = LogManager.getLogger(OperatiiMasini.class);

	public List<String> getMasiniAlocate(String codAngajat) {

		List<String> listMasini = new ArrayList<>();

		try (Connection conn = new DBManager().getProdDataSource().getConnection();
				PreparedStatement stmt = conn.prepareStatement(SqlQueries.getMasiniAlocate(), ResultSet.TYPE_SCROLL_INSENSITIVE, ResultSet.CONCUR_READ_ONLY);) {

			stmt.setString(1, codAngajat);
			stmt.executeQuery();

			ResultSet rs = stmt.getResultSet();

			while (rs.next()) {
				listMasini.add(rs.getString("ktext"));
			}

		}

		catch (SQLException e) {
			logger.error(Utils.getStackTrace(e));

		}

		return listMasini;

	}

}
