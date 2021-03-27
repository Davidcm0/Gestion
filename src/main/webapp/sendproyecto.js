var self;
function ViewModel() {
	self = this;
	self.listaproyectos = ko.observableArray([]);
	self.proyectosSeleccionados = ko.observableArray([]);
	self.nombreProyecto = ko.observable('');
	self.user = ko.observable('');
	self.time = ko.observable('');
	
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
		var resultados = data.resultados;
		if(resultados != null){
			document.getElementById('timeMin').innerText = resultados[0].Time[0];
			document.getElementById('timeMax').innerText = resultados[0].Time[1];
			document.getElementById('timeMedia').innerText = resultados[0].Time[2];
			document.getElementById('timeQ1').innerText = resultados[0].Time[3];
			document.getElementById('timeQ3').innerText = resultados[0].Time[4];
			
			document.getElementById('HDDMin').innerText = resultados[0].HDD[0];
			document.getElementById('HDDMax').innerText = resultados[0].HDD[1];
			document.getElementById('HDDMedia').innerText = resultados[0].HDD[2];
			document.getElementById('HDDQ1').innerText = resultados[0].HDD[3];
			document.getElementById('HDDQ3').innerText = resultados[0].HDD[4];
			
			document.getElementById('GraphsMin').innerText = resultados[0].Grafica[0];
			document.getElementById('GraphsMax').innerText = resultados[0].Grafica[1];
			document.getElementById('GraphsMedia').innerText = resultados[0].Grafica[2];
			document.getElementById('GraphsQ1').innerText = resultados[0].Grafica[3];
			document.getElementById('GraphsQ3').innerText = resultados[0].Grafica[4];
			
			document.getElementById('ProcesadorMin').innerText = resultados[0].Procesador[0];
			document.getElementById('ProcesadorMax').innerText = resultados[0].Procesador[1];
			document.getElementById('ProcesadorMedia').innerText = resultados[0].Procesador[2];
			document.getElementById('ProcesadorQ1').innerText = resultados[0].Procesador[3];
			document.getElementById('ProcesadorQ3').innerText = resultados[0].Procesador[4];

			document.getElementById('MonitorMin').innerText = resultados[0].Monitor[0];
			document.getElementById('MonitorMax').innerText = resultados[0].Monitor[1];
			document.getElementById('MonitorMedia').innerText = resultados[0].Monitor[2];
			document.getElementById('MonitorQ1').innerText = resultados[0].Monitor[3];
			document.getElementById('MonitorQ3').innerText = resultados[0].Monitor[4];

			document.getElementById('DUTMin').innerText = resultados[0].DUT[0];
			document.getElementById('DUTMax').innerText = resultados[0].DUT[1];
			document.getElementById('DUTMedia').innerText = resultados[0].DUT[2];
			document.getElementById('DUTQ1').innerText = resultados[0].DUT[3];
			document.getElementById('DUTQ3').innerText = resultados[0].DUT[4];
			
			document.getElementById('Pro').innerText = self.nombreProyecto();
			//self.time(resultados[0].DUT[0]) ;
		}
		
		if(proyectos != null){
			for (var i = 0; i < proyectos.length; i++) {
				var proyecto = proyectos[i];
					self.listaproyectos.push(new Proyecto(proyecto.Nombre, proyecto.Descripcion, proyecto.Autor, proyecto.Fecha, proyecto.DUT, proyecto.Repeticiones, proyecto.Lenguaje, proyecto.estado, proyecto.proyecto_enviado));
				
				

			}
			
			for (var j = 0; j < proyectos.length; j++) {
				var proyecto = proyectos[j];
				if (proyecto.Nombre === self.nombreProyecto()) {
					if(sessionStorage.userName != "admin"){
						document.getElementById('nombreProyecto').placeholder = proyecto.Nombre;
					}
					
					document.getElementById('nombrepro').innerText = proyecto.Nombre;

				}
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
	
	self.excel = function() {
		const info ={
				type: 'excel',
				proyecto: self.nombreProyecto,
				usuario: sessionStorage.userName
		};
		self.sws.send(JSON.stringify(info));
	}
	
	self.compararPro = function() {
		for (var i = 0; i < self.listaproyectos().length; i++) {
			if (document.getElementsByClassName("form-check-input")[i].checked === true) {
				self.proyectosSeleccionados.push(document.getElementsByClassName("form-check-label")[i].innerHTML);
			}
		}
		
		const info ={
				type: 'comparar',
				proyectos: self.proyectosSeleccionados()
		};
		self.sws.send(JSON.stringify(info));
	}
	
	self.modificar = function() {
		var dut;
		var repeticiones;
		
		
		
		
		if(sessionStorage.userName != "admin"){
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
		} else{
			var p = {
					type: "estado",
					proyecto: self.nombreProyecto(),
					estado: document.getElementById("Estado").options[document.getElementById("Estado").selectedIndex].text,
					success: function() {
						location.reload();
					}
				};
		}
		
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
			
			self.nombreProyecto(this.nombre);
			var p = {
				type: 'resultados',
				proyecto: this.nombre,
				usuario:sessionStorage.userName

			};
			//self.nombreUsuario(this.name);
			self.sws.send(JSON.stringify(p));
		}
		
		estado_proyecto() {
			var matches = document.querySelectorAll('select');
			var p = {
				type: "estado",
				estado: document.getElementById("Estado").options[document.getElementById("Estado").selectedIndex].text,
				proyecto: this.nombre
			};
			
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
			location.reload();
		};

	}

}
var vm = new ViewModel();
ko.applyBindings(vm);
