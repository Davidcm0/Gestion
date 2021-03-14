package Lanzadora.Model;

import org.json.JSONObject;

public class User {
	protected String name;
	protected String password;
	private Boolean validado;
	
	public User(String name, String password, Boolean validado) {

		this.name = name;
		this.password = password;
		this.validado = validado;

	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}
	
	public Boolean getValidado() {
		return validado;
	}

	public void setValidado(Boolean validado) {
		this.validado = validado;
	}

	protected JSONObject toJSON() {
		JSONObject jso = new JSONObject();
		jso.put("name", this.getName());
		jso.put("password", this.getPassword());
		jso.put("validado", this.getValidado());
		return jso;
	}
	
	
	
	

}
