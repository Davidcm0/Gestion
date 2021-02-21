var self;
function ViewModel() {
	self = this;
	self.listaproyectos = ko.observableArray([]);
	self.nombreUsuario = ko.observable('');
	var url = "ws://" + window.location.host + "/Gestion";
	self.sws = new WebSocket(url);
	
	self.sws.onopen = function(event) {

		var msg = {
			type: "ready",
			nombre: sessionStorage.userName,
			vista: "gestionUsuarios"
		};
		self.sws.send(JSON.stringify(msg));
	};
	
	self.sws.onmessage = function(event) {


		var data = event.data;
		data = JSON.parse(data);
		var proyectos = data.proyectos;


		for (var i = 0; i < proyectos.length; i++) {
			var proyecto = proyectos[i];
				self.listaproyectos.push(new Proyecto(proyecto.Nombre, proyecto.Descripcion, proyecto.Autor, proyecto.Fecha, proyecto.DUT, proyecto.Repeticiones, proyecto.Lenguaje));
			
			

		}

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
	
	class Proyecto {
		constructor(nombre, descripcion, autor, fecha, dut, repeticiones, lenguaje) {
			this.nombre = nombre;
			this.descripcion = descripcion;
			this.autor = autor;
			this.fecha = fecha;
			this.dut = dut;
			this.repeticiones = repeticiones;
			this.lenguaje = lenguaje;
		}

	}

}
var vm = new ViewModel();
ko.applyBindings(vm);
