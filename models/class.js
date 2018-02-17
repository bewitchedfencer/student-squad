module.exports = function(sequelize, DataTypes) {
    var Class = sequelize.define("Class", {
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

    //Associate classes with teacher (1 teacher per class)
    Class.associate = function(models) {
        Class.belongsTo(models.Teacher)
    };
    Class.belongsToMany(models.Students, {
        through:models.Roster,
        unique:false
    });
}