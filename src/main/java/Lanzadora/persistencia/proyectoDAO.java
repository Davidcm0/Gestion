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
			if ((nombre).equals(document.getString("Autor"))) {
				p = new proyecto(document.getDate("fecha"), document.getString(NAME), document.getString("descripcion"), document.getInteger("dut"), document.getInteger("repeticiones"),document.getString("lenguaje"),document.getString("Autor"));
			
			
			}

			proyectos.add(p);
		}

		return proyectos;
	}
}