module.exports = (sequelize, DataTypes) => {
    // Create User database with email, username, and password
    let Follow = sequelize.define("following", {
        followId: DataTypes.INTEGER
    });

    // Follow.associate = (models) => { Follow.belongsTo(models.User, { foreignKey: { allowNull: false } }) };
    return Follow;
}