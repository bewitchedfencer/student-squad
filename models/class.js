module.exports = function(sequelize, DataTypes) {
    var Classroom = sequelize.define("Classroom", {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1, 140]
            }

        },
        subject: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1, 140]
            }
        },

    });

    // Associate classes with teacher (1 teacher per class)

    Classroom.associate = function(models) {
        Classroom.belongsTo(models.Teacher);

        Classroom.belongsToMany(models.Student, {
            through:models.Roster
        });
    };

    return Classroom;

}
