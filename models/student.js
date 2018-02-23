module.exports = function (sequelize, DataTypes) {
    var Student = sequelize.define('Student', {
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
        student_num: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        unique_id:{
            type:DataTypes.STRING,
            allowNull:false
        },
        grade: {
            type: DataTypes.STRING
        },

        primary_contact_first: {
            type: DataTypes.STRING
        },
        primary_contact_last: {
            type: DataTypes.STRING
        },
        primary_contact_phone: {
            type: DataTypes.STRING
        },
        primary_contact_email: {
            type: DataTypes.STRING,
            validate: {
                isEmail: true,
            }
        }
    },
    {
      timestamps: false
    });

    Student.associate = function(models) {        
        Student.belongsToMany(models.Classroom, {
           through:models.Roster
        });
            //Student has many messages association 
        Student.hasMany(models.Message);

    };

    return Student;
};