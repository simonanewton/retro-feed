$(document).ready(() => {
	$("form.login").submit((event) => {
		// prevent page refresh
		event.preventDefault();

		// create an object to collect user data
		let userData = {
			email: $("input#email-input").val().trim(),
			password: $("input#password-input").val().trim()
		};

		// if either of the fields have been left blank, exit function
		if (!userData.email || !userData.password) return;

		// otherwise, run the loginUser function
		loginUser(userData);
	});

	const loginUser = async (userData) => {
		try {
			// ajax post to the login api with userData
			await $.post("/api/login", userData);

			// console.log success
			console.log("Login success!");

			// if successful, send the user to the posts page
			window.location.replace("/posts");
		}

		catch (err) {
			// console.log error
			console.log("Login error!");

			// throw the caught error
			throw err;
		}
	}
});
