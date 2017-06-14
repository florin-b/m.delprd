package m.delegatii.enums;

public enum EnumTipAprob {
	AV(1);

	private int cod;

	EnumTipAprob(int cod) {
		this.cod = cod;
	}

	public int getCod() {
		return cod;
	}

	public static int getCodAprob(TipAnjagat tipAngajat) {
		for (EnumTipAprob tipAprob : EnumTipAprob.values()) {
			if (tipAngajat.toString().equals(tipAprob.toString()))
				return tipAprob.getCod();
		}

		return -1;
	}

}
