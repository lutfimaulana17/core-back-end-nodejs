'use strict';
module.exports = (sequelize, DataTypes) => {
    const Company = sequelize.define('Company', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: false
            }
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: false
            }
        },
        address: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: false
            }
        },
        postal_code: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: false
            }
        },
        city: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: false
            }
        },
        province: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: false
            }
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: false
            }
        },
        about: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                notEmpty: false
            }
        },
        visi: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                notEmpty: false
            }
        },
        misi: {
            type: DataTypes.TEXT,
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
    Company.associate = function (models) {
        // associations can be defined here
        Company.belongsTo(models.User,{
          foreignKey: 'user_id',
          as: 'user'
        });
    };
    return Company;
};