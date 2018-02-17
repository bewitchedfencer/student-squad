module.exports = function(sequelize, DataTypes) {
    var Teacher = sequelize.define("Teacher", {
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
        }

    });

    //Associate teacher with classes
    Teacher.associate = function(models) {
        //many classes to one teacher
        //If a teacher is deleted, keep the class - 

        Teacher.hasMany(models.Class)
    }
}