module.exports = function (sequelize, DataTypes) {
    var User = sequelize.define('User', {

        email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isEmail: true,
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        user_type: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });

    User.associate = function (models) {
        User.belongsTo(models.Tutor);
        User.belongsTo(models.Teacher);
    };

    return User;
}
