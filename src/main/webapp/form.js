var self;
function ViewModel() {
	self = this;
	var url = "ws://" + window.location.host + "/Gestion";
	self.sws = new WebSocket(url);


	self.crear = function() {	
		
		var descripcion = escapeHtml($('#descripcion').val());
		descripcion = stringEscape(descripcion);
		var nombre = escapeHtml($('#nombre').val());
		nombre = stringEscape(nombre);
		const info = {
			type: 'crear',
			nombre: nombre,
			usuario: sessionStorage.userName,
			repeticiones: $('#repeticiones').val(),
			descripcion: descripcion,
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
	
	function escapeHtml(text) {
		  var map = {
		    '&': '&amp;',
		    '<': '&lt;',
		    '>': '&gt;',
		    '"': '&quot;',
		    "'": '&#039;'
		  };
		  
		  return text.replace(/[&<>"']/g, function(m) { return map[m]; });
		}
	function stringEscape(s) {
	    return s ? s.replace(/\\/g,'\\\\').replace(/\n/g,'\\n').replace(/\t/g,'\\t').replace(/\v/g,'\\v').replace(/'/g,"\\'").replace(/"/g,'\\"').replace(/[\x00-\x1F\x80-\x9F]/g,hex) : s;
	    function hex(c) { var v = '0'+c.charCodeAt(0).toString(16); return '\\x'+v.substr(v.length-2); }
	}

}
var vm = new ViewModel();
ko.applyBindings(vm);