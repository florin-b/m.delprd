package m.delegatii.test;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;

import m.delegatii.beans.User;
import m.delegatii.database.Account;
import m.delegatii.database.DBManager;
import m.delegatii.model.OperatiiMasini;

public class TestClass {

	public static void main(String[] args) throws Exception {

		
		
		System.out.println(new OperatiiMasini().getMasiniAlocate("00083215"));
		
		User user = new User();
		
		user.setName("MCOMAN");
		user.setPassword("p9n2PW");
		
		Account acc = new Account();
		acc.setConn(DBManager.getProdInstance().getConnection());
		
		
		
		System.out.println(acc.loginUser(user));
		
		

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
