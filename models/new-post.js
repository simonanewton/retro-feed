module.exports = (sequelize, DataTypes) => {
    return sequelize.define("Post", {
        title: DataTypes.STRING,
        timestamp: DataTypes.STRING,
        body: DataTypes.STRING
    });
}
