package m.delegatii.database;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

import javax.naming.Context;
import javax.naming.InitialContext;
import javax.naming.NamingException;
import javax.sql.DataSource;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import oracle.jdbc.pool.OracleDataSource;
import m.delegatii.utils.Utils;

public class DBManager {

	private static DataSource dataSourcePrd;
	private static DataSource dataSourceTest;

	private static final Logger logger = LogManager.getLogger(DBManager.class);

	private DBManager() {

	}

	public static DataSource getProdInstance() {
		if (dataSourcePrd == null)
			dataSourcePrd = getProdDataSource();

		return dataSourcePrd;
	}


	
	
	private static DataSource getProdDataSource() {

		OracleDataSource oracleDS = null;
		try {

			oracleDS = new OracleDataSource();
			oracleDS.setURL("jdbc:oracle:thin:@10.1.3.94:1521:prd002");
			oracleDS.setUser("WEBSAP");
			oracleDS.setPassword("2INTER7");
		} catch (Exception e) {
			e.printStackTrace();
		}
		return oracleDS;
	}

	public static DataSource getTestInstance() {
		if (dataSourceTest == null)
			dataSourceTest = getTestDataSource();

		return dataSourceTest;
	}

	
	public static DataSource getTestDataSource() {

		OracleDataSource oracleDS = null;
		try {

			oracleDS = new OracleDataSource();
			oracleDS.setURL("jdbc:oracle:thin:@10.1.3.89:1527:tes");
			oracleDS.setUser("WEBSAP");
			oracleDS.setPassword("2INTER7");
		} catch (Exception e) {
			e.printStackTrace();
		}
		return oracleDS;
	}
	
	
	private static DataSource getTestDataSource1() {
		InitialContext initContext;
		DataSource ds = null;
		try {
			initContext = new InitialContext();
			Context envContext = (Context) initContext.lookup("java:/comp/env");
			ds = (DataSource) envContext.lookup("jdbc/myoracle_test");
		} catch (NamingException e) {
			logger.error(Utils.getStackTrace(e));
		}

		return ds;
	}

	public static void closeConnection(ResultSet rs, Connection conn) {
		try {

			if (rs != null)
				rs.close();

			if (conn != null)
				conn.close();

		} catch (Exception ex) {

		}
	}

	public static void closeConnection(PreparedStatement stmt, ResultSet rs) {
		try {
			if (stmt != null)
				stmt.close();

			if (rs != null)
				rs.close();

		} catch (Exception ex) {

		}

	}

}