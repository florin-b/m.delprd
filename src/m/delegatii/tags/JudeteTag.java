package m.delegatii.tags;

import java.io.IOException;
import java.util.List;

import javax.servlet.jsp.JspException;
import javax.servlet.jsp.JspWriter;
import javax.servlet.jsp.PageContext;
import javax.servlet.jsp.tagext.SimpleTagSupport;

import m.delegatii.beans.Judet;
import m.delegatii.model.OperatiiFiliala;

public class JudeteTag extends SimpleTagSupport {

	private String name, id;

	private static final String ATTR_TEMPLATE = "%s='%s' ";

	public void doTag() throws JspException, IOException {

		PageContext pageContext = (PageContext) getJspContext();

		JspWriter out = pageContext.getOut();
		out.print("<select ");
		out.print(String.format(ATTR_TEMPLATE, "name", this.name));
		out.print(String.format(ATTR_TEMPLATE, "id", this.id));
		out.println(">");

		OperatiiFiliala operatiiFiliala = new OperatiiFiliala();

		List<Judet> listJudete = operatiiFiliala.getListJudeteStatic();

		for (Judet judet : listJudete) {

			out.print("  <option value='");
			out.print(judet.getCod());
			out.print("'>");
			out.print(judet.getNume());
			out.println("</option>");

		}

		out.println("</select>");

	}

}
