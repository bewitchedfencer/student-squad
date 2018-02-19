module.exports = function(sequelize, DataTypes) {
    var Teacher = sequelize.define("teacher", {
        first_name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1, 140]
            }

        },
        last_name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1, 140]
            }
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isEmail: true,
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull:false
        }

    });

    // Associate teacher with classes
    // Teacher.associate = function(models) {
    //     Teacher.hasMany(models.Class);
    //     Teacher.hasMany(models.Message);
    // }

    return Teacher;
}
