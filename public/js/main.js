$(document).ready(() => {
    $("#search-button").click(async (event) => {
        // prevent page refresh
        event.preventDefault();

        // collect search input from user
        let search = $("#search-input").val().trim();

        // if search bar is empty, exit function
        if (search === '') return;

        // modify search to remove whitespaces
        search = search.replace(/ /g, "+");

        // redirect user to page with search input results
        window.location.assign("/feed/search/" + search);
    });

    $("#submit-post").click(async (event) => {
        // prevent page refresh
        event.preventDefault();

        const user = await $.get("/api/userData");

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

    // user profile functions ------------------------------------- 
    $(".avatarSel").click(async (event) => {
        let user = await $.get("/api/userData");
        let avatar = $(event.target).attr("data-avatar");
        
        await $.ajax({
            method: "PUT",
            url: "/api/users/" + user.username, 
            data: { avatar: avatar }
        })
        // reload the window
        location.reload();
    });

    $("#profile-update").click(async (event) => {
        event.preventDefault();

        // get current user who is logged in
        let user = await $.get("/api/userData");

        // send PUT update request with bio as object
        await $.ajax({
            method: "PUT",
            url: "/api/users/" + user.username, 
            data: { 
                bio: $("#bio-input").val().trim(),
                facebook: $("#facebook-input").val().trim(),
                twitter: $("#twitter-input").val().trim(),
                linkedin: $("#linkedin-input").val().trim(),
                instagram: $("#instagram-input").val().trim(),
                github: $("#github-input").val().trim()
            }
        });

        console.log("User profile updated");

        // reload the window
        location.reload();
    });

});
