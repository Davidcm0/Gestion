

let login = function() {
	const info = {
		type: 'Login',
		userName: $('#username').val(),
		pwd: $('#password').val()
	};
	sessionStorage.userName = $('#username').val();
	const data = {
		data: JSON.stringify(info),
		url: 'login',
		type: 'post',
		contentType: 'application/json',
		success: function() {
			sessionStorage.userName = $('#username').val();
			window.location.href = "proyectos.html";
		},
		error: function(response) {
			alert('LOGIN INCORRECTO');
		}
	};
	$.ajax(data);
};