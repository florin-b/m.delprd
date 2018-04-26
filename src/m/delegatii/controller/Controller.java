package m.delegatii.controller;

import java.io.IOException;
import java.sql.Connection;
import java.sql.SQLException;

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
import m.delegatii.database.Account;
import m.delegatii.database.DBManager;
import m.delegatii.model.OperatiiAngajat;
import m.delegatii.utils.Utils;

@WebServlet("/Controller")
public class Controller extends HttpServlet {
	private static final long serialVersionUID = 1L;

	private static final Logger logger = LogManager.getLogger(Controller.class);

	public Controller() {
		super();

	}

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

		String action = request.getParameter("action");

		Connection conn = null;

		Account account = new Account();

		try {
			conn = new DBManager().getProdDataSource().getConnection();
			
			account.setConn(conn);
		} catch (SQLException e) {
			logger.error(Utils.getStackTrace(e));
			account.setErrMessage(e.toString());
			throw new ServletException();
		}

		if (action.equals("dologin")) {

			String name = request.getParameter("txt_user");
			String password = request.getParameter("txt_password");

			request.setAttribute("name", name);
			request.setAttribute("password", "");
			request.setAttribute("message", "");

			User user = new User();
			user.setName(name);
			user.setPassword(password);

			try {
				HttpSession session = request.getSession();
				session.setAttribute("userAuthLevel", "0");

				if (account.loginUser(user)) {

					user.setCod(UserInfo.getInstance().getCod());
					user.setUnitLog(UserInfo.getInstance().getUnitLog());
					user.setTipAng(UserInfo.getInstance().getTipAngajat().name());
					user.setListMasini(UserInfo.getInstance().getListMasini());
					user.setCodDepart(UserInfo.getInstance().getCodDepart());
					user.setNumeAng(UserInfo.getInstance().getNumeAngajat());

					// DD 01 are acces si la 02
					if (user.getCod().equals("00006321"))
						user.setCodDepart("01,02");

					if (isUserExceptieExtraFiliale(user.getTipAng())) {
						String extraFiliale = new OperatiiAngajat().getExtraFiliale(UserInfo.getInstance().getCod());

						if (!extraFiliale.isEmpty()) {
							extraFiliale = user.getUnitLog() + "," + extraFiliale;
							user.setUnitLog(extraFiliale);
						}
					}

					session.setAttribute("userAuthLevel", "1");
					session.setAttribute("user", user);

					request.getRequestDispatcher("/auth/mainMenu.jsp").include(request, response);

				} else {
					session.invalidate();
					request.setAttribute("account", account);
					request.getRequestDispatcher("/logon.jsp").forward(request, response);
				}
			} catch (SQLException e) {
				logger.error(Utils.getStackTrace(e));
				request.setAttribute("email", "Eroare conectare baza de date.");
			}

		}

		else if (action.equals("dologout")) {

			request.getSession().invalidate();
			request.setAttribute("name", "");
			request.setAttribute("password", "");
			request.setAttribute("message", "");
			request.getRequestDispatcher("/logon.jsp").forward(request, response);
		}

		if (conn != null)
			try {
				conn.close();
			} catch (SQLException e) {
				e.printStackTrace();
			}

	}

	private boolean isUserExceptieExtraFiliale(String tipUser) {
		return tipUser.toUpperCase().startsWith("SD") || tipUser.equalsIgnoreCase("DMK") || tipUser.equalsIgnoreCase("DIT")
				|| tipUser.equalsIgnoreCase("DADMIN") || tipUser.equalsIgnoreCase("DZ");
	}

}
