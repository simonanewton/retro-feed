const db = require("../models");
const passport = require("../config/passport");
const authenticate = require("../config/authenticate");

module.exports = (app) => {
    // login and signup api -------------------------------------
    app.post("/api/signup", async (req, res) => {
        try {
            // create an array of all users in the database
            await db.User.create({
                email: req.body.email,
                username: req.body.username,
                displayName: req.body.displayName,
                password: req.body.password,

            });

            // redirect to post /api/login
            res.redirect(307, "/api/login");
        }

        catch (err) {
            // console.log where the error is coming from
            console.log("post /api/signup error!");

            // send status and error to the response
            res.status(401).json(err);
        }
    });

    app.post("/api/login", passport.authenticate("local"), async (req, res) => {
        // send user data to the response
        res.json(req.user);
    });

    // posts api -------------------------------------
    app.get("/api/posts", async (req, res) => {
        try {
            // create an array of all posts in the database
            const posts = await db.Post.findAll({});

            // send the array of posts to the response
            res.json(posts);
        }

        catch (err) {
            // console.log where the error is coming from
            console.log("get /api/posts error!");

            // send status and error to the response
            res.status(401).json(err);
        }
    });

    app.post("/api/posts", async (req, res) => {
        try {
            // create a new post with the new-post model
            const post = await db.Post.create({
                UserId: req.body.UserId,
                username: req.body.username,
                displayName: req.body.displayName,
                body: req.body.body
            });

            // send the post data to the response
            res.json(post);
        }

        catch (err) {
            // console.log where the error is coming from
            console.log("post /api/posts error!");

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

            // send status and error to the response
            res.status(401).json(err);
        }
    });

    app.get("/api/all-post", async (req, res) => {
        // create an array of all posts in the database
        const posts = await db.Post.findAll({});
        // db.Post.findAll({ include: [db.UserId] })
        // ((dbPost) => {
        //     res.json(dbPost);
        //   });
        // send the array of posts to the response
        // res.json(posts);
    });

    // user information api -------------------------------------
    app.get("/api/userData", async (req, res) => {
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

    app.get("/api/users", async (req, res) => {
        try {
            // create an array of all users in the database
            const users = await db.User.findAll({});

            // send the array of users to the response
            res.json(users);
        }

        catch (err) {
            // console.log where the error is coming from
            console.log("get /api/users error!");

            // send status and error to the response
            res.status(401).json(err);
        }
    });

    app.get("/api/users/:id", async (req, res) => {
        try {
            // get user from the database
            const user = await db.User.findOne({ where: { id: req.params.id } });

            // send the user to the response
            res.json(user);
        }

        catch (err) {
            // console.log where the error is coming from
            console.log("get /api/users/:id error!");

            // send status and error to the response
            res.status(401).json(err);
        }
    });

    // update user api -------------------------------------
    app.put("/api/users/:username", async (req, res) => {
        try {
            // update user in database with applicable data
            // .update returns number of affected rows
            await db.User.update({
                avatar: req.body.avatar,
                bio: req.body.bio
            }, { where: { username: req.params.username } });

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
    })
}
