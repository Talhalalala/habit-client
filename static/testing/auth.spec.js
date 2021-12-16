/**
 * @jest-environment jsdom
 */

 const fs = require("fs");
 const path = require("path");
 const { expect } = require("@jest/globals");
 const html = fs.readFileSync(path.resolve(__dirname, "../../index.html"), "utf8");
 
 global.fetch = require("jest-fetch-mock");
 let app;
 
 describe("auth", () => {
	beforeEach(() => {
		document.documentElement.innerHTML = html.toString();
		app = require("../js/auth.js");
	});

	afterEach(() => {
		fetch.resetMocks();
	}); 
    
    
    describe("requestLogin", () => {
		it("makes a fetch request", () => {
			app.requestLogin({});
			expect(fetch).toHaveBeenCalled();
		});
	

    describe("requestRegistration", () => {
		it("makes a fetch request", () => {
			app.requestRegistration(1);
			expect(fetch).toHaveBeenCalled(1);
		});
	}); 

    describe("login", () => {
        it("login directs to dashboard", () => {
        app.login();
        const user = document.querySelector("today");
        expect(user).toBeTruthy();

    });

    describe("logout" , () => {
        it("logs out the user", () => {
        app.logout();
        
 
    });
 });

    describe("currentUser", () => {
        it("checks the username", () => {
        app.currentUser();
        const username = document.querySelector("");
        expect(username).toBeTruthy();
        });

    });
});