module.exports = function (sequelize, DataTypes) {
    var Student = sequelize.define('Student', {
        student_first_name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1, 140]
            }
        },
        student_last_name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1, 140]
            }
        },
        unique_id: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        dob: {
            type: DataTypes.DATEONLY
        }
    });

    Student.associate = function(models) {        
        Student.belongsToMany(models.Classroom, {
           through:models.Roster
        });
        Student.hasMany(models.Message);
    
    };
    return Student;
};
