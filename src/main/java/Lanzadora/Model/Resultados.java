package Lanzadora.Model;

import org.json.JSONObject;

public class Resultados {

	private Double Time[] = new Double [10];
	private Double HDD[] = new Double [10];
	private Double Graphs[] = new Double [10];
	private Double Procesador[] = new Double [10];
	private Double Monitror[] = new Double [10];
	private Double DUT[] = new Double [10];
	
	
	public Resultados() {
		
	}
	public Double[] getTime() {
		return Time;
	}
	public void setTime(Double[] time) {
		Time = time;
	}
	public Double[] getHDD() {
		return HDD;
	}
	public void setHDD(Double[] hDD) {
		HDD = hDD;
	}
	public Double[] getGraphs() {
		return Graphs;
	}
	public void setGraphs(Double[] grahps) {
		Graphs = grahps;
	}
	public Double[] getProcesador() {
		return Procesador;
	}
	public void setProcesador(Double[] procesador) {
		Procesador = procesador;
	}
	public Double[] getMonitror() {
		return Monitror;
	}
	public void setMonitror(Double[] monitror) {
		Monitror = monitror;
	}
	public Double[] getDUT() {
		return DUT;
	}
	public void setDUT(Double[] dUT) {
		DUT = dUT;
	}
	
	protected JSONObject toJSON() {
		JSONObject jso = new JSONObject();
		jso.put("Time", this.getTime());
		jso.put("HDD", this.getHDD());
		jso.put("Grafica", this.getGraphs());
		jso.put("Procesador", this.getProcesador());
		jso.put("Monitor", this.getMonitror());
		jso.put("DUT", this.getDUT());
		return jso;
	}
	
}
