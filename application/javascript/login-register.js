// constants for error messages
/* Login error message: invalid email/password */
const loginErrorMsgHolder = document.getElementById("login-error-msg-holder");
const loginErrorMsg = document.getElementById("login-error-msg");

/* Register error message: Email already registered */
const registerErrorRegisteredHolder = document.getElementById("register-error-registered-holder");
const registerErrorMsgRegistered = document.getElementById("register-error-msg-registered");

/* Register error message: Must use SFSU emails */
// const registerErrorSfsuEmailHolder = document.getElementById("register-error-sfsu-email-holder");
// const registerErrorMsgSfsuEmail = document.getElementById("register-error-msg-sfsu-email");

/* Register error message: Passwords do no match */
const registerErrorPasswordMismatchHolder = document.getElementById("register-error-password-mismatch-holder");
const registerErrorMsgPasswordMismatch = document.getElementById("register-error-msg-password-mismatch");

function loginOnClick(e) {
	e.preventDefault();
	handleLogin();
}
function registerOnClick(e) {
	e.preventDefault();
	handleRegister();
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

	var fetchURL = '/login/';

	fetch(fetchURL, fetchOptions)
	.then((response) => {
		if(!response.ok) {
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

		window.location.href='/';

	})
	.catch((err) => {
      console.log(err);
   })
}

async function handleRegister() {
	let info = getRegisterInfo();
	if(!validateRegisterInfo(info.email, info.password, info.password2, info.checkbox)){
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
		alert("Successfully registered. You may Login now!");
	})
	.catch((err) => {
      console.log(err);
   })
}

function getRegisterInfo() {
	let form = document.getElementById('register-form');
	var registerInfo = {
		email: form.querySelector('input[name="username"]').value,
		password: form.querySelector('input[name="password"]').value,
		password2: form.querySelector('input[name="password2"]').value,
		checkbox: form.querySelector('input[name="checkboxTOS"]').value // add to registration validation
	};
	return registerInfo;
}

function validateRegisterInfo(email, passwd, repasswd, checkbox){
	let studentEmailRegEx = new RegExp(/^[A-Za-z0-9._%+-]+@mail.sfsu.edu$/);
	let facultyEmailRegEx = new RegExp(/^[A-Za-z0-9._%+-]+@sfsu.edu$/);

	var checkboxValue = document.getElementById("checkboxTOS").checked;

	if( !(studentEmailRegEx.test(email) || facultyEmailRegEx.test(email)) ){
		registerErrorMsgSfsuEmail.style.opacity = 1;
        registerErrorSfsuEmailHolder.style.display = "contents";
		alert("Must use @sfsu.edu or @mail.sfsu.edu email");
		return false;
	}
	if(passwd !== repasswd){
        // done in function checkPassword()
		alert("The passwords given do not match");
		return false;
	}
	if(passwd.length < 6){
		// done in function checkPassword()
		alert("A password must be at least 6 characters");
		return false;
	}
	// add checkbox to validation
	if(checkbox != "true") {
	    alert("Please agree to the terms of service");
	    return false;
	}

	return true;
}

// added password length check
// checks if both password fields are equal
function checkPassword() {
    const pwCheck = document.getElementById("div-check-pw-match");
    const pwMinCheck = document.getElementById("div-check-pw-min-characters")
    var password = $("#register-password-field").val();
    var confirmPassword = $("#retype-password-field").val();

    if (password.length < 6) {
        pwMinCheck.style.opacity = 1;
        pwMinCheck.style.display = "block";
        $("#div-check-pw-min-characters").html("Password must be at least 6 characters");
    }
    else {
        pwMinCheck.style.opacity = 0;
        pwMinCheck.style.display = "none";
        $("#div-check-pw-match").html("");
    }

    if (confirmPassword == "") {
        pwCheck.style.opacity = 0;
        pwCheck.style.display = "none";
        $("#div-check-pw-match").html("");
    }
    else if (password != confirmPassword) {
        pwCheck.style.opacity = 1;
        pwCheck.style.display = "block";
        pwCheck.style.background = "#e58f8f";
        pwCheck.style.color = "#8a0000";
        pwCheck.style.border = "1px solid #8a0000";
        $("#div-check-pw-match").html("Passwords do not match!");
    }
    else {
        pwCheck.style.opacity = 1;
        pwCheck.style.display = "block";
        pwCheck.style.background = "#19cf1c";
        pwCheck.style.color = "#072e08";
        pwCheck.style.border = "1px solid #072e08";
        $("#div-check-pw-match").html("Passwords match");

    }
}


// check for valid email
function checkValidEmail(inputId) {
    let studentEmailRegEx = new RegExp(/^[A-Za-z0-9._%+-]+@mail.sfsu.edu$/, 'i');
    let facultyEmailRegEx = new RegExp(/^[A-Za-z0-9._%+-]+@sfsu.edu$/, 'i');

    if(inputId == 'register-username-field') {
        var email = document.getElementById('register-username-field').value;
        var errorBox = document.getElementById('div-check-valid-email-register');

    }
    else if(inputId == 'login-username-field') {
        var email = document.getElementById('login-username-field').value;
        var errorBox = document.getElementById('div-check-valid-email-login');
    }

    var studentFound = email.match(studentEmailRegEx);
    var facultyFound = email.match(facultyEmailRegEx);

    //console.log(email);
    //console.log(studentFound);
    if(!studentFound && !facultyFound) {
        errorBox.style.opacity = 1;
	errorBox.style.display = "block";
	errorBox.innerHTML = "Domain must be '@mail.sfsu.edu' or '@sfsu.edu'";
    }
    else {
        errorBox.style.opacity = 0;
	errorBox.style.display = "none";
        errorBox.innerHTML = "";
    }
}

$(document).ready(function () {
   $("#register-password-field, #retype-password-field").keyup(checkPassword);
});
