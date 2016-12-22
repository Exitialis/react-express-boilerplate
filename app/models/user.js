'use strict';

module.exports = function(sequelize, DataTypes) {
    let User = sequelize.define('User', {
        name: DataTypes.STRING,
        bio: DataTypes.TEXT,
        email: DataTypes.INTEGER,
    }, {
        underscored: true,
        classMethods: {
            associate: function(models) {
                // associations can be defined here
            }
        }
    });

    return User;
};