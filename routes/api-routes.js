const fs = require('fs');
const db = require("../models");
const passport = require("../config/passport");
const authenticate = require("../config/authenticate");

module.exports = (app) => {
    // login and signup api ---------------------------------------------------
    app.post("/api/signup", async (req, res) => {
        try {

            // create array of files in avatar folder and select random file
            const selectAvatar = () => {
                const avatarFolder = './public/images/avatars/pack1';
                avatars = fs.readdirSync(avatarFolder);
                return avatars[Math.floor(Math.random() * avatars.length)];
            }
            // create array of files in banners folder and select random file
            const selectBanner = () => {
                const bannerFolder = './public/images/banners';
                banners = fs.readdirSync(bannerFolder);
                return banners[Math.floor(Math.random() * banners.length)];
            }

            // create an array of all users in the database
            await db.User.create({
                email: req.body.email,
                username: req.body.username,
                displayName: req.body.displayName,
                password: req.body.password,
                avatar: selectAvatar(),
                banner: selectBanner()
            });

            // redirect to post /api/login
            res.redirect(307, "/api/login");
        }

        catch (err) {
            // console.log where the error is coming from
            console.log("post /api/signup error!");

            console.log(err);

            // send status and error to the response
            res.status(401).json(err);
        }
    });

    app.post("/api/login", passport.authenticate("local"), async (req, res) => {
        // send user data to the response
        res.json(req.user);
    });

    // posts api --------------------------------------------------------------
    app.get("/api/posts", authenticate, async (req, res) => {
        try {
            // create an array of all posts in the database
            let posts = await db.Post.findAll({
                include: [{
                    model: db.User
                }]
            });

            // send the array of posts to the response
            res.json(posts);
        }

        catch (err) {
            // console.log where the error is coming from
            console.log("get /api/posts error!");

            console.log(err);

            // send status and error to the response
            res.status(401).json(err);
        }
    });

    app.post("/api/posts", async (req, res) => {
        try {
            // create a new post with the new-post model
            const post = await db.Post.create({
                UserId: req.body.UserId,
                body: req.body.body
            });

            // send the post data to the response
            res.json(post);
        }

        catch (err) {
            // console.log where the error is coming from
            console.log("post /api/posts error!");

            console.log(err);

            // send status and error to the response
            res.status(401).json(err);
        }
    });

    app.delete("/api/posts/:id", async (req, res) => {
        try {
            // get the post id from the request
            const postId = req.params.id;

            // delete the selected post from the database
            const response = await db.Post.destroy({ where: { id: postId } });

            // send the response data to the response
            res.json(response);
        }

        catch (err) {
            // console.log where the error is coming from
            console.log("delete /api/posts/:id error!");

            console.log(err);

            // send status and error to the response
            res.status(401).json(err);
        }
    });

    // user information api -----------------------------------------------------------
    app.get("/api/userData", authenticate, async (req, res) => {
        // if the user is not logged in, send an empty object
        if (!req.user) res.json({});

        // else send the users stored information to the response
        else {
            res.json({
                id: req.user.id,
                email: req.user.email,
                username: req.user.username,
                displayName: req.user.displayName
            });
        }
    });

    app.get("/api/users", authenticate, async (req, res) => {
        try {
            // create an array of all users in the database
            const users = await db.User.findAll({});

            // send the array of users to the response
            res.json(users);
        }

        catch (err) {
            // console.log where the error is coming from
            console.log("get /api/users error!");

            console.log(err);

            // send status and error to the response
            res.status(401).json(err);
        }
    });

    app.put("/api/users/:username", async (req, res) => {
        try {
            // update user in database with applicable data
            await db.User.update({
                banner: req.body.banner,
                avatar: req.body.avatar,
                bio: req.body.bio,
                facebook: req.body.facebook,
                twitter: req.body.twitter,
                linkedin: req.body.linkedin,
                instagram: req.body.instagram,
                github: req.body.github
            }, {
                where: {
                    username: req.params.username
                }
            });

            // sends success response
            res.status(200).send("User information updated");
        }

        catch (err) {
            // console.log the error and where the error is coming from
            console.log("put /api/users/:username error!");

            console.log(err);

            // send status and error to the response
            res.status(404).json(err);
        }
    });

    // settings api -----------------------------------------------------------
    app.put("/api/settings", async (req, res) => {
        try {
            // create an object for storing modified settings
            const settings = {};

            // if any settings have been modified, add them to the object
            if (req.body.email) settings.email = req.body.email;
            if (req.body.username) settings.username = req.body.username;
            if (req.body.displayName) settings.displayName = req.body.displayName;
            if (req.body.password) settings.password = req.body.password;

            // update the user's input settings
            await db.User.update(settings, {
                where: {
                    username: req.user.username
                }
            });

            // sends success response
            res.status(200).send("User information updated.");
        }

        catch (err) {
            // console.log where the error is coming from
            console.log("put /api/settings error!");

            console.log(err);

            // send status and error to the response
            res.status(401).json(err);
        }
    });

    app.delete("/api/settings", async (req, res) => {
        try {
            // delete the user's posts from the database
            await db.Post.destroy({ where: { UserId: req.user.id } });

            // delete the user's account from the database
            await db.User.destroy({ where: { id: req.user.id } });

            // logout the user
            req.logout();

            // sends success response
            res.status(200).send("User account deleted successfully.");
        }

        catch (err) {
            // console.log where the error is coming from
            console.log("delete /api/settings error!");

            console.log(err);

            // send status and error to the response
            res.status(401).json(err);
        }
    });
}
