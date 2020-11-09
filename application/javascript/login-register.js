window.onload = function() {
	var loginButton = document.getElementById('login-form-submit');
	var registerButton = document.getElementById('register-form-submit');

	if (loginButton != null) {
		loginButton.addEventListener('click', (e) => {
			e.preventDefault();
			handleLogin();
		});
	}
	if (registerButton != null) {
		registerButton.addEventListener('click', (e) => {
			e.preventDefault();
			handleRegister();
		});
	}
}

async function handleLogin() {
	var form = document.getElementById('login-form');
	let info = {
		email: form.querySelector('input[name="username"]').value,
		password: form.querySelector('input[name="password"]').value
	}

	var fetchOptions = {
		method: "POST",
		headers: {
      	'Content-Type': 'application/x-www-form-urlencoded',
    	},
		body: new URLSearchParams(new FormData(form)).toString(),
	}

	var fetchUrl = '/login/';

	fetch(fetchUrl, fetchOptions)
	.then((response) => {
		if(!response.ok) {
			//TODO: make form display responsive text that the username or password is incorrect
			throw new Error(response.status)
		}
		else{
			return response.json();
		}
	})
	.then((dataJson) => {
		console.log(dataJson);

		let loggedInUser = {
			email: info.email,
			authToken: dataJson.access_token
		};

		localStorage.setItem( 'loggedInUser', JSON.stringify(loggedInUser) );

		//TODO: change login button to button that takes the user to their dashboard
		// now that they're signed in

	})
	.catch((err) => {
      console.log(err);
   })
}

async function handleRegister() {
	let info = getRegisterInfo();
	if(!validateRegisterInfo(info.email, info.password, info.password2)){
		return;
	}

	var form = document.getElementById('register-form');

	var fetchOptions = {
		method: "POST",
		headers: {
      	'Content-Type': 'application/x-www-form-urlencoded',
    	},
		body: new URLSearchParams(new FormData(form)).toString(),
	}

	var fetchUrl = '/register/';

	fetch(fetchUrl, fetchOptions)
	.then((response) => {
		if(!response.ok) {
			//TODO: make the form display responsive text that the username is already registered
			throw new Error(response.status)
		}
		else{
			return response.json();
		}

	})
	.then((dataJson) => {
		console.log(dataJson);
		window.location.replace('login.html');
	})
	.catch((err) => {
      console.log(err);
   })
}

function getRegisterInfo() {
	let form = document.getElementById('register-form');
	var signupInfo = {
		email: form.querySelector('input[name="username"]').value,
		password: form.querySelector('input[name="password"]').value,
		password2: form.querySelector('input[name="password2"]').value,
		firstName: form.querySelector('input[name="first-name"]').value,
		lastName: form.querySelector('input[name="last-name"]').value
	};
	return signupInfo;
}

function validateRegisterInfo(email, passwd, repasswd){
	let studentEmailRegEx = new RegExp(/^[A-Za-z0-9._%+-]+@mail.sfsu.edu$/);
	let facultyEmailRegEx = new RegExp(/^[A-Za-z0-9._%+-]+@sfsu.edu$/);

	if( !(studentEmailRegEx.test(email) || facultyEmailRegEx.test(email)) ){
		//TODO: make this show up on the form

		alert("Must use @sfsu.edu or @mail.sfsu.edu email");
		return false;
	}
	if(passwd !== repasswd){
		//TODO: make this show up on the form

		alert("The passwords given do not match");
		return false;
	}
	if(passwd.length < 6){
		//TODO: make this show up on the form

		alert("A password must be at least 6 characters");
		return false;
	}
	return true;
}
