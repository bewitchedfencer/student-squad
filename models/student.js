module.exports = function(sequelize, DataTypes){
    var Student = sequelize.define('student', {
        student_first_name:{
            type:DataTypes.STRING,
            allowNull:false,
            validate:{
                len:[1, 140]
            }
        },
        student_last_name:{
            type:DataTypes.STRING,
            allowNull:false,
            validate:{
                len:[1, 140]
            }
        },
        unique_id:{
            type:DataTypes.STRING,
            allowNull:false,
        },
        dob:{
            type:DataTypes.DATEONLY
        }
    });
Student.belongsTo(models.Tutor);
Student.belongsToMany(models.Class, {
    through:models.Roster,
    unique:false
});
return Student;
};