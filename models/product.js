'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product.belongsToMany(models.User, {
        through: models.wishlist,
        as: 'user_wishlist',
        foreignKey: 'productId',
        otherKey: 'userId'
      })
      Product.belongsToMany(models.User, {
        through: models.payment,
        as: 'user_payment',
        foreignKey: 'productId',
        otherKey: 'userId'
      })
      Product.hasMany(models.orderItem, {
        foreignKey: 'productId',
        as: 'productOrderItem'
      })
    }
  }
  Product.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    name: {
      type: DataTypes.STRING(),
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'name cannot be empty'
        },
        notNull: {msg: 'cannot be null'}
      }
    },
    details: {
      type: DataTypes.TEXT(),
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'details cannot be empty'
        },
        notNull: {msg: 'cannot be null'}
      }
    },
    img_url: {
      type: DataTypes.STRING,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {msg: 'cannot be null'},
        isInt: {msg: 'price must be number'}
      }
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {msg: 'cannot be null'},
        isInt: {msg: 'stock must be number'}
      }
    },
  }, {
    sequelize,
    modelName: 'Product',
    tableName: 'Products'
  });
  return Product;
};