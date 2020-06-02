$(document).ready(() => {
    $("#search-button").click((event) => {
        // prevent page refresh
        event.preventDefault();

        // if search bar is empty, exit function
        if ($("#search-bar").val() === '') return;

        // create object with search input
        const input = {
            search: $("#search-bar").val()
        }

        // console.log the input
        console.log(input);
    });

    $("#submit-post").click(async (event) => {
        // prevent page refresh
        event.preventDefault();

        // if the post title or the post body is empty, exit function
        if ($("#post-title").val() === '' || $("#post-body").val() === '') return;

        // create object with post information
        const newPost = {
            title: $("#post-title").val().trim(),
            timestamp: moment().format("MM/DD/YYYY hh:mm a"),
            body: $("#post-body").val().trim()
        }

        // send ajax post request with post object
        await $.post("/api/posts", newPost);

        // reload the window
        location.reload();
    });
});
