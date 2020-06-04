const db = require("../models");

module.exports = (app) => {
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

<<<<<<< HEAD
    app.post("/api/signup", async (req, res) => {
        const userData = req.body;
        console.log(userData);
        res.sendStatus(200);
=======
    app.get("/api/signup", async (req, res) => {
        const users = await db.newUser.findAll({});
        res.json(users);
    });

    app.post("/api/signup", async (req, res) => {
        const newSignUp = await db.newUser.create({
            email: req.body.email,
            username: req.body.username,
            password: req.body.password
        });
        console.log(newSignUp.dataValues)
        res.json(newSignUp.dataValues);

>>>>>>> sign up working except for the password
    });
}
