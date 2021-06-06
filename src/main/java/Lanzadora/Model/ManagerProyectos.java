package Lanzadora.Model;

import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.DataInputStream;
import java.io.DataOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.net.Socket;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Date;
import java.util.List;
import java.util.Scanner;

import javax.swing.JFileChooser;

import org.json.JSONArray;
import org.json.JSONObject;

import Lanzadora.persistencia.UserDAO;
import Lanzadora.persistencia.proyectoDAO;

public class ManagerProyectos {

	public ManagerProyectos() {
		// Metodo constructor vacio (no hay atributos)
	}

	private static class ManagerHolder {
		private static Manager singleton = new Manager();
	}

	public static Manager get() {
		return ManagerHolder.singleton;
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

		//System.out.println(archivo.getRuta());
		final String filename = nombre;

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
				
			}
			enviado = true;
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

			//archivo.setRuta(ruta);
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
		User usuarioDef = new User();
		List<User> usuarios = UserDAO.leerUsers();
		for(User user : usuarios) {
			if(user.getName().equals(usuario)) {
				
				usuarioDef.setEmail(user.getEmail());
						
			}
			
		}
		java.util.Date fecha = new Date();
		DateTimeFormatter dtf = DateTimeFormatter.ofPattern("yyyy/MM/dd HH:mm:ss");
		System.out.println(dtf);
		System.out.println("yyyy/MM/dd HH:mm:ss-> " + dtf.format(LocalDateTime.now()));
		// fecha = dtf.format(LocalDateTime.now());
		System.out.println(fecha);
		String estado = "En preparación";
		Boolean enviado = false;
		proyectoDAO.insertar(
				new proyecto(fecha, nombre, descripcion, dut, repeticiones, lenguaje, usuario, usuarioDef.getEmail(), estado, enviado, "",""));

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

	
}
