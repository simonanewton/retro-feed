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

    app.post("/api/signup", async (req, res) => {
        const userData = req.body;
        console.log(userData);
    });
}
