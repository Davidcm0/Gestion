let register = function() {
	if (contrasenaValida($('#pwd1').val())) {
		const info = {
			type: 'Register',
			userName: $('#username').val(),
			email: $('#email').val(),
			pwd: $('#pwd1').val(),
			pwd2: $('#pwd2').val(),
			rol: $('#rol').val()
		};
		const data = {
			data: JSON.stringify(info),
			url: 'register',
			type: 'post',
			contentType: 'application/json',
			success: function(){
				window.location.href = 'index.html';
			},
			error: function(response) {
				alert('REGISTER INCORRECTO');
			}
		};
		$.ajax(data);
	} else {
		alert('CONTRASENA NO VALIDA');
	}
};

function contrasenaValida(pwd) {

	if (pwd.length > 4 && tiene_numeros(pwd) && tiene_minuscula_y_mayuscula(pwd)) {
			document.getElementById("pwd1").style.backgroundColor = "green";
		return true;
	} else {
		document.getElementById("pwd1").style.backgroundColor = "red";
		return false;
	}


}

function tiene_numeros(texto) {
	let numeros = "0123456789";
	for (i = 0; i < texto.length; i++) {
		if (numeros.indexOf(texto.charAt(i), 0) !== -1) {
			return true;
		}
	}
	return false;
}

function tiene_minuscula_y_mayuscula(pwd) {
	let m = false;
	let M = false;
	for (i = 0; i < pwd.length; i++) {
		if (!esNumero(pwd.charAt(i)) && pwd.charAt(i) === pwd.charAt(i).toUpperCase()) {
			M = true;
		}
		if (!esNumero(pwd.charAt(i)) && pwd.charAt(i) === pwd.charAt(i).toLowerCase()) {
			m = true;
		}
	}


	return M && m;

}

function esNumero(digito) {
	let numeros = "0123456789";
	if (numeros.indexOf(digito, 0) !== -1) {
		return true;
	}
	return false;


}