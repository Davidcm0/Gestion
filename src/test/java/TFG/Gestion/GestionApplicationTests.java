package TFG.Gestion;

import java.util.Optional;

import org.json.JSONObject;
import org.junit.Before;
import org.junit.runner.RunWith;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import Lanzadora.Model.Manager;
import Lanzadora.Model.User;
import junit.framework.TestCase;

/**
 * @author David Carretero
 *
 */
@RunWith(SpringRunner.class)
@SpringBootTest
class GestionApplicationTests extends TestCase {

	@Before
	public void setUp() {
		String name = "Nombre_prueba";
		String email = "correo@correo.com";
		String pass = "pass";
		Boolean validate = false;
		User usuario_prueba = new User(name, email, pass, validate);

	}

	@Test
	public void register() {
		try {

			User user = new User();
			String nombre = "David";
			String email = "David@gmail.com";
			String password = "efewrr";
			Manager.get().register(nombre, email, password);

			assertTrue(user.getName().equals(nombre));
			assertTrue(user.getEmail().equals(email));
			assertTrue(user.getPassword().equals(password));

		} catch (Exception e) {
			fail(e.getMessage());
		}
	}

	@Test
	public void validar_usuario() {
		try {
			String name = "Nombre_prueba";
			String email = "correo@correo.com";
			String pass = "pass";
			Boolean validate = false;
			User usuario_prueba = new User(name, email, pass, validate);
			assertTrue(!usuario_prueba.getValidado());
			Manager.get().validar_user(name);
			assertTrue(usuario_prueba.getValidado());
		} catch (Exception e) {
			fail(e.getMessage());
		}
	}

	@Test
	public void eliminar_user() {
		try {
			String name = "Nombre_prueba";
			String email = "correo@correo.com";
			String pass = "pass";
			Boolean validate = false;

			User usuario_prueba = new User(name, email, pass, validate);

			name = "Nombre_prueba2";
			email = "correo2@correo.com";
			pass = "pass2";
			validate = false;
			User usuario_prueba2 = new User(name, email, pass, validate);
			Manager.get().eliminar_users();
			JSONObject aux = Manager.get().leer_usuarios();
			boolean hayUsers = true;
			if (aux.length() == 0)
				hayUsers = false;
			assertFalse(hayUsers);
		} catch (Exception e) {
			fail(e.getMessage());
		}

	}
	
	@Test
	public void leer_usuarios() {
		try {
			JSONObject usuarios = new JSONObject();
			usuarios = Manager.get().leer_usuarios();
			boolean hayUsuarios = false;
			if(usuarios.length() > 0) {
				hayUsuarios = true;
			}
			assertTrue(hayUsuarios);
		} catch(Exception e) {
			fail(e.getMessage());
		}
		

	}
	
	@Test
	public void chequear_pass(){
		
		try {
			String name = "Nombre_prueba";
			String email = "correo@correo.com";
			String pass = "pass";
			Boolean validate = false;

			User usuario_prueba = new User(name, email, pass, validate);
			
			assertTrue(Manager.get().checkCredenciales(usuario_prueba, name, pass));
		}catch(Exception e) {
			fail(e.getMessage());
		}
		
	}
	
	@Test
	public void encriptar(){
		
		try {
			String name = "Nombre_prueba";
			String email = "correo@correo.com";
			String pass = "pass1234567890";
			Manager.get().register(name, email, pass);
			
			Boolean validate = false;

			User usuario_prueba = new User();
			
			assertFalse(pass.equals(usuario_prueba.getPassword()));
		}catch(Exception e) {
			fail(e.getMessage());
		}
		
	}

}
