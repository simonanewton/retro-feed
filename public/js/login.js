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

		// hide any error alert
		$("#login-alert").hide();

		// otherwise, run the loginUser function
		loginUser(userData);
	});

	const loginUser = async (userData) => {
		try {
			// ajax post to the login api with userData
			await $.post("/api/login", userData);

			// send the user to the posts page
			window.location.replace("/posts");
		}

		catch (err) {
			// display error to user
			displayError(err);
		}
	}

	const displayError = (err) => {
		// isolate message from err parameter
		const error = err.responseText;
		let message;

		// determine message from error
		if (error.indexOf("Unauthorized") != -1) message = "Invalid email address or password.";
		else message = "Login Error."

		// display the error to the user
		$("#login-alert").show();
		$("#error-message").text(message);
	}
});
