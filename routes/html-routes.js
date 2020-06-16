const moment = require("moment");
const Sequelize = require("sequelize");
const fs = require('fs');
const db = require("../models");
const authenticate = require("../config/authenticate");

module.exports = (app) => {
    // login and signup -------------------------------------
    app.get("/", async (req, res) => {
        // If the user already has an account send them to the posts page
        if (req.user) res.redirect("/feed");

        // else send them to the login page
        else res.render("login");
    });

    app.get("/login", async (req, res) => {
        // If the user already has an account send them to the posts page
        if (req.user) res.redirect("/feed");

        // else send them to the login page
        else res.render("login");
    });

    app.get("/signup", async (req, res) => {
        // If the user already has an account send them to the posts page
        if (req.user) res.redirect("/feed");

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
    app.get("/feed", authenticate, async (req, res) => {
        try {
            // create an array of all posts in the database
            let posts = await db.Post.findAll({
                include: [{
                    model: db.User
                }]
            });

            // isolate the post data from the array
            posts = posts.map(post => post.dataValues);

            // isolate the user data from the array
            posts.map(post => post.User = post.User.dataValues);

            // modify the createdAt variable with moment to show how long ago the post was created
            posts.map(post => post.createdAt = moment(post.createdAt, 'YYYY-MM-DDTHH:mm:ss.000Z').fromNow());

            // reverse the array to show the most recent posts first
            posts.reverse();

            // render the posts.handlebars page with the posts and username
            res.render("feed", { posts: posts, username: req.user.username });
        }

        catch (err) {
            // console.log where the error is coming from
            console.log("/feed error!");

            // send status and error to the response
            res.status(401).json(err);
        }
    });

    app.get("/posts", authenticate, async (req, res) => {
        try {
            // create an array of all posts in the database
            let posts = await db.Post.findAll({
                include: [{
                    model: db.User
                }]
            });

            // isolate the post data from the array
            posts = posts.map(post => post.dataValues);

            // isolate the user data from the array
            posts.map(post => post.User = post.User.dataValues);

            // modify the createdAt variable with moment to show how long ago the post was created
            posts.map(post => post.createdAt = moment(post.createdAt, 'YYYY-MM-DDTHH:mm:ss.000Z').fromNow());

            // reverse the array to show the most recent posts first
            posts.reverse();

            // render the posts.handlebars page with the posts
            res.render("posts", { username: req.user.username, posts: posts });
        }

        catch (err) {
            // console.log where the error is coming from
            console.log("/posts error!");

            // send status and error to the response
            res.status(401).json(err);
        }
    });

    // user profile -------------------------------------
    app.get("/users", authenticate, async (req, res) => {
        try {
            // create an array of all users in the database
            let users = await db.User.findAll({});

            // isolate the user data from the array
            users = users.map(user => user.dataValues);

            // render the users page with the user array
            res.render("users", { username: req.user.username, users: users });
        }

        catch (err) {
            // console.log where the error is coming from
            console.log("get /users error!");

            // send status and error to the response
            res.status(401).json(err);
        }
    });

    app.get("/users/:username", authenticate, async (req, res) => {
        try {
            // get the given username from the request
            let username = req.params.username;

            // boolean true/false if logged in user is the same as URL
            // if true, show functionality to edit their bio
            let isUser = (req.user.username === username);

            // create an array of all posts in the database from a specific user
            let posts = await db.Post.findAll({
                include: [{
                    model: db.User,
                    where: {
                        username: username
                    }
                }]
            });

            // isolate the post data from the array
            posts = posts.map(post => post.dataValues);

            // isolate the user data from the array
            posts.map(post => post.User = post.User.dataValues);

            // modify the createdAt variable with moment to show how long ago the post was created
            posts.map(post => post.createdAt = moment(post.createdAt, 'YYYY-MM-DDTHH:mm:ss.000Z').fromNow());

            // reverse the array to show the most recent posts first
            posts.reverse();

            // get the data for the specific user
            let user = await db.User.findOne({ where: { username: username } });

            // user = user.map(data => data.dataValues);
            
            // return array of files in avatar folder 
            let avatarFolder = './public/images/avatars/pack1';
            let avatarArray = fs.readdirSync(avatarFolder);

            // return array of files in banners folder
            let bannerFolder = './public/images/banners';
            let bannerArray = fs.readdirSync(bannerFolder);

            // render the posts.handlebars page with posts and user info
            res.render("profile", {
                posts: posts,
                displayName: user.displayName,
                username: user.username,
                banner: user.banner,
                avatar: user.avatar,
                email: user.email,
                bio: user.bio,
                facebook: user.facebook,
                twitter: user.twitter,
                linkedin: user.linkedin,
                instagram: user.instagram,
                github: user.github,
                isUser: isUser,
                avatarArray: avatarArray,
                bannerArray: bannerArray
            });
        }

        catch (err) {
            // console.log where the error is coming from
            console.log("/users/:username error!");

            // send status and error to the response
            res.status(404).send("404 - User not found!");
        }
    });

    // search results ------------------------------------- 
    app.get("/feed/search/:term", authenticate, async (req, res) => {
        try {
            // replace search string separators with spaces
            const term = (req.params.search).replace(/\+/g, ' ');

            // create an array of all posts in the database where body includes search
            let posts = await db.Post.findAll({
                include: [{
                    model: db.User
                }],
                where: {
                    body: {
                        [Sequelize.Op.like]: "%" + term + "%"
                    }
                }
            });

            // isolate the post data from the array
            posts = posts.map(post => post.dataValues);

            // isolate the user data from the array
            posts.map(post => post.User = post.User.dataValues);

            // modify the createdAt variable with moment to show how long ago the post was created
            posts.map(post => post.createdAt = moment(post.createdAt, 'YYYY-MM-DDTHH:mm:ss.000Z').fromNow());

            // reverse the array to show the most recent posts first
            posts.reverse();

            // render the posts.handlebars page with the posts
            res.render("feed", { posts: posts, username: req.user.username });
        }

        catch (err) {
            // console.log where the error is coming from
            console.log("/feed/:search error!");

            // send status and error to the response
            res.status(401).json(err);
        }
    });

    // settings ------------------------------------- 
    app.get("/settings", authenticate, async (req, res) => {
        res.render("settings", { username: req.user.username });
    });

    // default ------------------------------------- 
    app.get("*", authenticate, (req, res) => {
        res.redirect("/feed");
    });
}
