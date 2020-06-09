$(document).ready(() => {
    $("#search-button").click((event) => {
        // prevent page refresh
        event.preventDefault();

        // create object with search input
        const input = {
            search: $("#search-bar").val()
        };

        // if search bar is empty, exit function
        if (input.search === '') return;

        // console.log the input
        console.log(input);
    });

    $("#submit-post").click(async (event) => {
        // prevent page refresh
        event.preventDefault();

        const user = await $.get("/api/userData");

        console.log(user);

        // create object with post information
        const newPost = {
            UserId: user.id,
            username: user.username,
            displayName: user.displayName,
            body: $("#post-body").val().trim()
        };

        // if the post body is empty, exit function
        if (!newPost.body) return;

        // send ajax post request with post object
        await $.post("/api/posts", newPost);

        // reload the window
        location.reload();
    });

    $(".delete-post").click(async (event) => {
        // get the post id from the selected post
        const postId = $(event.target).data("id");

        // send ajax delete request with post id
        await $.ajax({
            method: "DELETE",
            url: "/api/posts/" + postId
        });

        // reload the window
        location.reload();
    });
});