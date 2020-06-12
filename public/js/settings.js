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

        try {
            // send an update request to the api
            await $.ajax({
                method: "PUT",
                url: "/api/settings",
                data: settings
            });

            // show success to the user
            $("#success-alert").show();
        }

        catch (err) {
            // display error to the user
            displayError(err);
        }
    });

    const displayError = (err) => {
        console.log(err);

        // show the error alert with the corresponding error
        $("#error-alert").show();
        $("#error-message").text("Username already exists.");
    }

    $("#delete-account").click(async (event) => {
        try {
            // send delete request to the settings api
            await $.ajax({
                method: "PUT",
                url: "/api/settings",
                data: settings
            });

            // send the user to the login page
            window.location.replace("/");
        }

        catch (err) {
            console.log(err);
        }
    });
});
