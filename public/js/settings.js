$(document).ready(() => {
    $("#save-settings").click(async (event) => {
        // prevent page refresh
        event.preventDefault();

        // create object for user settings
        let settings = {};

        // if any of the fields have been populated, add them to the settings object
        if ($("#current-email").val()) settings.email = $("#current-email").val();
        if ($("#current-username").val()) settings.username = $("#current-username").val();
        if ($("#current-displayName").val()) settings.displayName = $("#current-displayName").val();
        if ($("#current-password").val()) settings.password = $("#current-pssword").val();

        // if all of the fields have been left blank, exit function
        if (!Object.keys(settings).length) return;

        try {
            // send an update request to the api
            await $.ajax({
                method: "PUT",
                url: "/api/settings",
                data: settings
            });

            // show success to the user
            $("#success-alert").show();

            // refresh the page
            window.location.replace("/");
        }

        catch (err) {
            // display error to the user
            displayError(err);
        }
    });

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
            message = "Settings Update Error."
        }

        // show the error alert with the corresponding error
        $("#error-alert").show();
        $("#error-message").text(message);
    }

    $("#delete-account").click(async (event) => {
        try {
            // send delete request to the settings api
            await $.ajax({
                method: "DELETE",
                url: "/api/settings",
            });

            // send the user to the login page
            window.location.replace("/");
        }

        catch (err) {
            console.log(err);
        }
    });
});
