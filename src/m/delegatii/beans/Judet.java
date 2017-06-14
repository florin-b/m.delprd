package m.delegatii.beans;

import java.io.Serializable;

public class Judet implements Serializable {

	private static final long serialVersionUID = 1L;
	private String cod;
	private String nume;

	public Judet() {

	}

	public String getCod() {
		return cod;
	}

	public void setCod(String cod) {
		this.cod = cod;
	}

	public String getNume() {
		return nume;
	}

	public void setNume(String nume) {
		this.nume = nume;
	}

	public String toString() {
		return "Judet [cod=" + cod + ", nume=" + nume + "]";
	}

}
