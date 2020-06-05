const db = require("../models");
const moment = require("moment");

module.exports = (app) => {
    app.get("/", async (req, res) => {
        // If the user already has an account send them to the posts page
        if (req.User) res.redirect("/posts");
        
        // else send them to the login page
        res.render("login");
    });

    app.get("/login", async (req, res) => {
        // If the user already has an account send them to the posts page
        if (req.User) res.redirect("/posts");
        
        // else send them to the login page
        res.render("login");
    });

    app.get("/signup", async (req, res) => {
        // If the user already has an account send them to the posts page
        if (req.User) res.redirect("/posts");
        
        // else send them to the signup page
        res.render("signup");
    });

    app.get("/posts", async (req, res) => {
        // create an array of all posts in the database
        let posts = await db.Post.findAll({});

        // isolate the post data from the array
        posts = posts.map(post => post.dataValues);

        // modify the createdAt variable with moment to show how long ago the post was created
        posts.map(post => post.createdAt = moment(post.createdAt, 'YYYY-MM-DDTHH:mm:ss.000Z').fromNow());

        // reverse the array to show the most recent posts first
        posts.reverse();

        // render the posts.handlebars page with the posts
        res.render("posts", { posts: posts });
    });
}
