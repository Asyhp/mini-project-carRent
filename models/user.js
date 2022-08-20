'use strict';
const { Model } = require('sequelize');
const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasOne(models.orderItem, {
        foreignKey: 'userId',
        as: 'myItem'
      })
      User.belongsToMany(models.Product, {
        through: models.wishlist,
        as: 'product_wishlist',
        foreignKey: 'userId',
        otherKey: 'productId'
      })
      User.belongsToMany(models.Product, {
        through: models.payment,
        as: 'product_payment',
        foreignKey: 'userId',
        otherKey: 'productId'
      })
      User.hasMany(models.order, {
        foreignKey: 'userId',
        as: 'myOrder'
      })
    }
  }
  User.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(),
      allowNull: false,
      validate: {
        notNull: {msg: 'cannot be null'}
      }
    },
    email: {
      type: DataTypes.STRING(),
      allowNull: false,
      unique: true,
      validate: {
        isEmail: {
          args: true,
          msg: 'email not valid'
        },
        notNull: {msg: 'cannot be null'}
      }
    },
    password: {
      type: DataTypes.STRING(20),
      allowNull: false,
      validate: {
        len: {
          args: [8],
          msg: 'password minimal 8 character'
        },
        notNull: {msg: 'cannot be null'}
      }
    },
    address: {
      type: DataTypes.STRING(),
    },
    role: {
      type: DataTypes.ENUM,
      values: ['admin', 'user'],
      defaultValue: 'user'
    }
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'Users',
  });
  return User;
};
