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
		if (!newUser.email || !newUser.username || !newUser.password) return;

		// otherwise, run the signUpUser function
		signUpUser(newUser);

		// Simon - I don't think this is necessary but I'm not sure yet
		// emailInput.val("");
		// usernameInput.val("");
		// passwordInput.val("");
	});

	// Does a POST to the signup route. If successful, we are redirected to the user's feed
	// Otherwise we log any errors
	const signUpUser = async (newUser) => {
		await $.post("/api/signup", newUser);
		window.location.replace("/posts");
	}
});
