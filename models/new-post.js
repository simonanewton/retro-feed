module.exports = (sequelize, DataTypes) => {
    let Post = sequelize.define("Post", {
        body: DataTypes.STRING(2000)
    });

    // add a belongsTo association to Posts
    Post.associate = (models) => { Post.belongsTo(models.User, { foreignKey: { allowNull: false } }) };

    return Post;
}
