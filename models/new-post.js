module.exports = (sequelize, DataTypes) => {
    return sequelize.define("Post", {
        title: DataTypes.STRING,
        body: DataTypes.STRING
    });
}
