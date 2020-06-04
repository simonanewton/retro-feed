const db = require("../models");
const moment = require("moment");
const path = require("path");

module.exports = (app) => {
    app.get("/", async (req, res) => {
        res.render("index");
    });

    app.get("/posts", async (req, res) => {
        let posts = await db.Post.findAll({});
        posts = posts.map(post => post.dataValues);
        posts.map(post => post.createdAt = moment(post.createdAt, 'YYYY-MM-DDTHH:mm:ss.000Z').fromNow());
        res.render("posts", { posts: posts });
    });

    app.get("/signup", async (req, res) => {
        res.sendFile(path.join(__dirname, "../public/signup.html"));
    });

    app.get("/login", async (req, res) => {
        res.sendFile(path.join(__dirname, "../public/login.html"));
    });
}
