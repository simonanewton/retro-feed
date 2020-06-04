$(document).ready(() => {
	// Getting references to our form and input
	const signUpForm = $("form.signup");
	const usernameInput = $("input#username-input");
	const emailInput = $("input#email-input");
	const passwordInput = $("input#password-input");


	signUpForm.on("submit", (event) => {
		// prevent page refresh
		event.preventDefault();
		
		// create an object to collect user data
		let userData = {
			email: emailInput.val().trim(),
			username: usernameInput.val().trim(),
			password: passwordInput.val().trim()
		};

		// When the signup button is clicked, we validate the fields are not blank
		if (!userData.email || !userData.username || !userData.password) return;

		// If we have the fields populated, run the signUpUser function and empty fields
		signUpUser(userData);

		// Simon - I don't think this is necessary but I'm not sure yet
		// emailInput.val("");
		// usernameInput.val("");
		// passwordInput.val("");
	});

	// Does a POST to the signup route. If successful, we are redirected to the user's feed
	// Otherwise we log any errors
	const signUpUser = async (userData) => {
		// creates an ajax post using the userData parameter
		const result = await $.post("/api/signup", userData);

		// if the post is made successfully, redirect the user to their feed
		result.done(() => {
			console.log("Post made successfully.");
			window.location.replace("/feed");
		});

		// if the post fails, alert the user of the error
		result.fail(() => {
			console.log("Post creation failed.");
			$("#alert .msg").text(err.responseJSON);
			$("#alert").fadeIn(500);
		});
	}
});
