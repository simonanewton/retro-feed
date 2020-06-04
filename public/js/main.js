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

        // create object with post information
        const newPost = {
            title: $("#post-title").val().trim(),
            body: $("#post-body").val().trim()
        }

        // if the post title or the post body is empty, exit function
        if (!newPost.title || !newPost.body) return;

        // send ajax post request with post object
        await $.post("/api/posts", newPost);

        // reload the window
        location.reload();
    });
});
