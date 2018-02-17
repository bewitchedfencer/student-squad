module.exports = function(sequelize, DataTypes){
    var Roster = sequelize.define('roster', {
        term : {
            type:DataTypes.STRING,
            allowNull: false
        }
    });
   
    return Roster;
}