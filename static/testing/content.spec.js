/**
 * @jest-environment jsdom
 */

const fs = require("fs");
const path = require("path");
const { expect } = require("@jest/globals");
const html = fs.readFileSync(path.resolve(__dirname, "../../index.html"), "utf8");

global.fetch = require("jest-fetch-mock");
let app;

describe("requests", () => {
	beforeEach(() => {
		document.documentElement.innerHTML = html.toString();
		app = require("../js/content.js");
	});

	afterEach(() => {
		fetch.resetMocks();
		localStorage.clear();
	});

	describe("renderLoginForm", () => {
		it("is defined", () => {
			expect(app.renderLoginForm).toBeDefined();
		});

		it("creates a login form", () => {
			app.renderLoginForm();
			const form = document.querySelector("#loginForm");
			expect(form).toBeTruthy();
		});
	});

	describe("renderRegisterForm", () => {
		it("is defined", () => {
			expect(app.renderRegisterForm).toBeDefined();
		});

		it("creates a register form", () => {
			app.renderRegisterForm();
			const form = document.querySelector("#registerForm");
			expect(form).toBeTruthy();
		});
	});

	describe("renderToday", () => {
		it("is defined", () => {
			expect(app.renderToday).toBeDefined();
		});

		// it("creates a habits section", () => {
		// 	localStorage.setItem("userId", "1");
		// 	app.renderToday();
		// 	const section = document.querySelector("#feed");
		// 	expect(section).toBeTruthy();
		// });
	});
});
