$(document).ready(() => {
	$("form.signup").submit((event) => {
		// prevent page refresh
		event.preventDefault();

		// create an object to collect user data
		let newUser = {
			email: $("input#email-input").val().trim(),
			username: $("input#username-input").val().trim(),
			displayName: $("input#display-name-input").val().trim(),
			password: $("input#password-input").val().trim()
		};

		// if any of the fields have been left blank, exit function
		if (!newUser.email || !newUser.username || !newUser.displayName || !newUser.password) {
			$("#alert .msg").text("Email, username, display name, and/or password cannot be blank.");
			$("#alert").fadeIn(500);
			return;
		};

		// otherwise, run the signUpUser function
		signUpUser(newUser);
	});

	const signUpUser = async (newUser) => {
		try {
			// ajax post to the signup api with newUser
			await $.post("/api/signup", newUser);

			// console.log success
			console.log("Signup success!");

			// if successful, send the user to the posts page
			window.location.replace("/posts");
		}

		catch (err) {
			// console.log error
			console.log("Signup error!");

			// throw the caught error
			throw err;
		}
	}
});