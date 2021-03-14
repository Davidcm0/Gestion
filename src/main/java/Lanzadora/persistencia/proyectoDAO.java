package Lanzadora.persistencia;

import java.util.ArrayList;
import java.util.List;

import org.bson.Document;
import org.springframework.stereotype.Repository;


import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoCursor;

import Lanzadora.Model.User;
import Lanzadora.Model.proyecto;

@Repository
public final class proyectoDAO {
	public static final String USUARIO = "users";
	public static final String PASSWORD = "password";
	public static final String NAME = "nombre";
	public static final String PROYECTO = "proyectos";

	private proyectoDAO() {
		super();
	}

	public static void insertar(proyecto proyecto) {
		Document document;
		long id = System.currentTimeMillis();
		MongoCollection<Document> coleccion;
		if (proyecto != null) {
			coleccion = AgenteDB.get().getBd(PROYECTO);
			document = new Document("Id", System.currentTimeMillis());
			
			document.append(NAME, proyecto.getNombre());
			document.append("descripcion", proyecto.getDescripcion());
			document.append("Autor", proyecto.getUser());
			document.append("dut", proyecto.getDUT());
			document.append("repeticiones", proyecto.getRepeticiones());
			document.append("lenguaje", proyecto.getLenguaje());
			document.append("fecha", proyecto.getFecha());
			document.append("estado", proyecto.getEstado());
			document.append("proyecto_enviado", proyecto.getProyecto_enviado());

			coleccion.insertOne(document);
			System.out.println("xx");
		}
	}

	public static List<proyecto> leer_proyectos(String nombre) {

		ArrayList<proyecto> proyectos = new ArrayList<>();
		Document document;
		proyecto p = null;
		MongoCollection<Document> coleccion = AgenteDB.get().getBd(PROYECTO);
		MongoCursor<Document> iter = coleccion.find().iterator();
		
		while ((iter.hasNext())) {
			document = iter.next();
			if(nombre.equals("admin")) {
				p = new proyecto(document.getDate("fecha"), document.getString(NAME), document.getString("descripcion"), document.getInteger("dut"), document.getInteger("repeticiones"),document.getString("lenguaje"),document.getString("Autor"), document.getString("estado"),document.getBoolean("proyecto_enviado"));
				proyectos.add(p);
			} else {
				if ((nombre).equals(document.getString("Autor"))) {
					p = new proyecto(document.getDate("fecha"), document.getString(NAME), document.getString("descripcion"), document.getInteger("dut"), document.getInteger("repeticiones"),document.getString("lenguaje"),document.getString("Autor"), document.getString("estado"),document.getBoolean("proyecto_enviado"));
					proyectos.add(p);
				
				}
			}
			

			
		}

		return proyectos;
	}

	public static void actualizar(String proyecto, String estado) {
		MongoCollection<Document> coleccion = AgenteDB.get().getBd(PROYECTO);
		 Document findDocument = new Document("nombre", proyecto);
		 
		// Create the document to specify the update
		    Document updateDocument = new Document("$set",
		        new Document("estado", estado));
		    coleccion.findOneAndUpdate(findDocument, updateDocument);
		
	}

	public static void modificar(String nombre, String new_nombre, String descripcion, int dut, int repeticiones, String lenguaje) {
		
		
		MongoCollection<Document> coleccion = AgenteDB.get().getBd(PROYECTO);
		 Document findDocument = new Document("nombre", nombre);
		//actualizamos descripcion
		 if (!descripcion.equals("")) {
		    Document updateDescripcion = new Document("$set",new Document("descripcion", descripcion));
		    coleccion.findOneAndUpdate(findDocument, updateDescripcion);
		 }
		 if (dut != 000) {
		    //dut
		    Document updateDut = new Document("$set",new Document("dut", dut));
		    coleccion.findOneAndUpdate(findDocument, updateDut);
		 }
		 if (repeticiones != 000) {
		  //repeticiones
		    Document updaterep = new Document("$set",new Document("repeticiones", repeticiones));
		    coleccion.findOneAndUpdate(findDocument, updaterep);
		 }
		 if (!lenguaje.equals("Elige...")) {
		  //lenguaje
		    Document updateLen = new Document("$set",new Document("lenguaje", lenguaje));
		    coleccion.findOneAndUpdate(findDocument, updateLen);
		 }
		 if (!new_nombre.equals("")) {
		  //nombre
		    Document updateName = new Document("$set",new Document("nombre", new_nombre));
		    coleccion.findOneAndUpdate(findDocument, updateName);
		 }
		  
		   // coleccion.findOneAndUpdate(findDocument, updateDocument);
		System.out.println("sdsds");
		
	}

	public static void proyecto_enviado(String nombre, boolean b) {
		System.out.println("xxx");
		MongoCollection<Document> coleccion = AgenteDB.get().getBd(PROYECTO);
		 Document findDocument = new Document("nombre", nombre);
		 
		 Document updateName = new Document("$set",new Document("proyecto_enviado", b));
		    coleccion.findOneAndUpdate(findDocument, updateName);
		
	}

	public static List<User> leer_usuarios() {
		ArrayList<User> usuarios = new ArrayList<>();
		Document document;
		User u= null;
		MongoCollection<Document> coleccion = AgenteDB.get().getBd(USUARIO);
		MongoCursor<Document> iter = coleccion.find().iterator();
		
		while ((iter.hasNext())) {
			document = iter.next();
			
			if (!"admin".equals(document.getString("name"))) {
				if(!document.getBoolean("validado")) {
					u = new User(document.getString("name"), document.getString("password"), document.getBoolean("validado"));
					usuarios.add(u);
				}
				
			
			}
					
		}

		return usuarios;
	}
}