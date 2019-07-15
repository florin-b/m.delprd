package m.delegatii.test;

import java.sql.Connection;
import java.sql.SQLException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;

import javax.servlet.ServletException;

import m.delegatii.beans.User;
import m.delegatii.database.Account;
import m.delegatii.database.DBManager;

public class TestClass {

	public static void main(String[] args) throws Exception {

	
	
		
		
		
		
		User u = new User();
		u.setUserName("IONITAD");
		u.setPassword("JYXgd4");
	
		Connection conn = null;
		Account account = new Account();
		
		try {
			conn = new DBManager().getProdDataSource().getConnection();

			account.setConn(conn);
		} catch (SQLException e) {
		
			System.out.println(e.toString());
			
			account.setErrMessage(e.toString());
			throw new ServletException();
		}

		
		account.loginUser(u);
		
		
		
		
		if (conn != null)
			try {
				conn.close();
			} catch (SQLException e) {
				e.printStackTrace();
			}
		

	}

	public static String getId() {
		SimpleDateFormat sdf = new SimpleDateFormat("dd-M-yyyy");
		String dateInString = "01-01-2017";
		Date date;
		Calendar calendar = Calendar.getInstance();

		try {
			date = sdf.parse(dateInString);
			calendar.setTime(date);

		} catch (ParseException e) {

		}

		long millis = System.currentTimeMillis() - calendar.getTimeInMillis();
		return (String.valueOf(millis));
	}

}
