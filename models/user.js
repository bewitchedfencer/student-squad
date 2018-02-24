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
        User.hasOne(models.Tutor);
        User.hasOne(models.Teacher);
    };

    return User;
}
