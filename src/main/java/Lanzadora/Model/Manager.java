package Lanzadora.Model;


import java.math.BigInteger;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;

import Lanzadora.persistencia.UserDAO;
import excepciones.CredencialesInvalidasException;


public class Manager {

	private WebSocketSession session;
	public static final String USUARIOS = "usuarios";

	public Manager() {
		// Metodo constructor vacio (no hay atributos)
	}

	private static class ManagerHolder {
		private static Manager singleton = new Manager();
	}

	public static Manager get() {
		return ManagerHolder.singleton;
	}

	public void login(String name, String password) throws Exception {
		
		boolean login = false;

		ArrayList<User> usuarios = (ArrayList<User>) UserDAO.leerUsers();
		for (User u : usuarios) {
			login = checkCredenciales(u, name, password);
		}
		if (!login) {
			throw new CredencialesInvalidasException();
		}

	} 

	public boolean checkCredenciales(User u, String name, String password) throws Exception {
		boolean aux = false;
		String pwdEncrypted, pwdUser;
		if (u.getName().equals(name)) {
			pwdEncrypted = u.getPassword();
			pwdUser = encriptarMD5(password);
			if (!(pwdEncrypted.equals(pwdUser))) {

				throw new CredencialesInvalidasException();

			} else {
				System.out.println("Sucessful login");
				aux = true;
			}
		}
		return aux;

	}
/*
	public void register(String name, String email, String password, String rol) throws Exception {
		if ("ADMIN".equals(rol)) {
			//UserDAO.insertar(new Admin(name, email, encriptarMD5(password)));
		} else {
			//UserDAO.insertar(new Asistente(name, email, encriptarMD5(password)));
		}

	}
/*
	public JSONObject leerUsuarios() {
		JSONArray jsa = new JSONArray();
		JSONObject jso = new JSONObject();
		List<User> usuarios = UserDAO.leerUsers();

		for (User user : usuarios) {

			jsa.put(user.toJSON());
		}
		jso.put(USUARIOS, jsa);

		return jso;

	}

	public JSONArray leerAsistentes() {
		JSONArray jsa = new JSONArray();
		List<User> usuarios = UserDAO.leerUsers("ASISTENTE");

		for (User user : usuarios) {
			jsa.put(user.toJSON());
		}

		return jsa;

	}

	public JSONArray leerReuniones() {
		JSONArray jsa = new JSONArray();
		List<Actividad> actividades = ActividadDAO.leerReuniones();
		if (!actividades.isEmpty()) {
			for (Actividad act : actividades) {
				jsa.put(act.toJSON());
			}
		}

		return jsa;

	}

	public void insertarActividad(String nombre, String dia, String horaI, String minutosI, String horaF,
			String minutosF, String usuario, String reunion) {

		List<User> users = UserDAO.leerUsers();

		LocalTime horaIni = LocalTime.of(Integer.parseInt(horaI), Integer.parseInt(minutosI));
		LocalTime horaFin = LocalTime.of(Integer.parseInt(horaF), Integer.parseInt(minutosF));
		boolean reunionB = Boolean.parseBoolean(reunion);

		for (User user : users) {
			if (usuario.equals(user.getName()) && "ASISTENTE".equals(user.getRol())) {
				ActividadDAO.insertarActividad((Asistente) user,
						new Actividad(nombre, DiaSemana.valueOf(dia), horaIni, horaFin, reunionB));
			}
		}
	}

	public void actualizar(String string, boolean boolean1) {
		// sustituir este metodo por su equivalente de los de arriba
	}

	public void eliminarUsuario(String usuario) {
		for (User u : UserDAO.leerUsers()) {
			if (usuario.equals(u.getName()) && "ASISTENTE".equals(u.getRol())) {
				UserDAO.eliminar(u);
			}
		}
	}

	public void error() {
		// sustituir este metodo por su equivalente de los de arriba
	}

	public JSONObject leer() {
		JSONObject jso = new JSONObject();
		jso.put(USUARIOS, Manager.get().leerAsistentes());
		jso.put("actividades", Manager.get().leerReuniones());
		return jso;
	}

	public void eliminarTests() {
		for (User u : UserDAO.leerUsers()) {
			if ("nombre".equals(u.getName())) {
				UserDAO.eliminar(u);
			}
			if ("asistente".equals(u.getName())) {
				UserDAO.eliminar(u);
			}
			if ("admin".equals(u.getName())) {
				UserDAO.eliminar(u);
			}
			if ("admin2".equals(u.getName())) {
				UserDAO.eliminar(u);
			}
		}
		for (Actividad a : ActividadDAO.leerReuniones()) {
			if ("nombre periodo no laborable".equals(a.getName())) {
				ActividadDAO.eliminar(a);
			}
		}
		for (Token t : TokenDAO.leerTokensEliminar()) {
			TokenDAO.eliminar(t);
		}
	}
*/
	public void setSession(WebSocketSession session) {
		this.session = session;
	}
/*
	

	

	private static boolean contiene(List<Actividad> actividades, Actividad a) {
		for (Actividad b : actividades) {
			if (b.getId() == a.getId()) {
				return true;
			}
		}

		return false;
	}



	public JSONArray leerInfoUsuario(String nombre) {
		JSONArray jsa = new JSONArray();
		JSONObject jso = new JSONObject();
		for (User u : UserDAO.leerUsers()) {
			if (u.getName().equals(nombre)) {
				jsa.put(u.toJSON());
			}
		}
		jso.put(USUARIOS, jsa);

		return jsa;
	}




	public void cerrarSesion(String name) {
		TokenDAO.eliminar(new Token(name));
	}

	public void checkAccess(String name, String token, String page) throws AccessNotGrantedException {

		boolean adminPages = (page.contains("admin.html") || page.contains("gestion.html"));
		boolean adminRole = UserDAO.findUser(name).isAdmin();

		if (token.equals(TokenDAO.getToken(name).getToken())) {
			if (adminPages != adminRole) {
				cerrarSesion(name);
				throw new AccessNotGrantedException();
			}
		} else {
			throw new AccessNotGrantedException();
		}

	}
*/
	private static String encriptarMD5(String input) {
		try {
			MessageDigest md = MessageDigest.getInstance("MD5");
			byte[] messageDigest = md.digest(input.getBytes());
			BigInteger number = new BigInteger(1, messageDigest);
			String hashtext = number.toString(16);

			while (hashtext.length() < 32) {
				hashtext = "0" + hashtext;
			}
			return hashtext;
		} catch (NoSuchAlgorithmException e) {
			throw new RuntimeException(e);
		}
	}

}
