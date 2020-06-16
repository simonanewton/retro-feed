module.exports = (sequelize, DataTypes) => {
    let Post = sequelize.define("Post", {
        // username: DataTypes.STRING,
        // displayName: DataTypes.STRING,
        body: DataTypes.STRING
    });

    // add a belongsTo association to Posts
    Post.associate = (models) => { Post.belongsTo(models.User, { foreignKey: { allowNull: false } }) };

    return Post;
}
