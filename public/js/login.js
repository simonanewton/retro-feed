$(document).ready(() => {
	// Getting references to our form and inputs
	const loginForm = $("form.login");
	const emailInput = $("input#email-input");
	const passwordInput = $("input#password-input");

	// When the form is submitted, we validate there's an email and password entered
	loginForm.submit((event) => {
		// prevent page refresh
		event.preventDefault();

		// create an object to collect user data
		let userData = {
			email: emailInput.val().trim(),
			password: passwordInput.val().trim()
		};

		// if either of the fields have been left blank, exit function
		if (!userData.email || !userData.password) return;

		// otherwise, run the loginUser function
		loginUser(userData);

		// emailInput.val("");
		// passwordInput.val("");
	});

	// loginUser does a post to our "api/login" route and if successful, redirects us the the /feed page
	const loginUser = (userData) => {
		$.post("/api/login", userData);
		window.location.replace("/posts");
	}
});
