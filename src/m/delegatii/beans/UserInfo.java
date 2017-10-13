package m.delegatii.beans;

import java.util.List;

import m.delegatii.enums.TipAnjagat;

public class UserInfo {

	private String nume;
	private String filiala;
	private String tipAcces;
	private String cod;
	private TipAnjagat tipAngajat;
	private String codDepart;
	private String unitLog;
	private String listMasini;
	private List<NavigationDetails> menuOptions;

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
		} else if (codAcces.equals("AV")) {
			tipAngajat = TipAnjagat.AV;
		} else if (codAcces.equals("SD")) {
			tipAngajat = TipAnjagat.SD;
		} else if (codAcces.equals("10")) {
			tipAngajat = TipAnjagat.SD;
		} else if (codAcces.equals("12") || codAcces.equals("14")) {
			tipAngajat = TipAnjagat.DV;
		} else if (codAcces.equals("27")) {
			tipAngajat = TipAnjagat.KA;
		} else if (codAcces.equals("DV")) {
			tipAngajat = TipAnjagat.DV;
		} else if (codAcces.equals("ATR")) {
			tipAngajat = TipAnjagat.ATR;
		} else if (codAcces.equals("DAG")) {
			tipAngajat = TipAnjagat.DAG;
		} else if (codAcces.equals("SSCFI")) {
			tipAngajat = TipAnjagat.SSCFI;
		} else if (codAcces.equals("DFL")) {
			tipAngajat = TipAnjagat.DFL;
		} else if (codAcces.equals("DINV")) {
			tipAngajat = TipAnjagat.DINV;
		} else if (codAcces.equals("DPR")) {
			tipAngajat = TipAnjagat.DPR;
		} else if (codAcces.equals("DHR")) {
			tipAngajat = TipAnjagat.DHR;
		} else if (codAcces.equals("DTR")) {
			tipAngajat = TipAnjagat.DTR;
		} else if (codAcces.equals("DZ")) {
			tipAngajat = TipAnjagat.DZ;
		} else if (codAcces.equals("DD")) {
			tipAngajat = TipAnjagat.DD;
		} else if (codAcces.equals("SBDEZ")) {
			tipAngajat = TipAnjagat.SBDEZ;
		} else if (codAcces.equals("DA")) {
			tipAngajat = TipAnjagat.DA;
		} else if (codAcces.equals("DADMIN")) {
			tipAngajat = TipAnjagat.DADMIN;
		} else if (codAcces.equals("CAG")) {
			tipAngajat = TipAnjagat.CAG;
		} else if (codAcces.equals("CAG1")) {
			tipAngajat = TipAnjagat.CAG;
		} else if (codAcces.equals("CAG2")) {
			tipAngajat = TipAnjagat.CAG;
		} else if (codAcces.equals("SM")) {
			tipAngajat = TipAnjagat.SM;
		} else if (codAcces.equals("SSDTI")) {
			tipAngajat = TipAnjagat.SSDTI;
		} else if (codAcces.equals("SSISCIR")) {
			tipAngajat = TipAnjagat.SSISCIR;
		} else if (codAcces.equals("SSMEC")) {
			tipAngajat = TipAnjagat.SSMEC;
		} else if (codAcces.equals("CJ")) {
			tipAngajat = TipAnjagat.CJ;
		} else if (codAcces.equals("SSIT")) {
			tipAngajat = TipAnjagat.SSIT;
		} else if (codAcces.equals("SSJ")) {
			tipAngajat = TipAnjagat.SSJ;
		} else if (codAcces.equals("SSLO")) {
			tipAngajat = TipAnjagat.SSLO;
		} else if (codAcces.equals("SSSSMSU")) {
			tipAngajat = TipAnjagat.SSSSMSU;
		} else if (codAcces.equals("KA1")) {
			tipAngajat = TipAnjagat.KA;
		} else if (codAcces.equals("KA2")) {
			tipAngajat = TipAnjagat.KA;
		} else if (codAcces.equals("KA3")) {
			tipAngajat = TipAnjagat.KA;
		} else if (codAcces.equals("ARC")) {
			tipAngajat = TipAnjagat.ARC;
		} else if (codAcces.equals("GD")) {
			tipAngajat = TipAnjagat.GD;
		} else if (codAcces.equals("IOFR08")) {
			tipAngajat = TipAnjagat.IOFR08;
		} else if (codAcces.equals("IHR")) {
			tipAngajat = TipAnjagat.IHR;
		} else if (codAcces.equals("ISSM")) {
			tipAngajat = TipAnjagat.ISSM;
		} else if (codAcces.equals("MAC")) {
			tipAngajat = TipAnjagat.MAC;
		} else if (codAcces.equals("MM")) {
			tipAngajat = TipAnjagat.MM;
		} else if (codAcces.equals("MMPROD")) {
			tipAngajat = TipAnjagat.MMPROD;
		} else if (codAcces.equals("OIVPD")) {
			tipAngajat = TipAnjagat.OIVPD;
		} else if (codAcces.equals("OC")) {
			tipAngajat = TipAnjagat.OC;
		} else if (codAcces.equals("RGEST")) {
			tipAngajat = TipAnjagat.RGEST;
		} else if (codAcces.equals("SBA")) {
			tipAngajat = TipAnjagat.SBA;
		} else if (codAcces.equals("SDCVA")) {
			tipAngajat = TipAnjagat.SDCVA;
		} else if (codAcces.equals("SDKA")) {
			tipAngajat = TipAnjagat.SDKA;
		} else if (codAcces.equals("SSFC")) {
			tipAngajat = TipAnjagat.SSFC;
		} else if (codAcces.equals("SSPROD")) {
			tipAngajat = TipAnjagat.SSPROD;
		} else if (codAcces.equals("SOF")) {
			tipAngajat = TipAnjagat.SOF;
		} else if (codAcces.equals("SHR")) {
			tipAngajat = TipAnjagat.SHR;
		} else if (codAcces.equals("STIV")) {
			tipAngajat = TipAnjagat.STIV;
		} else if (codAcces.equals("DPROD")) {
			tipAngajat = TipAnjagat.DPROD;
		} else if (codAcces.equals("CFP")) {
			tipAngajat = TipAnjagat.CFP;
		} else if (codAcces.equals("DENDET")) {
			tipAngajat = TipAnjagat.DENDET;
		} else if (codAcces.equals("DE")) {
			tipAngajat = TipAnjagat.DE;
		} else if (codAcces.equals("DEA")) {
			tipAngajat = TipAnjagat.DEA;
		} else if (codAcces.equals("DFIN")) {
			tipAngajat = TipAnjagat.DFIN;
		} else if (codAcces.equals("DG")) {
			tipAngajat = TipAnjagat.DG;
		} else if (codAcces.equals("DIT")) {
			tipAngajat = TipAnjagat.DIT;
		} else if (codAcces.equals("DJ")) {
			tipAngajat = TipAnjagat.DJ;
		} else if (codAcces.equals("DMK")) {
			tipAngajat = TipAnjagat.DMK;
		} else if (codAcces.equals("DP")) {
			tipAngajat = TipAnjagat.DP;
		} else if (codAcces.equals("ISI")) {
			tipAngajat = TipAnjagat.ISI;
		} else if (codAcces.equals("MP")) {
			tipAngajat = TipAnjagat.MP;
		} else if (codAcces.equals("SSCFC")) {
			tipAngajat = TipAnjagat.SSCFC;
		} else if (codAcces.equals("MSPEC")) {
			tipAngajat = TipAnjagat.MSPEC;
		} else if (codAcces.equals("RMK")) {
			tipAngajat = TipAnjagat.RMK;
		} else if (codAcces.equals("SBCFI")) {
			tipAngajat = TipAnjagat.SBCFI;
		} else if (codAcces.equals("SBIT")) {
			tipAngajat = TipAnjagat.SBIT;
		} else if (codAcces.equals("SBMK")) {
			tipAngajat = TipAnjagat.SBMK;
		} else if (codAcces.equals("SSAI")) {
			tipAngajat = TipAnjagat.SSAI;
		} else if (codAcces.equals("SSC")) {
			tipAngajat = TipAnjagat.SSC;
		} else if (codAcces.equals("TO")) {
			tipAngajat = TipAnjagat.TO;
		} else if (codAcces.equals("ICL")) {
			tipAngajat = TipAnjagat.ICL;
		} else if (codAcces.equals("DAP")) {
			tipAngajat = TipAnjagat.DAP;
		} else if (codAcces.equals("GS")) {
			tipAngajat = TipAnjagat.GS;
		} else if (codAcces.equals("KA08")) {
			tipAngajat = TipAnjagat.KA;
		} else if (codAcces.equals("CONS-GED")) {
			tipAngajat = TipAnjagat.CONS_GED;
		} else if (codAcces.equals("SSIC")) {
			tipAngajat = TipAnjagat.SSIC;
		} else if (codAcces.equals("DDEZ")) {
			tipAngajat = TipAnjagat.DDEZ;
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

	public String getCodDepart() {
		return codDepart;
	}

	public void setCodDepart(String codDepart) {
		this.codDepart = codDepart;
	}

	public List<NavigationDetails> getMenuOptions() {
		return menuOptions;
	}

	public void setMenuOptions(List<NavigationDetails> menuOptions) {
		this.menuOptions = menuOptions;
	}

	public void clearData() {

		nume = "";
		filiala = "";
		tipAcces = "";
		cod = "";
		tipAngajat = null;
		codDepart = "";
		unitLog = "";
		listMasini = "";
		menuOptions = null;

	}

	@Override
	public String toString() {
		return "UserInfo [nume=" + nume + ", filiala=" + filiala + ", tipAcces=" + tipAcces + ", cod=" + cod + ", tipAngajat=" + tipAngajat + ", codDepart="
				+ codDepart + ", unitLog=" + unitLog + ", listMasini=" + listMasini + "]";
	}

}
