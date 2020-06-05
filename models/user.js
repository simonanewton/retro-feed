const bcrypt = require("bcryptjs");

module.exports = (sequelize, DataTypes) => {
    // Create newUser database with User rows
    var User = sequelize.define("newUser", {
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            }
        },
        username: {
            type: DataTypes.TEXT,
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING(64),
            allowNull: false,
            is: /^[0-9a-f]{64}$/i
        }
    });
    // This will check if an unhashed password entered by the user can be compared to the hashed password stored in our database
    User.prototype.validPassword = (password) => {
        return bcrypt.compareSync(password, this.password);
    };

    // Hash user's password beforeCreate into newUsers database 
    User.addHook("beforeCreate", (user) => {
        user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
    });

    return User;
}