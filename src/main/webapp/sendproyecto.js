var self;
function ViewModel() {
	self = this;
	var url = "ws://" + window.location.host + "/Gestion";
	self.sws = new WebSocket(url);


	self.enviar = function() {	
		
		const info = {
			type: 'sendProyecto',
			direccion: $('#direccion').val(),
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

}
var vm = new ViewModel();
ko.applyBindings(vm);
