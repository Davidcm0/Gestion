package Lanzadora.Model;

import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.DataInputStream;
import java.io.DataOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.math.BigInteger;
import java.net.Socket;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Scanner;

import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;

import Lanzadora.persistencia.UserDAO;
import Lanzadora.persistencia.proyectoDAO;
import excepciones.CredencialesInvalidasException;

import java.awt.EventQueue;
import java.awt.TextField;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.io.*;
import javax.swing.*;

public class Manager {
	Archivo archivo = new Archivo();
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
			if (login)
				break;
		}
		if (!login) {
			throw new CredencialesInvalidasException();
		}

	}

	public boolean checkCredenciales(User u, String name, String password) throws Exception {
		boolean aux = false;
		String pwdEncrypted, pwdUser;
		if (u.getValidado()) {
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
		}

		return aux;

	}

	/*
	 * public void register(String name, String email, String password, String rol)
	 * throws Exception { if ("ADMIN".equals(rol)) { //UserDAO.insertar(new
	 * Admin(name, email, encriptarMD5(password))); } else { //UserDAO.insertar(new
	 * Asistente(name, email, encriptarMD5(password))); }
	 * 
	 * } /* public JSONObject leerUsuarios() { JSONArray jsa = new JSONArray();
	 * JSONObject jso = new JSONObject(); List<User> usuarios = UserDAO.leerUsers();
	 * 
	 * for (User user : usuarios) {
	 * 
	 * jsa.put(user.toJSON()); } jso.put(USUARIOS, jsa);
	 * 
	 * return jso;
	 * 
	 * }
	 * 
	 * public JSONArray leerAsistentes() { JSONArray jsa = new JSONArray();
	 * List<User> usuarios = UserDAO.leerUsers("ASISTENTE");
	 * 
	 * for (User user : usuarios) { jsa.put(user.toJSON()); }
	 * 
	 * return jsa;
	 * 
	 * }
	 * 
	 * public JSONArray leerReuniones() { JSONArray jsa = new JSONArray();
	 * List<Actividad> actividades = ActividadDAO.leerReuniones(); if
	 * (!actividades.isEmpty()) { for (Actividad act : actividades) {
	 * jsa.put(act.toJSON()); } }
	 * 
	 * return jsa;
	 * 
	 * }
	 * 
	 * public void insertarActividad(String nombre, String dia, String horaI, String
	 * minutosI, String horaF, String minutosF, String usuario, String reunion) {
	 * 
	 * List<User> users = UserDAO.leerUsers();
	 * 
	 * LocalTime horaIni = LocalTime.of(Integer.parseInt(horaI),
	 * Integer.parseInt(minutosI)); LocalTime horaFin =
	 * LocalTime.of(Integer.parseInt(horaF), Integer.parseInt(minutosF)); boolean
	 * reunionB = Boolean.parseBoolean(reunion);
	 * 
	 * for (User user : users) { if (usuario.equals(user.getName()) &&
	 * "ASISTENTE".equals(user.getRol())) {
	 * ActividadDAO.insertarActividad((Asistente) user, new Actividad(nombre,
	 * DiaSemana.valueOf(dia), horaIni, horaFin, reunionB)); } } }
	 * 
	 * public void actualizar(String string, boolean boolean1) { // sustituir este
	 * metodo por su equivalente de los de arriba }
	 * 
	 * public void eliminarUsuario(String usuario) { for (User u :
	 * UserDAO.leerUsers()) { if (usuario.equals(u.getName()) &&
	 * "ASISTENTE".equals(u.getRol())) { UserDAO.eliminar(u); } } }
	 * 
	 * public void error() { // sustituir este metodo por su equivalente de los de
	 * arriba }
	 * 
	 * public JSONObject leer() { JSONObject jso = new JSONObject();
	 * jso.put(USUARIOS, Manager.get().leerAsistentes()); jso.put("actividades",
	 * Manager.get().leerReuniones()); return jso; }
	 * 
	 * public void eliminarTests() { for (User u : UserDAO.leerUsers()) { if
	 * ("nombre".equals(u.getName())) { UserDAO.eliminar(u); } if
	 * ("asistente".equals(u.getName())) { UserDAO.eliminar(u); } if
	 * ("admin".equals(u.getName())) { UserDAO.eliminar(u); } if
	 * ("admin2".equals(u.getName())) { UserDAO.eliminar(u); } } for (Actividad a :
	 * ActividadDAO.leerReuniones()) { if
	 * ("nombre periodo no laborable".equals(a.getName())) {
	 * ActividadDAO.eliminar(a); } } for (Token t : TokenDAO.leerTokensEliminar()) {
	 * TokenDAO.eliminar(t); } }
	 */
	public void setSession(WebSocketSession session) {
		this.session = session;
	}

	/*
	 * 
	 * 
	 * 
	 * 
	 * private static boolean contiene(List<Actividad> actividades, Actividad a) {
	 * for (Actividad b : actividades) { if (b.getId() == a.getId()) { return true;
	 * } }
	 * 
	 * return false; }
	 * 
	 * 
	 * 
	 * public JSONArray leerInfoUsuario(String nombre) { JSONArray jsa = new
	 * JSONArray(); JSONObject jso = new JSONObject(); for (User u :
	 * UserDAO.leerUsers()) { if (u.getName().equals(nombre)) { jsa.put(u.toJSON());
	 * } } jso.put(USUARIOS, jsa);
	 * 
	 * return jsa; }
	 * 
	 * 
	 * 
	 * 
	 * public void cerrarSesion(String name) { TokenDAO.eliminar(new Token(name)); }
	 * 
	 * public void checkAccess(String name, String token, String page) throws
	 * AccessNotGrantedException {
	 * 
	 * boolean adminPages = (page.contains("admin.html") ||
	 * page.contains("gestion.html")); boolean adminRole =
	 * UserDAO.findUser(name).isAdmin();
	 * 
	 * if (token.equals(TokenDAO.getToken(name).getToken())) { if (adminPages !=
	 * adminRole) { cerrarSesion(name); throw new AccessNotGrantedException(); } }
	 * else { throw new AccessNotGrantedException(); }
	 * 
	 * }
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

	public void sendProyecto(String nombre) {
		boolean enviado = false;
		// boolean proyecto_enviado = true;

		DataInputStream input;
		BufferedInputStream bis;
		BufferedOutputStream bos;
		int in;
		byte[] byteArray;
		// Fichero a transferir

		System.out.println(archivo.getRuta());
		final String filename = archivo.getRuta();

		try {
			final File localFile = new File(filename);
			Socket client = new Socket("localhost", 5000);
			bis = new BufferedInputStream(new FileInputStream(localFile));
			bos = new BufferedOutputStream(client.getOutputStream());
			// Enviamos el nombre del fichero
			DataOutputStream dos = new DataOutputStream(client.getOutputStream());

			dos.writeUTF(localFile.getName());

			// Enviamos el fichero
			byteArray = new byte[8192];
			while ((in = bis.read(byteArray)) != -1) {

				bos.write(byteArray, 0, in);
				enviado = true;
			}

			bis.close();
			bos.close();

		} catch (Exception e) {
			System.err.println(e);
		}
		if (enviado)
			proyectoDAO.proyecto_enviado(nombre, true);
	}

	public void explorador() {
		Scanner entrada = null;
		JFileChooser fileChooser = new JFileChooser();
		fileChooser.showOpenDialog(fileChooser);
		try {
			String ruta = fileChooser.getSelectedFile().getAbsolutePath();

			archivo.setRuta(ruta);
			System.out.println(ruta);
			File f = new File(ruta);
			entrada = new Scanner(f);

		} catch (FileNotFoundException e) {
			System.out.println(e.getMessage());
		} catch (NullPointerException e) {
			System.out.println("No se ha seleccionado ningún fichero");
		} catch (Exception e) {
			System.out.println(e.getMessage());
		} finally {
			if (entrada != null) {
				entrada.close();
			}
		}

	}

	public void crearProyecto(String nombre, int repeticiones, String lenguaje, String descripcion, int dut,
			String usuario) {
		java.util.Date fecha = new Date();
		DateTimeFormatter dtf = DateTimeFormatter.ofPattern("yyyy/MM/dd HH:mm:ss");
		System.out.println(dtf);
		System.out.println("yyyy/MM/dd HH:mm:ss-> " + dtf.format(LocalDateTime.now()));
		// fecha = dtf.format(LocalDateTime.now());
		System.out.println(fecha);
		String estado = "En preparación";
		Boolean enviado = false;
		proyectoDAO.insertar(
				new proyecto(fecha, nombre, descripcion, dut, repeticiones, lenguaje, usuario, estado, enviado));

	}

	public JSONObject leer_proyectos(String nombre) {
		JSONArray jsa = new JSONArray();
		JSONObject jso = new JSONObject();
		List<proyecto> proyectos = proyectoDAO.leer_proyectos(nombre);

		for (proyecto proyecto : proyectos) {

			jsa.put(proyecto.toJSON());
		}
		jso.put("proyectos", jsa);

		return jso;

	}

	public void register(String nombre, String email, String password) {
		Boolean validado = false;
		UserDAO.insertar(new User(nombre, encriptarMD5(password), email, validado));

	}

	public void actualizar_estado(String proyecto, String estado) {

		proyectoDAO.actualizar(proyecto, estado);

	}

	public JSONObject resultados(String proyecto, String usuario) {
		Resultados resultados = new Resultados();
		Double Time[] = new Double[10];
		Double HDD[] = new Double[10];
		Double Graphs[] = new Double[10];
		Double Procesador[] = new Double[10];
		Double Monitor[] = new Double[10];
		Double DUT[] = new Double[10];
		int j = 4;
		try {
			Connection connection = DriverManager
					.getConnection("jdbc:mariadb://172.20.48.59:3306/elliotdb?user=david&password=greenTFG#");

			Statement s = connection.createStatement();

			ResultSet rs = s.executeQuery(
					"select d.* from testcase t, testcasereport r, testcasereport_data d where t.name = \"Fasta2\" and t._id = r.TestCase_id and r._id = d.TestCaseReport_id");

			while (rs.next()) {
				switch (rs.getString(3)) {
				case "time":
					j = 4;
					for (int i = 0; i < Time.length; i++) {
						Time[i] = rs.getDouble(j);
						j++;
					}
					resultados.setTime(Time);

					break;

				case "hdd":
					j = 4;
					for (int i = 0; i < Time.length; i++) {
						HDD[i] = rs.getDouble(j);
						j++;
					}
					
					resultados.setHDD(HDD);
					break;

				case "graphicscard":
					j = 4;
					for (int i = 0; i < Time.length; i++) {
						Graphs[i] = rs.getDouble(j);
						j++;
					}
					resultados.setGraphs(Graphs);

					break;

				case "processor":
					j = 4;
					for (int i = 0; i < Time.length; i++) {
						Procesador[i] = rs.getDouble(j);
						j++;
					}
					resultados.setProcesador(Procesador);

					break;

				case "monitor":
					j = 4;
					for (int i = 0; i < Time.length; i++) {
						Monitor[i] = rs.getDouble(j);
						j++;
					}
					resultados.setMonitror(Monitor);

					break;

				case "dut":
					j = 4;
					for (int i = 0; i < Time.length; i++) {
						DUT[i] = rs.getDouble(j);
						j++;
					}
					resultados.setDUT(DUT);

					break;

				}
				
				// System.out.println (rs.getString(3) + " " + rs.getDouble (4)+ " " +
				// rs.getDouble (5)+ " " + rs.getDouble (6)+ " " + rs.getDouble (7)+ " " +
				// rs.getDouble (8)+ " " + rs.getDouble (9));
			}
			System.out.println("hh");
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		
		JSONArray jsa = new JSONArray();
		JSONObject jso = new JSONObject();

			jsa.put(resultados.toJSON());
		
		jso.put("resultados", jsa);

		return jso;
		

	}

	public Object leer() {
		// TODO Auto-generated method stub
		return null;
	}

	public void modificarUsuario(String nombre, String new_nombre, String descripcion, int dut, int repeticiones,
			String lenguaje) {
		proyectoDAO.modificar(nombre, new_nombre, descripcion, dut, repeticiones, lenguaje);

	}

	public JSONObject leer_usuarios() {
		JSONArray jsa = new JSONArray();
		JSONObject jso = new JSONObject();
		List<User> usuarios = proyectoDAO.leer_usuarios();

		for (User usuario : usuarios) {

			jsa.put(usuario.toJSON());
		}
		jso.put("usuarios", jsa);

		return jso;
	}

	public void validar_user(String usuario) {
		UserDAO.validar(usuario);

	}

	public void eliminar_users() {
		UserDAO.eliminarAll();

	}

}
