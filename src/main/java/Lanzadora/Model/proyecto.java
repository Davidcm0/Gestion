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
	
	public proyecto(Date fecha, String nombre, String descripcion, int DUT, int repeticiones, String lenguaje, String user) {
		this.fecha = fecha;
		this.nombre = nombre;
		this.descripcion = descripcion;
		this.DUT = DUT;
		this.repeticiones = repeticiones;
		this.lenguaje = lenguaje;
		this.user = user;
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
	public JSONObject toJSON() {
		JSONObject jso = new JSONObject();
		jso.put("Fecha", this.getFecha());
		jso.put("Nombre", this.getNombre());
		jso.put("Descripcion", this.getDescripcion());
		jso.put("DUT", this.getDUT());
		jso.put("Repeticiones", this.getRepeticiones());
		jso.put("Lenguaje",this.getLenguaje());
		jso.put("Autor",this.getUser());
		return jso;
	}
	
}
