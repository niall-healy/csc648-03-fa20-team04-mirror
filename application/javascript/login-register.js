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
	.then((data) => {
		return data.json();
	})
	.then((dataJson) => {
		console.log(dataJson);

		let loggedInUser = {
			email: info.email,
			authToken: dataJson.access_token
		};

		localStorage.setItem( 'loggedInUser', JSON.stringify(loggedInUser) );
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
	.then((data) => {
		return data.json();
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
		alert("Must use @sfsu.edu or @mail.sfsu.edu email");
		return false;
	}
	if(passwd !== repasswd){
		alert("The passwords given do not match");
		return false;
	}
	if(passwd.length < 6){
		alert("A password must be at least 6 characters");
		return false;
	}
	return true;
}
