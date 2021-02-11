function comenzar(){
	
	zonadatos = document.getElementById("zonadatos");
	var archivos = document.getElementById("archivos");
	
	archivos.addEventListener("change", procesar, false);
	
}

function procesar(e){
	var archivos = e.target.files;
	
	var mi_archivo = archivos[0];
	var resultado = mi_archivo.name;
	zonadatos.innerHTML = resultado;
	var lector = new FileReader();
	
	lector.readAsBinaryString(mi_archivo);
	//lector.addEventListener("load", mostrar_en_web, false);
	
}

function mostrar_en_web(e){
	var resultado = e.target.result;
	
	zonadatos.innerHTML = resultado;
}
window.addEventListener("load", comenzar, false);

