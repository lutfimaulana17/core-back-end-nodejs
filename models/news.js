'use strict';
module.exports = (sequelize, DataTypes) => {
    const News = sequelize.define('News', {
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
    News.associate = function (models) {
        // associations can be defined here
        News.belongsTo(models.User,{
          foreignKey: 'user_id',
          as: 'user'
        });
        News.belongsTo(models.Category, {
            foreignKey: 'category_id',
            as: 'category'
        });
    };
    return News;
};