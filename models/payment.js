'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class payment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      payment.belongsTo(models.User, {
        foreignKey: 'userId'
      })
      payment.belongsTo(models.Product, {
        foreignKey: 'productId'
      })
    }
  }
  payment.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    lamaSewa: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: {
          args: 1,
          msg: 'minimal 1 hari'
        },
        notNull: {msg: 'cannot be null'},
        isInt: {msg: 'lama sewa must be number'}
      }
    },
    qty: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: {
          args: 1,
          msg: 'minimal 1 buah'
        },
        notNull: {msg: 'cannot be null'},
        isInt: {msg: 'quantity must be number'}
      }
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {msg: 'cannot be null'},
        isInt: {msg: 'total price must be number'}
      }
    },
    status: {
      type: DataTypes.ENUM,
      values: ['cart', 'payment', 'rented', 'returned']
    },
  }, {
    sequelize,
    modelName: 'payment',
    tableName: 'payment'
  });
  return payment;
};