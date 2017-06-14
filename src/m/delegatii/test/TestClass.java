package m.delegatii.test;

import java.sql.ResultSet;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;

import com.google.gson.Gson;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;


import m.delegatii.beans.BeanDelegatieAprobare;
import m.delegatii.enums.EnumTipAprob;
import m.delegatii.enums.TipAnjagat;
import m.delegatii.model.OperatiiDelegatii;
import m.delegatii.utils.DateUtils;

public class TestClass {

	public static void main(String[] args) throws Exception {

		String opriri = "17 /  GALATI,9 / BRAILA /  BRAILA,40 / BUCURESTI";
		
		String[] arrayOpriri = opriri.split(",");
		
		for (int i = 0; i < arrayOpriri.length; i++) {

			String[] arrayAdresa = arrayOpriri[i].trim().split("/");
			
			System.out.println(arrayAdresa[0] + ", " + arrayAdresa[1]);
			
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
