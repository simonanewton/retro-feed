var db = require("../models");

module.exports = (app) => {
    app.get("/", async (req, res) => {
        res.render("index");
    });

    app.get("/posts", async (req, res) => {
        const posts = { posts: await db.Post.findAll({}) };
        res.render("posts", posts);
    });
}
