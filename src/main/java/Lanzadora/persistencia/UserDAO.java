package Lanzadora.persistencia;

import java.util.ArrayList;
import java.util.List;
import org.bson.Document;
import org.springframework.stereotype.Repository;

import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoCursor;

import Lanzadora.Model.User;

@Repository
public final class UserDAO {
	public static final String USUARIO = "users";
	public static final String PASSWORD = "password";
	public static final String NAME = "name";
	public static final String VALIDADO = "validado";


	private UserDAO() {
		super();
	}
	
	public static User findUser(String name) {
		for(User u : UserDAO.leerUsers()) {
			if(name.equals(u.getName())) {
				return u;
			}
		}
		return null;
	}

	public static List<User> leerUsers() {
		ArrayList<User> usuarios = new ArrayList<>();
		Document document;
		User u;
		MongoCollection<Document> coleccion = AgenteDB.get().getBd(USUARIO);
		MongoCursor<Document> iter = coleccion.find().iterator();

		while ((iter.hasNext())) {
			document = iter.next();
			
				u = new User(document.getString(NAME), document.getString(PASSWORD),document.getString("email"), document.getBoolean("validado"));
		
				//u = new Asistente(document.getString(NAME), document.getString(EMAIL), document.getString(PASSWORD));
				
			
			

			usuarios.add(u);
		}

		return usuarios;
	}

	

	public static void insertar(User user) {
		Document document;
		MongoCollection<Document> coleccion;
		if (user != null) {
			coleccion = AgenteDB.get().getBd(USUARIO);
			document = new Document(NAME, user.getName());
	
			document.append(PASSWORD, user.getPassword());
			document.append("email", user.getEmail());
			document.append(VALIDADO, user.getValidado());
			
			coleccion.insertOne(document);
		}
	}

	public static void eliminar(User user) {
		Document document;
		MongoCollection<Document> coleccion;

		if (user != null) {
			coleccion = AgenteDB.get().getBd(USUARIO);
			document = new Document("name", user.getName());
			coleccion.findOneAndDelete(document);
		}
	}
	
	public static void modificar(User u) {
		//Mismo metodo para modificar usuario tanto para Asistente como para Admin
			UserDAO.eliminar(u);
			UserDAO.insertar(u);
	}

	public static void validar(String usuario) {
		MongoCollection<Document> coleccion = AgenteDB.get().getBd(USUARIO);
		 Document findDocument = new Document("name", usuario);
		 
		// Create the document to specify the update
		    Document updateDocument = new Document("$set",
		        new Document("validado", true));
		    coleccion.findOneAndUpdate(findDocument, updateDocument);
		
	}

	public static void eliminarAll() {
		ArrayList<User> usuarios = (ArrayList<User>) leerUsers();
		Document document;
		MongoCollection<Document> coleccion;
		coleccion = AgenteDB.get().getBd(USUARIO);
		
		for(User usuario: usuarios) {
			if(!usuario.getValidado()) {
				document = new Document("name", usuario.getName());
				coleccion.findOneAndDelete(document);
			}
		}
		
	}

}
