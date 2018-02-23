module.exports = function (sequelize, DataTypes) {
    var Tutor = sequelize.define('Tutor', {
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
        tutor_agency: {
            type: DataTypes.STRING
        }
    });

    Tutor.associate = function (models) {
        Tutor.hasMany(models.Student);
     
        Tutor.belongsTo(models.User);
    };

    return Tutor;
}
