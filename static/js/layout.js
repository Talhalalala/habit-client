const { logout, currentUser } = require("./auth");
const { renderLoginForm, renderRegisterForm, renderToday, renderNewHabit } = require("./content");

const nav = document.querySelector("nav");
const main = document.querySelector("main");

const publicRoutes = ["#login", "#register"];
const privateRoutes = ["#habits", "#new"];

window.addEventListener("hashchange", updateContent); //allows for multiple url pages to open (see updatemain function)

function updateNav() {
	nav.innerHTML = "";
	let links;
	let logoutBtn;
	if (currentUser()) {
		links = privateRoutes.map(createNavLink);
		logoutBtn = document.createElement("a");
		logoutBtn.setAttribute("class", "navLink");
		logoutBtn.textContent = "Logout";
		logoutBtn.onclick = logout;
		nav.appendChild(logoutBtn);
	} else {
		links = publicRoutes.map(createNavLink);
	}
	links.forEach(l => nav.insertBefore(l, logoutBtn));
}

function updateMain(path) {
	main.innerHTML = "";
	if (path) {
		switch (path) {
			case "#login":
				renderLoginForm();
				break;
			case "#register":
				renderRegisterForm();
				break;
			case "#habits":
				renderToday();
				break;
			case "#new":
				renderNewHabit();
				break;
			default:
				render404();
				break;
		}
	} else {
		window.location.hash = "#login";
	}
}

function createNavLink(route) {
	const link = document.createElement("a");
	link.setAttribute("class", "navLink");
	link.textContent = `${route[1].toUpperCase()}${route.substring(2)}`;
	link.href = route;
	return link;
}

function updateContent() {
	const path = window.location.hash;
	if (privateRoutes.includes(path) && !currentUser()) {
		window.location.hash = "#login";
	} else if (!privateRoutes.includes(path) && currentUser()) {
		window.location.hash = "#habits";
	} else {
		updateNav();
		updateMain(path);
	}
}

updateContent();

module.exports = { updateNav, updateMain, createNavLink, updateContent };
