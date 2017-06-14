package m.delegatii.servlets;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import m.delegatii.model.OperatiiDelegatii;

@WebServlet("/aprobaDelegatie.do")
public class AprobaDelegatie extends HttpServlet {
	private static final long serialVersionUID = 1L;

	public AprobaDelegatie() {
		super();

	}

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

		try {
			PrintWriter writer = response.getWriter();

			String idDelegatie = request.getParameter("idDelegatie");
			double kmAprobati = Double.parseDouble(request.getParameter("kmAprobati"));

			new OperatiiDelegatii().aprobaDelegatie(idDelegatie, kmAprobati);

			writer.write("11");
		} catch (Exception ex) {
			System.out.println(ex.toString());
		}

	}

}
