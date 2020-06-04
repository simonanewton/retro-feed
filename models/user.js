const bcrypt = require("bcryptjs");

module.exports = (sequelize, DataTypes) => {
    // Create newUser database with User rows
    let User = sequelize.define("newUser", {
        email: DataTypes.STRING,
        username: DataTypes.STRING,
        password: DataTypes.STRING
    });

    // Hash user's password beforeCreate into newUsers database 
    User.addHook("beforeCreate", (user) => {
        user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
    });

    return User;
}