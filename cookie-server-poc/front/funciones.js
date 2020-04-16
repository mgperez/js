$(document).ready(function(){
	
	$('#loginForm').submit(function(e){
		e.preventDefault()
		let username = $('#exampleInputEmail1').val()
		let password = $('#exampleInputPassword1').val()

		login({email: username, password: password})
	});

	const login = function(data) {
		//const url = 'http://localhost:3000/api/login'
		//const url = 'http://' + 'server:3000' + '/api/login'
		
		//Init backURI
		const backURI = process.env.BACK_URI;
		const url = 'http://' + backURI + '/api/login'
		$.post( url, data, function(response){
			console.log(response)
			location.href = '/dashboard.html'
		}, 'json').fail(function(error){
			console.log(error)
		});
	}

	$('#getDataBtn').click(function(){
		$.get( "http://localhost:4000/userData", function(response){
			console.log(response)
			alert('funciona!!!')
		}).fail(function(error){
			// console.log(error)
		});
	})

	$('#mostrar-cookies').click(function(){
		cookies = document.cookie
		$('.cookies').html(document.cookie)
	})


})
