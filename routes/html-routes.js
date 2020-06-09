const db = require("../models");
const moment = require("moment");
const authenticate = require("../config/authenticate");

module.exports = (app) => {
    app.get("/", async (req, res) => {
        // If the user already has an account send them to the posts page
        if (req.user) res.redirect("/posts");
        
        // else send them to the login page
        else res.render("login");
    });

    app.get("/login", async (req, res) => {
        // If the user already has an account send them to the posts page
        if (req.user) res.redirect("/posts");
        
        // else send them to the login page
        else res.render("login");
    });

    app.get("/signup", async (req, res) => {
        // If the user already has an account send them to the posts page
        if (req.user) res.redirect("/posts");
        
        // else send them to the signup page
        else res.render("signup");
    });

    app.get("/logout", (req, res) => {
        // logout the user
        req.logout();

        // redirect the user to the homepage
        res.redirect("/");
    });

    app.get("/posts", authenticate, async (req, res) => {
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

    app.get("/profile", async (req, res) => {
        // create an array of all posts in the database
        let posts = await db.Post.findAll({});

        // isolate the post data from the array
        posts = posts.map(post => post.dataValues);

        // modify the createdAt variable with moment to show how long ago the post was created
        posts.map(post => post.createdAt = moment(post.createdAt, 'YYYY-MM-DDTHH:mm:ss.000Z').fromNow());

        // reverse the array to show the most recent posts first
        posts.reverse();

        // render the posts.handlebars page with the posts
        res.render("profile", { posts: posts });
    });

    app.get("/all-post", async (req, res) => {
        // create an array of all posts in the database
        let posts = await db.Post.findAll({});

        // isolate the post data from the array
        posts = posts.map(post => post.dataValues);

        // modify the createdAt variable with moment to show how long ago the post was created
        posts.map(post => post.createdAt = moment(post.createdAt, 'YYYY-MM-DDTHH:mm:ss.000Z').fromNow());

        // reverse the array to show the most recent posts first
        posts.reverse();

        // render the posts.handlebars page with the posts
        res.render("all-post", { posts: posts });
    });
}
