const { logout } = require("./auth");

async function getHabits(id) {
	try {
		const options = {
			headers: new Headers({
				Authorization: localStorage.getItem("token")
			})
		};
		const response = await fetch(`https://habit-christmas-server.herokuapp.com/habitdata/homepage/${id}`, options); // get correct route to get names of all habits
		const data = await response.json();
		if (data.err) {
			console.warn(data.err);
			logout();
		}
		return data;
	} catch (err) {
		console.warn(err);
	}
}

async function updateHabit(e, habitData) {
	try {
		const bodyObject = Object.fromEntries(new FormData(e.target));
		bodyObject["habit_id"] = habitData.habit_id;
		// const userId = localStorage.getItem("userId");
		const options = {
			method: "POST",
			headers: new Headers({
				Authorization: localStorage.getItem("token"),
				"Content-Type": "application/json"
			}),
			body: JSON.stringify(bodyObject)
		};
		const response = await fetch("https://habit-christmas-server.herokuapp.com/habitdata/", options); //get route for updating the habit
		const data = await response.json();
		if (data.err) {
			console.warn(data.err);
		}
		return data;
	} catch (err) {
		console.warn(err);
	}
}

async function addHabit(e) {
	try {
		const bodyObject = Object.fromEntries(new FormData(e.target));
		bodyObject["user_id"] = localStorage.getItem("userId");
		const options = {
			method: "POST",
			headers: new Headers({
				Authorization: localStorage.getItem("token"),
				"Content-Type": "application/json"
			}),
			body: JSON.stringify(bodyObject)
		};
		const r = await fetch(`https://habit-christmas-server.herokuapp.com/habit/create`, options);
		const data = await r.json();
		if (data.err) {
			console.warn(data.err);
		}
		return data;
	} catch (err) {
		console.warn(err);
	}
}

async function removeHabit(id) {
	try {
		const options = {
			method: "DELETE",
			headers: new Headers({
				Authorization: localStorage.getItem("token"),
				"Content-Type": "application/json"
			})
		};
		await fetch(`https://habit-christmas-server.herokuapp.com/habit/${id}`, options);
	} catch (err) {
		console.warn(err);
	}
}

async function getHistory(id) {
	try {
		const options = {
			headers: new Headers({
				Authorization: localStorage.getItem("token")
			})
		};
		const response = await fetch(`https://habit-christmas-server.herokuapp.com/habitdata/all/${id}`, options); // get correct route to get names of all habits
		const data = await response.json();
		if (data.err) {
			console.warn(data.err);
			logout();
		}
		return data;
	} catch (err) {
		console.warn(err);
	}
}

module.exports = { getHabits, updateHabit, addHabit, removeHabit, getHistory };
