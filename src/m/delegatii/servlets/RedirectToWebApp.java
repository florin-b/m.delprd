package m.delegatii.servlets;

import java.io.IOException;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import m.delegatii.beans.User;
import m.delegatii.beans.UserInfo;
import m.delegatii.model.OperatiiAngajat;
import m.delegatii.model.OperatiiMasini;

@WebServlet("/redirect")
public class RedirectToWebApp extends HttpServlet {
	private static final long serialVersionUID = 1L;

	private static final Logger logger = LogManager.getLogger(RedirectToWebApp.class);

	public RedirectToWebApp() {
		super();

	}

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

		try {
			HttpSession session = request.getSession();

			UserInfo.getInstance().setFiliala(request.getParameter("filiala"));
			UserInfo.getInstance().setNume(request.getParameter("nume"));
			UserInfo.getInstance().setCod(request.getParameter("cod"));

			String codAcces = request.getParameter("tipAcces");

			if (codAcces.equalsIgnoreCase("12")) {
				codAcces = new OperatiiAngajat().getTipAngajat(UserInfo.getInstance().getCod());

			}

			UserInfo.getInstance().setTipAcces(codAcces);
			UserInfo.getInstance().setTipAngajat(codAcces);

			String strUnitLog = request.getParameter("unitLog");

			if (request.getParameter("filiala").equalsIgnoreCase("TOATE"))
				strUnitLog = "BU90";

			UserInfo.getInstance().setUnitLog(strUnitLog);
			UserInfo.getInstance().setCodDepart(request.getParameter("codDepart"));

			List<String> listMasini = new OperatiiMasini().getMasiniAlocate(UserInfo.getInstance().getCod());

			UserInfo.getInstance().setListMasini(listMasini.toString());

			User user = new User();

			user.setCod(UserInfo.getInstance().getCod());
			user.setUnitLog(UserInfo.getInstance().getUnitLog());
			user.setTipAng(UserInfo.getInstance().getTipAngajat().name());
			user.setListMasini(UserInfo.getInstance().getListMasini());
			user.setCodDepart(UserInfo.getInstance().getCodDepart());

			session.setAttribute("userAuthLevel", "1");
			session.setAttribute("user", user);

			StringBuffer url = request.getRequestURL();
			String uri = request.getRequestURI();
			String ctx = request.getContextPath();
			String base = url.substring(0, url.length() - uri.length() + ctx.length()) + "/";

			String redirectAddr = base + "auth/mainMenu.jsp";

			response.sendRedirect(redirectAddr);

		} catch (Exception ex) {
			logger.error(ex.toString());
		}

	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

		doGet(request, response);
	}

}
