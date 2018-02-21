module.exports = function (sequelize, DataTypes) {
    var Message = sequelize.define('Message', {
        author: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1, 140]
            }},
        authorType:{
            type:DataTypes.ENUM('Tutor','Teacher'),
            allowNull:false,
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

    return Message;

}
