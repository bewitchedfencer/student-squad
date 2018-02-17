module.exports = function(sequelize, DataTypes) {
    var Teacher = sequelize.define("Teacher", {
        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1, 140]
            }

        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1, 140]
            }
        },

    });

    //Associate teacher with classes
    Teacher.associate = function(models) {
        //many classes to one teacher
        //If a teacher is deleted, keep the class - 

        Teacher.hasMany(models.Class)
    }
}