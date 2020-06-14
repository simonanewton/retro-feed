$(document).ready(() => {
	$("form.signup").submit((event) => {
		// prevent page refresh
		event.preventDefault();
		
		// create an object to collect user data
		let newUser = {
			email: $("input#email-input").val().trim(),
			username: $("input#username-input").val().trim(),
			displayName: $("input#display-name-input").val().trim(),
			password: $("input#password-input").val().trim(),
			};

		// if any of the fields have been left blank, exit function
		if (!newUser.email || !newUser.username || !newUser.displayName || !newUser.password) {
			$("#signup-alert").show();
			$("#error-message").text("No fields can be blank.");
			// $("#alert").fadeIn(500);
			return;
		};

		// otherwise, run the signUpUser function
		signUpUser(newUser);
	});

	const signUpUser = async (newUser) => {
		try {
			// ajax post to the signup api with newUser
			await $.post("/api/signup", newUser);

			// hide any error alert
			$("#signup-alert").hide();

			// send the user to the posts page
			window.location.replace("/feed");
		}

		catch (err) {
			// display error to user
			displayError(err);
		}
	}

	const displayError = (err) => {
		// isolate message from err parameter
		const error = err.responseJSON.errors[0].message;
		let message;
		
		// determine message from error
		if (error.indexOf("Validation isEmail") != -1) message = "Invalid email address.";
		else if (error.indexOf("users.email") != -1) message = "Email already in use.";
		else if (error.indexOf("users.username") != -1) message = "Username already in use.";
		else {
			console.log(error);
			message = "Signup Error."
		}

		// alert the user of the error
		$("#signup-alert").show();
		$("#error-message").text(message);
	}
});
