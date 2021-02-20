package Lanzadora.persistencia;

import org.bson.Document;
import org.springframework.stereotype.Repository;

import com.mongodb.client.MongoCollection;

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
			
			document.append(NAME, proyecto.getUser());
			document.append("descripcion", proyecto.getDescripcion());
			document.append("dut", proyecto.getDUT());
			document.append("repeticiones", proyecto.getRepeticiones());
			document.append("lenguaje", proyecto.getLenguaje());
			document.append("fecha", proyecto.getFecha());

			coleccion.insertOne(document);
			System.out.println("xx");
		}
	}
}