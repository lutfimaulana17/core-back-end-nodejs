'use strict';
module.exports = (sequelize, DataTypes) => {
    const Category = sequelize.define('Category', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: false
            }
        },
        user_id: {
            type: DataTypes.UUID,
            allowNull: false,
            validate: {
                notEmpty: false
            }
        }
    }, {});
    Category.associate = function (models) {
        // associations can be defined here
        Category.belongsTo(models.User, {
            foreignKey: 'user_id',
            as: 'user'
        });
        Category.hasMany(models.Article, {
            foreignKey: 'category_id',
            as: 'category'
        });
        Category.hasMany(models.News, {
            foreignKey: 'category_id',
            as: 'news'
        });
    };
    return Category;
};