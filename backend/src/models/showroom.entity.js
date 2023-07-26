'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Showroom extends Model {
        static associate(models) {
            // define association here
        }
    }
    Showroom.init(
        {
            id: {
                type: DataTypes.UUID,
                primaryKey: true,
                defaultValue: DataTypes.UUIDV4
            },
            name: {
                type: DataTypes.STRING(100),
                allowNull: false
            },
            longtitude: {
                type: DataTypes.FLOAT,
                defaultValue: null
            },
            lattitude: {
                type: DataTypes.FLOAT,
                defaultValue: null
            },
            address: {
                type: DataTypes.STRING(100),
                allowNull: false
            },
            manager: {
                type: DataTypes.STRING(100),
                allowNull: false
            },
            contactPhone: {
                type: DataTypes.STRING(100),
                allowNull: false
            },
            contactEmail: {
                type: DataTypes.STRING(100),
                defaultValue: null
            },
            createdAt: {
                type: DataTypes.DATE(6),
                defaultValue: DataTypes.NOW
            },
            updatedAt: {
                type: DataTypes.DATE(6),
                defaultValue: DataTypes.NOW,
                onUpdate: DataTypes.NOW
            }
        },
        {
            sequelize,
            modelName: 'showrooms',
            timestamps: true
        }
    );
    return Showroom;
};
