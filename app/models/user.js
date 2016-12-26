'use strict';

module.exports = function(sequelize, DataTypes) {
    return sequelize.define('User', {
        name: DataTypes.STRING,
        bio: DataTypes.TEXT,
        email: DataTypes.EMAIL,
    }, {
        underscored: true,
        classMethods: {
            associate: function(models) {
                // associations can be defined here
            }
        }
    });
};