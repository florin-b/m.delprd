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
import m.delegatii.utils.Utils;

@WebServlet("/Controller")
public class Controller extends HttpServlet {
	private static final long serialVersionUID = 1L;

	private static final Logger logger = LogManager.getLogger(Controller.class);

	public Controller() {
		super();

	}

	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		response.getWriter().append("Served at: ").append(request.getContextPath());
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {

		String action = request.getParameter("action");

		Connection conn = null;

		try {
			conn = DBManager.getProdInstance().getConnection();
		} catch (SQLException e) {
			logger.error(Utils.getStackTrace(e));
			throw new ServletException();
		}

		Account account = new Account(conn);

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
					
					session.setAttribute("userAuthLevel", "1");
					session.setAttribute("user", user);
					request.getRequestDispatcher("/auth/mainMenu.jsp").include(request, response);
					

				} else {
					session.setAttribute("account", account);
					session.setAttribute("user", user);
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
			request.getRequestDispatcher("/login.jsp").forward(request, response);
		}

		if (conn != null)
			try {
				conn.close();
			} catch (SQLException e) {
				e.printStackTrace();
			}

	}

}
