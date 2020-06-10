const db = require("../models");
const moment = require("moment");
const authenticate = require("../config/authenticate");

module.exports = (app) => {
    /* Log in / Signup ------------------------------------- */
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

    /* Posts Feed ------------------------------------- */
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
        // pass current username to generate unique URL for Profile link
        res.render("posts", {
            posts: posts,
            username: req.user.username
        });
    });

    /* User Profile ------------------------------------- */
    app.get("/:username", authenticate, async (req, res) => {
        // use username parameter for WHERE queries
        let currentUser = req.params.username;

        /* get User Posts */
        // create an array of all posts in the database WHERE username = current user
        let posts = await db.Post.findAll({
            where: {
                username: currentUser
            }
        });

        // isolate the post data from the array
        posts = posts.map(post => post.dataValues);

        // modify the createdAt variable with moment to show how long ago the post was created
        posts.map(post => post.createdAt = moment(post.createdAt, 'YYYY-MM-DDTHH:mm:ss.000Z').fromNow());

        // reverse the array to show the most recent posts first
        posts.reverse();

        /* get User Info */
        let userInfo = await db.User.findAll({
            where: {
                username: currentUser
            }
        });

        // render the posts.handlebars page with posts and user info
        res.render("profile", {
            posts: posts,
            displayName: userInfo[0].dataValues.displayName,
            username: userInfo[0].dataValues.username
        });
    });

}
