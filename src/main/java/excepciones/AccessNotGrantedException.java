package excepciones;

/**
 * @author Equipo1
 *
 */
public class AccessNotGrantedException extends Exception {

	public AccessNotGrantedException() {
		// No se necesita hacer nada en el contructor
	}
	/**
	 * @return "Rol no permitido"
	 */
	@Override
	public String getMessage() {
		return "Acceso no permitido";
	}

}
