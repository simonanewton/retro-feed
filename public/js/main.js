$(document).ready(() => {
    $("#search-button").click((event) => {
        event.preventDefault();

        if ($("#search-bar").val() === '') return;

        const input = {
            search: $("#search-bar").val()
        }

        console.log(input);
    });

    $("#submit-post").click((event) => {
        event.preventDefault();

        if ($("#post-title").val() === '' || $("#post-body").val() === '') return;

        const title = $("#post-title").val();
        const body = $("#post-body").val();

        const post = `
        <div class="card p-4 my-3 border border-secondary">
            <h4 class="m-0">${title}</h4>
            <hr class="my-3 border-secondary">

            <p class="m-0">${body}</p>
        </div>
        `;

        $("#output-area").prepend(post);
    });
});
