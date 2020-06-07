module.exports = (sequelize, DataTypes) => {
    return sequelize.define("Post", {
        username: DataTypes.STRING,
        title: DataTypes.STRING,
        body: DataTypes.STRING
    });
}
