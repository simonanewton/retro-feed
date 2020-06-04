const db = require("../models");

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

    });
}
