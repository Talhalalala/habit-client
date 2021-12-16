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
		app = require("../js/requests.js");
	});

	afterEach(() => {
		fetch.resetMocks();
	});

	describe("getHabits", () => {
		it("makes a fetch request", () => {
			app.getHabits(1);
			expect(fetch).toHaveBeenCalledTimes(1);
		});
	});

	describe("getInfoAboutHabit", () => {
		it("makes a fetch request", () => {
			app.getInfoAboutHabit(1, 1);
			expect(fetch).toHaveBeenCalledTimes(1);
		});
	});

	describe("updateHabit", () => {
		it("makes a fetch request", () => {
			const link = document.createElement("a");
			link.addEventListener("click", app.updateHabit);
			link.click();
			expect(fetch).toHaveBeenCalledTimes(1);
		});
	});

	describe("addHabit", () => {
		it("makes a fetch request", () => {
			const form = document.createElement("form");
			form.addEventListener("submit", app.addHabit);
			form.submit();
			expect(fetch).toHaveBeenCalledTimes(1);
		});
	});
});
