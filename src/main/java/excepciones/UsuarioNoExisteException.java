package excepciones;

public class UsuarioNoExisteException extends Exception {
	public UsuarioNoExisteException() {
		// No se necesita hacer nada en el contructor
	}

	@Override
	public String getMessage() {
		return "El usuario no existe, crealo primero";
	}
}
