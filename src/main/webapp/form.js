var self;
function ViewModel() {
	self = this;
	var url = "ws://" + window.location.host + "/Gestion";
	self.sws = new WebSocket(url);


	self.crear = function() {	
		
		const info = {
			type: 'crear',
			nombre: $('#nombre').val(),
			usuario: sessionStorage.userName,
			repeticiones: $('#repeticiones').val(),
			descripcion: $('#descripcion').val(),
			dut: $('#dut').val(),
			lenguaje: document.getElementById("lenguaje").options[document.getElementById("lenguaje").selectedIndex].text,
			success: function() {
				window.location.href = 'proyectos.html';
				alert('Se ha creado correctamente');
				
			},
			error: function() {
				
				alert('Se ha creado incorrectamente');
			}
		};
		self.sws.send(JSON.stringify(info));
		window.location.href = 'proyectos.html';
	};

}
var vm = new ViewModel();
ko.applyBindings(vm);