const db = require("../models");
const passport = require("../config/passport");

module.exports = (app) => {
    app.post("/api/signup", async (req, res) => {
        try {
            // create an array of all users in the database
            await db.User.create({
                email: req.body.email,
                username: req.body.username,
                password: req.body.password
            });

            // redirect to post /api/login
            res.redirect(307, "/api/login");

        } catch (err) {
            console.log("Error creating User: ", err.original.sqlMessage);

            res.send(err);
        }
    });

    app.post("/api/login", passport.authenticate("local"), async (req, res) => {
        // send user data to the response
        res.json(req.user);
    });

    app.get("/api/users", async (req, res) => {
        // create an array of all users in the database
        const users = await db.User.findAll({});

        // send the array of users to the response
        res.json(users);
    });

    app.get("/api/posts", async (req, res) => {
        // create an array of all posts in the database
        const posts = await db.Post.findAll({});

        // send the array of posts to the response
        res.json(posts);
    });

    app.post("/api/posts", async (req, res) => {
        // create a new post with the new-post model
        const post = await db.Post.create({
            title: req.body.title,
            body: req.body.body
        });

        // send the post to the response in a JSON format
        res.json(post);
    });

    app.delete("/api/posts/:id", async (req, res) => {
        // get the post id from the request
        const postId = req.params.id;

        // delete the selected post from the database
        const response = await db.Post.destroy({ where: { id: postId } });

        // send the response in a JSON format
        res.json(response);
    });
}
