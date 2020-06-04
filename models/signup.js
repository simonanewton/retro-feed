module.exports = (sequelize, DataTypes) => {
    return sequelize.define("newUser", {
        email: DataTypes.STRING,
        username: DataTypes.STRING,
        password: DataTypes.STRING
    });
}