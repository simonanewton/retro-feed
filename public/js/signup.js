$(document).ready(() => {
	// Getting references to our form and input
	const signUpForm = $("form.signup");
	const usernameInput = $("input#username-input");
	const emailInput = $("input#email-input");
	const passwordInput = $("input#password-input");

	signUpForm.submit((event) => {
		// prevent page refresh
		event.preventDefault();

		// create an object to collect user data
		let newUser = {
			email: emailInput.val().trim(),
			username: usernameInput.val().trim(),
			password: passwordInput.val().trim()
		};

		// if either of the fields have been left blank, exit function
		if (!newUser.email || !newUser.username || !newUser.password) {
			$("#alert .msg").text("Email, username, and/or password cannot be blank.");
			$("#alert").fadeIn(500);
			return;
		};

		// otherwise, run the signUpUser function
		signUpUser(newUser);
	});

	// Does a POST to the signup route. If successful, we are redirected to the user's feed
	// Otherwise we log any errors
	const signUpUser = async (newUser) => {
		let response = await $.post("/api/signup", newUser);

		// If route sends back response, show error and return
		if (response.original.sqlMessage) {
			$("#alert .msg").text(response.original.sqlMessage);
			$("#alert").fadeIn(500);
			return;
		} else {
			// Otherwise, authenticate to /posts
			console.log('success!@!!!!! ');
			// window.location.replace("/posts");
		}
	}
});
