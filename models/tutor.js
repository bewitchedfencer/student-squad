module.exports = function (sequelize, DataTypes) {
    var Tutor = sequelize.define('tutor', {
        tutor_first_name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1, 140]
            }
        },
        tutor_last_name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1, 140]
            }
        },
        tutor_agency: {
            type: DataTypes.STRING
        }, 
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isEmail: true,
            }
        },
        password: {
            type: DataTypes.STRING
        }
    });

    // Tutor.associate = function (models) {
    //     Tutor.hasMany(models.Student);
    //     Tutor.hasMany(models.Message);
    // };

    return Tutor;
}
