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

// constants for error messages
/* Login error message: invalid email/password */
const loginErrorMsgHolder = document.getElementById("login-error-msg-holder");
const loginErrorMsg = document.getElementById("login-error-msg");

/* Register error message: Email already registered */
const registerErrorRegisteredHolder = document.getElementById("register-error-registered-holder");
const registerErrorMsgRegistered = document.getElementById("register-error-msg-registered");

/* Register error message: Must use SFSU emails */
const registerErrorSfsuEmailHolder = document.getElementById("register-error-sfsu-email-holder");
const registerErrorMsgSfsuEmail = document.getElementById("register-error-msg-sfsu-email");


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

	var fetchURL = '/login/';

	fetch(fetchURL, fetchOptions)
	.then((response) => {
		if(!response.ok) {
			//TODO: make form display responsive text that the username or password is incorrect
			loginErrorMsg.style.opacity = 1;
            loginErrorMsgHolder.style.display = "contents";
			throw new Error(response.status)
		}
		else{
		    loginErrorMsg.style.opacity = 0;
            loginErrorMsgHolder.style.display = "none";
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

	var fetchURL = '/register/';

	fetch(fetchURL, fetchOptions)
	.then((response) => {
		if(!response.ok) {
			//TODO: make the form display responsive text that the username is already registered
			registerErrorMsgRegistered.style.opacity = 1;
            registerErrorRegisteredHolder.style.display = "contents";
			throw new Error(response.status)
		}
		else{
		    registerErrorMsgRegistered.style.opacity = 0;
		    registerErrorRegisteredHolder.style.display = "none";
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
		registerErrorMsgSfsuEmail.style.opacity = 1;
        registerErrorSfsuEmailHolder.style.display = "contents";
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
