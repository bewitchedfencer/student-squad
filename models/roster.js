module.exports = function(sequelize, DataTypes){
    var Roster = sequelize.define('Roster', {

    },
    {
      timestamps: false
    });
   
    return Roster;
}