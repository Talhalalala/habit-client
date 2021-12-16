/**
 * @jest-environment jsdom
 */

const fs = require("fs");
const path = require("path");
const { expect } = require("@jest/globals");
const html = fs.readFileSync(path.resolve(__dirname, "../../index.html"), "utf8");

global.fetch = require("jest-fetch-mock");
let app;
let auth;
let content;

describe("requests", () => {
	beforeEach(() => {
		document.documentElement.innerHTML = html.toString();
		app = require("../js/layout.js");
		content = require("../js/content");
		auth = require("../js/auth");
	});

	afterEach(() => {
		fetch.resetMocks();
		localStorage.clear();
	});

	describe("updateNav", () => {
		it("is defined", () => {
			expect(app.updateNav).toBeDefined();
		});

		// it("creates a logout button if there is a user", () => {
		// 	const nav = document.createElement("nav");
		// 	const privateRoutes = [];
		// 	// const currentUser = jest.fn(() => "testuser");
		// 	jest.spyOn(auth, "currentUser").mockReturnValueOnce("testuser");
		// 	// localStorage.setItem("username", "testUsername");
		// 	app.updateNav();
		// 	expect(nav.children.length).toEqual(3);
		// 	// expect(currentUser).toHaveBeenCalled();
		// });
	});

	describe("updateMain", () => {
		it("is defined", () => {
			expect(app.updateMain).toBeDefined();
		});
		// it("renders login form", () => {
		// 	const renderLogin = jest.spyOn(content, "renderLoginForm");
		// 	app.updateMain("#login");
		// 	expect(renderLogin).toHaveBeenCalled();
		// });
	});

	describe("createNavLink", () => {
		it("creates a link", () => {
			expect(app.createNavLink("#test").textContent).toContain("Test");
		});
	});

	describe("updateContent", () => {
		it("is defined", () => {
			expect(app.updateContent).toBeDefined();
		});
	});
});
