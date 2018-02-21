module.exports = function(sequelize, DataTypes){
    var Roster = sequelize.define('Roster', {
        term : {
            type:DataTypes.STRING,
            allowNull: false
        }
    });
   
    return Roster;
}