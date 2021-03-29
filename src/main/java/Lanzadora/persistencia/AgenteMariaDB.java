package Lanzadora.persistencia;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

public class AgenteMariaDB {

	private String consulta;
	private static AgenteMariaDB agentemaria;
	private static Connection connection;
	private static Statement s = null;
	
	private static boolean getInstance = false;
	// assumes the current class is called MyLogger

	private AgenteMariaDB() {
		getInstance = true;
		
		try {
			connection = DriverManager
					.getConnection("jdbc:mariadb://172.20.48.59:3306/elliotdb?user=david&password=greenTFG#");
			 s = connection.createStatement();
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		

		

	}

	public static AgenteMariaDB getMariaDB() {
		if (!getInstance) {
			 
			agentemaria = new AgenteMariaDB();
			 }
		
			 return agentemaria;
	}
	
	public static ResultSet hacer_consulta(String nombre_caso) {
		//aqui se haría el cambio
		String[] parts = nombre_caso.split("_");
		String consulta = "select d.* from testcase t, testcasereport r, testcasereport_data d where t.name = \"" + parts[0]  +"\" and t._id = r.TestCase_id and r._id = d.TestCaseReport_id";
		//String consulta = "select d.* from testcase t, testcasereport r, testcasereport_data d where t.name = \"Fasta2\" and t._id = r.TestCase_id and r._id = d.TestCaseReport_id";
		ResultSet rs = null;
		try {
			rs = s.executeQuery(
					consulta);
			System.out.println("xdxdxd");
			//rs = s.executeQuery(
			//		"select d.* from testcase t, testcasereport r, testcasereport_data d where t.name = \" "+ nombre_caso +"\" and t._id = r.TestCase_id and r._id = d.TestCaseReport_id");
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		return rs;
		
	}
	

}
