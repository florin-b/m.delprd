package m.delegatii.beans;

import m.delegatii.enums.TipAnjagat;

public class UserInfo {

	private String nume;
	private String filiala;
	private String tipAcces;
	private String cod;
	private TipAnjagat tipAngajat;
	private String unitLog;
	private String listMasini;

	private static UserInfo instance;

	private UserInfo() {

	}

	public static UserInfo getInstance() {
		if (instance == null)
			instance = new UserInfo();

		return instance;
	}

	public String getNume() {
		return nume;
	}

	public void setNume(String nume) {
		this.nume = nume;
	}

	public String getFiliala() {
		return filiala;
	}

	public void setFiliala(String filiala) {
		this.filiala = filiala;
	}

	public String getTipAcces() {
		return tipAcces;
	}

	public void setTipAcces(String tipAcces) {
		this.tipAcces = tipAcces;
	}

	public String getCod() {
		return cod;
	}

	public void setCod(String cod) {
		this.cod = cod;
	}

	public TipAnjagat getTipAngajat() {
		return tipAngajat;
	}

	public void setTipAngajat(String codAcces) {

		if (codAcces.equals("9")) {
			tipAngajat = TipAnjagat.AV;
		}

		if (codAcces.equals("10")) {
			tipAngajat = TipAnjagat.SD;
		}

	}

	public String getUnitLog() {
		return unitLog;
	}

	public void setUnitLog(String unitLog) {
		this.unitLog = unitLog;
	}

	public String getListMasini() {
		return listMasini;
	}

	public void setListMasini(String listMasini) {
		this.listMasini = listMasini;
	}

	@Override
	public String toString() {
		return "UserInfo [nume=" + nume + ", filiala=" + filiala + ", tipAcces=" + tipAcces + ", cod=" + cod + ", tipAngajat=" + tipAngajat + ", unitLog=" + unitLog
				+ ", listMasini=" + listMasini + "]";
	}
	
	
	

}
