const bcrypt = require("bcryptjs");

module.exports = (sequelize, DataTypes) => {
    // Create User database with email, username, and password
    let User = sequelize.define("User", {
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            }
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        displayName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING(64),
            allowNull: false,
            is: /^[0-9a-f]{64}$/i
        },
        avatar: {
            type: DataTypes.STRING,
            allowNull: true
        }
    });

    // associate Post with User
    // If User is deleted, cascade to Posts
    User.associate = (models) => { User.hasMany(models.Post, { onDelete: "cascade" } )};

    // check if an unhashed password entered by the user can be compared to the hashed password stored in our database
    User.prototype.validPassword = (user, password) => bcrypt.compareSync(password, user.password);

    // hash user's password beforeCreate into User database 
    User.addHook("beforeCreate", (user) => user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null));

    return User;
}
