package Lanzadora.ws;

import org.json.JSONObject;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import Lanzadora.Model.Manager;

@Component
public class SpringWebSocket extends TextWebSocketHandler {

	private static final String NOMBRE = "nombre";
	private static final String TYPE = "type";
	private static final String VISTA = "vista";
	private static final String URL = "direccion";
	private static final String LENGUAJE = "lenguaje";
	private static final String DUT = "dut";
	private static final String REPETICIONES = "repeticiones";
	private static final String DESCRIPCION = "descripcion";
	private static final String USUARIO = "usuario";

	@Override
	public void afterConnectionEstablished(WebSocketSession session) throws Exception {
		Manager.get().setSession(session);
	}

	@Override
	public void handleMessage(WebSocketSession session, WebSocketMessage<?> message) throws Exception {
		JSONObject jso = new JSONObject(message.getPayload().toString());
		switch (jso.getString(TYPE)) {
		case "ready":
			if (jso.getString("vista").equals("validar")) {
				session.sendMessage(new TextMessage(Manager.get().leer_usuarios().toString()));
			} else {
				session.sendMessage(new TextMessage(Manager.get().leer_proyectos(jso.getString(NOMBRE)).toString()));
			}

			// Manager.get().leer_proyectos(jso.getString(NOMBRE));
			break;

		case "sendProyecto":
			Manager.get().sendProyecto(jso.getString("nombre"));
			break;

		case "explorador":
			Manager.get().explorador();
			break;

		case "crear":
			Manager.get().crearProyecto(jso.getString(NOMBRE), jso.getInt(REPETICIONES), jso.getString(LENGUAJE),
					jso.getString(DESCRIPCION), jso.getInt(DUT), jso.getString(USUARIO));
			break;

		case "terminar":
			String terminar = "Terminado";
			Manager.get().actualizar_estado(jso.getString("proyecto"), terminar,"","");
			break;

		case "resultados":
			session.sendMessage(new TextMessage(
					Manager.get().resultados(jso.getString("proyecto"), jso.getString("usuario")).toString()));

			break;

		case "register":
			Manager.get().register((String) jso.get(NOMBRE), jso.getString("email"), jso.getString("pwd1"));
			break;

		case "info":
			session.sendMessage(new TextMessage(Manager.get().leer_proyectos(jso.getString("user")).toString()));
			break;

		case "modificar":

			Manager.get().modificarUsuario(jso.getString(NOMBRE), jso.getString("new_nombre"),
					jso.getString("descripcion"), jso.getInt("dut"), jso.getInt("repeticiones"),
					jso.getString("lenguaje"));
			break;

		case "estado":
			Manager.get().actualizar_estado(jso.getString("proyecto"), jso.getString("estado"), jso.getString("url"), jso.getString("password"));
			break;

		case "validacion":
			Manager.get().validar_user(jso.getString(NOMBRE));

			break;

		case "eliminar":
			Manager.get().eliminar_users();

			break;

		case "excel":

			Manager.get().hacer_excel();
			break;

		case "comparar":
			session.sendMessage(new TextMessage( Manager.get().comparar(jso.get("proyectos"), jso.getString("usuario")).toString()));
			
			break;
		/*
		 * default: break;
		 */
		}
	}
}
