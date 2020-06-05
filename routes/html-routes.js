const db = require("../models");
const moment = require("moment");
const path = require("path");

module.exports = (app) => {
    app.get("/", async (req, res) => {
        // If the user already has an account send them to the members page
        if (req.user) {
            res.redirect("/posts");
        }
        res.render("signup");
        // render the index.handlebars page
        // res.render("index");
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

    app.get("/signup", async (req, res) => {
        // render signup.handlebars
        res.render("signup");
    });

    app.get("/login", async (req, res) => {
        // render login.handlebars
        res.render("login");
    });
}
