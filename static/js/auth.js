async function requestLogin(e) {
	e.preventDefault();
	try {
		const options = {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(Object.fromEntries(new FormData(e.target)))
		};
		const r = await fetch(`https://habit-christmas-server.herokuapp.com/auth/login`, options);
		const data = await r.json();
		if (!data.success) {
			throw new Error("Login not authorised");
		}
		login(data.token);
	} catch (err) {
		console.warn(err);
	}
}

async function requestRegistration(e) {
	e.preventDefault();
	try {
		const password = document.querySelector("[name='password']").value;
		const passwordConfirm = document.querySelector("[name='passwordConfirmation']").value;
		if (password === passwordConfirm) {
			const options = {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(Object.fromEntries(new FormData(e.target)))
			};
			const r = await fetch(`https://habit-christmas-server.herokuapp.com/auth/register`, options);
			const data = await r.json();
			if (data.err) {
				throw Error(data.err);
			}
			requestLogin(e);
		} else {
			const main = document.querySelector("main");
			const message = document.createElement("p");
			message.textContent = "Please make sure the password and password comfirmation match";
			main.appendChild(message);
		}
	} catch (err) {
		console.warn(err);
	}
}

function login(token) {
	const user = jwt_decode(token);
	localStorage.setItem("token", token);
	localStorage.setItem("username", user.username);
	localStorage.setItem("userEmail", user.email);
	localStorage.setItem("userId", user.userId);
	window.location.hash = "#today";
}

function logout() {
	localStorage.clear();
	window.location.hash = "#login";
}

function currentUser() {
	const username = localStorage.getItem("username");
	return username;
}

module.exports = { requestLogin, requestRegistration, login, logout, currentUser };
