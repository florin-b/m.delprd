package m.delegatii.beans;

import java.io.Serializable;

public class User implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private String password = "";
	private String name = "";
	private String userName = "";
	private String filiala = "";
	private String message = "mes";
	private String cod = "";
	private String unitLog = "";
	private String tipAng = "";
	private String listMasini = "";
	private String codDepart = "";

	public User() {

	}

	public User(String name, String password) {
		this.name = name;
		this.password = password;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getFiliala() {
		return filiala;
	}

	public void setFiliala(String filiala) {
		this.filiala = filiala;
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public String getMessage() {
		return message;
	}

	public boolean validate() {

		if (name == null) {
			message = "Invalid name";
			return false;
		}

		if (password == null) {
			message = "Invalid password";
			return false;
		}

		return true;
	}

	public String getCod() {
		return cod;
	}

	public void setCod(String cod) {
		this.cod = cod;
	}

	public String getUnitLog() {
		return unitLog;
	}

	public void setUnitLog(String unitLog) {
		this.unitLog = unitLog;
	}

	public String getTipAng() {
		return tipAng;
	}

	public void setTipAng(String tipAng) {
		this.tipAng = tipAng;
	}

	public void setMessage(String message) {
		this.message = message;
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

	@Override
	public String toString() {
		return "User [password=" + password + ", name=" + name + ", userName=" + userName + ", filiala=" + filiala + ", message=" + message + ", cod=" + cod + ", unitLog="
				+ unitLog + ", tipAng=" + tipAng + ", listMasini=" + listMasini + ", codDepart=" + codDepart + "]";
	}

}
