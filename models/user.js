'use strict';
module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        name: {
            type: DataTypes.STRING,
            allowNull: false, 
            validate: {
              notEmpty: false,
            },
        },
        email: {
            type: DataTypes.STRING,
            unique: true,
            validate: {
                isEmail: true,
                notEmpty: false,
                min:{
                    args:[4],
                    msg:"Minimum 4 characters required in last name"
               }
            }
        },
        password: {
            type: DataTypes.STRING,
            validate: {
                notEmpty: false,
            },
        },
    }, {});
    User.associate = function (models) {
        // associations can be defined here
        User.hasMany(models.Category, {
            foreignKey: 'user_id',
            as: 'category'
        });
        User.hasMany(models.Article, {
            foreignKey: 'user_id',
            as: 'article'
        });
        User.hasMany(models.News, {
            foreignKey: 'user_id',
            as: 'news'
        });
        User.hasMany(models.Company, {
            foreignKey: 'user_id',
            as: 'company'
        });
    };
    return User;
};