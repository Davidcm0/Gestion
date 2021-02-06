package Lanzadora.Model;

import org.json.JSONObject;

public class User {
	protected String name;
	protected String password;	
	
	public User(String name, String password) {

		this.name = name;
		this.password = password;

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
	
	protected JSONObject toJSON() {
		JSONObject jso = new JSONObject();
		jso.put("name", this.getName());
		jso.put("password", this.getPassword());
		return jso;
	}
	
	
	
	

}
