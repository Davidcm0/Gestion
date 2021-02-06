package excepciones;

/**
 * @author Equipo1
 *
 */
public class DiferentesContrasenasException extends Exception {

	public DiferentesContrasenasException() {
		// No se necesita hacer nada en el contructor
	}

	@Override
	public String getMessage() {
		return "Las contrasenas no coinciden";
	}

}
