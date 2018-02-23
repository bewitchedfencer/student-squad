module.exports = function (sequelize, DataTypes) {
    var Message = sequelize.define('Message', {
        author: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1, 140]
            }
        },
        authorType:{
            type:DataTypes.ENUM("tutor", "teacher"),
            allowNull:false
        },
        text: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1, 1500]
            }
        },
        tutor_read: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: false
        },
        teacher_read: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: false
        }
    });


    Message.associate = function(models) {        
        Message.belongsTo(models.Student)
    };
    return Message;

}
