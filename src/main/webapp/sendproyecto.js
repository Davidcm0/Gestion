var self;
function ViewModel() {
	self = this;
	self.listaproyectos = ko.observableArray([]);
	self.nombreProyecto = ko.observable('');
	self.user = ko.observable('');
	this.usuario = sessionStorage.userName;
	var url = "ws://" + window.location.host + "/Gestion";
	self.sws = new WebSocket(url);
	
	self.sws.onopen = function(event) {
		self.user(sessionStorage.userName);
		var msg = {
			type: "ready",
			nombre: sessionStorage.userName,
			vista: "gestionUsuarios",
			
		};
		self.sws.send(JSON.stringify(msg));
	};
	
	self.sws.onmessage = function(event) {


		var data = event.data;
		data = JSON.parse(data);
		var proyectos = data.proyectos;


		for (var i = 0; i < proyectos.length; i++) {
			var proyecto = proyectos[i];
				self.listaproyectos.push(new Proyecto(proyecto.Nombre, proyecto.Descripcion, proyecto.Autor, proyecto.Fecha, proyecto.DUT, proyecto.Repeticiones, proyecto.Lenguaje, proyecto.estado, proyecto.proyecto_enviado));
			
			

		}
		
		for (var j = 0; j < proyectos.length; j++) {
			var proyecto = proyectos[j];
			if (proyecto.Nombre === self.nombreProyecto()) {

				document.getElementById('nombreProyecto').placeholder = proyecto.Nombre;

			}
		}
		document.getElementsByTagName('h1')[0].innerText = sessionStorage.userName;

	}


	self.enviar = function() {	
		
		const info = {
			type: 'sendProyecto',
			usuario: sessionStorage.userName,
			success: function() {
				alert('Se ha enviar correctamente');
			},
			error: function() {

				alert('Se ha creado incorrectamente');
			}
		};
		self.sws.send(JSON.stringify(info));
	};
	
	self.explorador = function(){
		const info ={
				type: 'explorador',
		};
		self.sws.send(JSON.stringify(info));
	};
	
	self.modificar = function() {
		var dut;
		var repeticiones;
		
		if(document.getElementById("dut").value === ""){
			dut = 000;
		} else{
			dut =  document.getElementById("dut").value;
		}
		
		if(document.getElementById("repeticiones").value === ""){
			repeticiones = 000;
		} else{
			repeticiones =  document.getElementById("repeticiones").value;
		}

		var p = {
			type: "modificar",
			nombre: self.nombreProyecto(),
			new_nombre: document.getElementById("nombreProyecto").value,
			descripcion: document.getElementById("descripcion").value,
			dut: dut,
			repeticiones: repeticiones,
			lenguaje: document.getElementById("lenguaje").options[document.getElementById("lenguaje").selectedIndex].text,
			success: function() {
				location.reload();
			}
		};
		
		self.sws.send(JSON.stringify(p));
		location.reload();
	}
	
	class Proyecto {
		constructor (nombre, descripcion, autor, fecha, dut, repeticiones, lenguaje, estado, proyecto_enviado) {
			this.nombre = nombre;
			this.descripcion = descripcion;
			this.autor = autor;
			this.fecha = fecha;
			this.dut = dut;
			this.repeticiones = repeticiones;
			this.lenguaje = lenguaje;
			this.estado = estado;
			this.proyecto_enviado = proyecto_enviado;
		}
		
		info() {
			self.nombreProyecto(this.nombre);
			var p = {
				type: "info",
				nombre: this.nombre,
				user:sessionStorage.userName
				
			};
			
			self.sws.send(JSON.stringify(p));

		}
		
		terminar() {
			var p = {
				type: "terminar",
				proyecto: this.nombre
			};
			
			self.sws.send(JSON.stringify(p));

		}

		resultados(){
			var p = {
				type: 'resultados',
				proyecto: this.nombre

			};
			self.nombreUsuario(this.name);
			self.sws.send(JSON.stringify(p));
		}

		enviar() {	
			
			const info = {
				type: 'sendProyecto',
				usuario: sessionStorage.userName,
				nombre: this.nombre,
				success: function() {
					alert('Se ha enviar correctamente');
				},
				error: function() {

					alert('Se ha creado incorrectamente');
				}
			};
			self.sws.send(JSON.stringify(info));
		};

	}

}
var vm = new ViewModel();
ko.applyBindings(vm);
