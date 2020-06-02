var db = require("../models");

module.exports = (app) => {
    app.get("/api/posts", async (req, res) => {
        const posts = await db.Post.findAll({});
        res.json(posts);
    });

    app.post("/api/posts", async (req, res) => {
        const post = await db.Post.create({
            title: req.body.title,
            timestamp: req.body.timestamp,
            body: req.body.body
        });
        res.json(post);
    });
}
