package Lanzadora.Model;

import java.util.Collection;
import java.util.Date;

import org.json.JSONObject;

public class proyecto {

	private Date fecha;
	private String descripcion;
	private int DUT;
	private int repeticiones;
	private String lenguaje;
	private String user;
	private String nombre;
	private String estado;
	private Boolean proyecto_enviado;

	

	public proyecto(Date fecha, String nombre, String descripcion, int DUT, int repeticiones, String lenguaje,
			String user, String estado, boolean proyecto_enviado) {
		this.fecha = fecha;
		this.nombre = nombre;
		this.descripcion = descripcion;
		this.DUT = DUT;
		this.repeticiones = repeticiones;
		this.lenguaje = lenguaje;
		this.user = user;
		this.estado = estado;
		this.proyecto_enviado = proyecto_enviado;
	}

	public String getNombre() {
		return nombre;
	}

	public void setNombre(String nombre) {
		this.nombre = nombre;
	}

	public Date getFecha() {
		return fecha;
	}

	public void setFecha(Date fecha) {
		this.fecha = fecha;
	}

	public int getDUT() {
		return DUT;
	}

	public void setDUT(int dUT) {
		DUT = dUT;
	}

	public int getRepeticiones() {
		return repeticiones;
	}

	public void setRepeticiones(int repeticiones) {
		this.repeticiones = repeticiones;
	}

	public String getLenguaje() {
		return lenguaje;
	}

	public void setLenguaje(String lenguaje) {
		this.lenguaje = lenguaje;
	}

	public String getUser() {
		return user;
	}

	public void setUser(String user) {
		this.user = user;
	}

	public String getDescripcion() {
		return descripcion;
	}

	public void setDescripcion(String descripcion) {
		this.descripcion = descripcion;
	}

	public String getEstado() {
		return estado;
	}

	public void setEstado(String estado) {
		this.estado = estado;
	}
	
	public Boolean getProyecto_enviado() {
		return proyecto_enviado;
	}

	public void setProyecto_enviado(Boolean proyecto_enviado) {
		this.proyecto_enviado = proyecto_enviado;
	}

	public JSONObject toJSON() {
		JSONObject jso = new JSONObject();
		jso.put("Fecha", this.getFecha());
		jso.put("Nombre", this.getNombre());
		jso.put("Descripcion", this.getDescripcion());
		jso.put("DUT", this.getDUT());
		jso.put("Repeticiones", this.getRepeticiones());
		jso.put("Lenguaje", this.getLenguaje());
		jso.put("Autor", this.getUser());
		jso.put("estado", this.getEstado());
		jso.put("proyecto_enviado", this.getProyecto_enviado());
		return jso;
	}

}
