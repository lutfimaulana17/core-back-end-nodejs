'use strict';
module.exports = (sequelize, DataTypes) => {
    const Article = sequelize.define('Article', {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: false
            }
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                notEmpty: false
            }
        },
        tag: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: false
            }
        },
        category_id: {
            type: DataTypes.UUID,
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
        },
        file_name: DataTypes.TEXT
    }, {});
    Article.associate = function (models) {
        // associations can be defined here
        Article.belongsTo(models.User, {
            foreignKey: 'user_id',
            as: 'user'
        });
        Article.belongsTo(models.Category, {
            foreignKey: 'category_id',
            as: 'category'
        });
    };
    return Article;
};