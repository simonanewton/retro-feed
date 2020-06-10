const db = require("../models");
const moment = require("moment");
const authenticate = require("../config/authenticate");

module.exports = (app) => {
    // login and signup -------------------------------------
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

    // posts feed -------------------------------------
    app.get("/posts", authenticate, async (req, res) => {
        try {
            // create an array of all posts in the database
            let posts = await db.Post.findAll({});

            // isolate the post data from the array
            posts = posts.map(post => post.dataValues);

            // modify the createdAt variable with moment to show how long ago the post was created
            posts.map(post => post.createdAt = moment(post.createdAt, 'YYYY-MM-DDTHH:mm:ss.000Z').fromNow());

            // reverse the array to show the most recent posts first
            posts.reverse();

            // render the posts.handlebars page with the posts and username
            res.render("posts", {
                posts: posts,
                username: req.user.username
            });
        }

        catch (err) {
            // console.log where the error is coming from
            console.log("/posts error!");

            // send status and error to the response
            res.status(401).json(err);
        }
    });

    // user profile -------------------------------------
    app.get("/:username", authenticate, async (req, res) => {
        try {
            // get the given username from the request
            let username = req.params.username;

            // create an array of all posts in the database from a specific user
            let posts = await db.Post.findAll({
                where: {
                    username: username
                }
            });

            // isolate the post data from the array
            posts = posts.map(post => post.dataValues);

            // modify the createdAt variable with moment to show how long ago the post was created
            posts.map(post => post.createdAt = moment(post.createdAt, 'YYYY-MM-DDTHH:mm:ss.000Z').fromNow());

            // reverse the array to show the most recent posts first
            posts.reverse();

            // get the data for the specific user
            let user = await db.User.findOne({
                where: {
                    username: username
                }
            });

            // render the posts.handlebars page with posts and user info
            res.render("profile", {
                posts: posts,
                displayName: user.dataValues.displayName,
                username: user.dataValues.username
            });
        }

        catch (err) {
            // console.log where the error is coming from
            console.log("/users/:username error!");

            // send status and error to the response
            res.status(401).json(err);
        }
    });
}
