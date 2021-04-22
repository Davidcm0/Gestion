package TFG.Gestion;


import java.util.List;
import java.util.Optional;

import org.json.JSONObject;
import org.junit.Before;
import org.junit.runner.RunWith;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import Lanzadora.Model.Manager;
import Lanzadora.Model.User;
import Lanzadora.Model.proyecto;
import Lanzadora.persistencia.proyectoDAO;
import junit.framework.TestCase;

/**
 * @author David Carretero
 *
 */
@RunWith(SpringRunner.class)
@SpringBootTest
public class proyectos extends TestCase{
	
	@Before
	public void setUp() {
		String name = "Nombre_prueba";
		String email = "correo@correo.com";
		String pass = "pass";
		Boolean validate = false;
		User usuario_prueba = new User(name, email, pass, validate);

	}
	
	@Test
	public void leer_proyectos() {
		try {
			Boolean hay = false;
			JSONObject proyectos = Manager.get().leer_proyectos("Nacho1");
			if(proyectos.length() > 0) {
				hay = true;
			}
			assertTrue(hay);
		}catch(Exception e) {
			fail(e.getMessage());
		}
		
	}
	
	@Test
	public void crear_proyecto() {
		try {
			JSONObject proyectos = Manager.get().leer_proyectos("Nacho1");
			int cantidad_proyectos = proyectos.length();
			Manager.get().crearProyecto("nombre", 2, "lenguaje", "descripcion", 1, "usuario");
			proyectos = Manager.get().leer_proyectos("Nacho1");
			int cantidad_proyectos2 = proyectos.length();
			assertTrue(cantidad_proyectos2 > cantidad_proyectos);
		}catch(Exception e) {
			fail(e.getMessage());
		}
	}
	
	@Test
	public void modificar_proyecto() {
		try {
			boolean lo_hace = false;
			Manager.get().modificarUsuario("sinPatron", "new_nombre", "descripcion", 1, 2, "lenguaje");
			List<proyecto> proyectos = proyectoDAO.leer_proyectos("Nacho1");
			for (proyecto proyecto : proyectos) {
				if(proyecto.getNombre().equals("new_nombre")) {
					lo_hace = true;
				}
				
			}
			assertTrue(lo_hace);
		}catch(Exception e) {
			fail(e.getMessage());
		}
	}
	

}
