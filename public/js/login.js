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
		// ajax post to the login api with userData
		await $.post("/api/login", userData);

		// if successful, send the user to the posts page
		window.location.replace("/posts");

		// if an error occurs, notify the user
		// insert notification here
	}
});
