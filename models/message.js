module.exports = function (sequelize, DataTypes) {
    var Message = sequelize.define('message', {
        author: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1, 140]
            }
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

    // Message.belongsTo(models.Tutor);
    // Message.belongsTo(models.Teacher);

    return Message;

}