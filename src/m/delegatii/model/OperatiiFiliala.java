package m.delegatii.model;

import java.util.ArrayList;
import java.util.List;

import m.delegatii.beans.Judet;
import m.delegatii.enums.EnumJudete;

public class OperatiiFiliala {

	public List<Judet> getListJudeteStatic() {
		Judet judet;
		List<Judet> listJudete = new ArrayList<>();

		for (EnumJudete enumJ : EnumJudete.values()) {
			judet = new Judet();
			judet.setCod(enumJ.getCod());
			judet.setNume(enumJ.getNume().toUpperCase());
			listJudete.add(judet);
		}

		return listJudete;
	}

}
