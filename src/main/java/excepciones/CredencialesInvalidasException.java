package excepciones;

/**
 * @author Equipo1
 *
 */
public class CredencialesInvalidasException extends Exception {

	public CredencialesInvalidasException() {
		// No se necesita hacer nada en el contructor
	}
	/**
	 * @return "Las contrasenas no coinciden"
	 */
	@Override
	public String getMessage() {
		return "Credenciales Invalidas";
	}

}
