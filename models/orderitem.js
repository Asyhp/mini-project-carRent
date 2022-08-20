'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class orderItem extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      orderItem.belongsTo(models.Product, {
        foreignKey: 'productId',
        as: 'productDetails'
      })
      orderItem.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'tenant'
      })
      orderItem.belongsTo(models.order, {
        foreignKey: 'orderId',
        as: order
      })
    }
  }
  orderItem.init({
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
    status: {
      type: DataTypes.ENUM,
      values: ['cart', 'order', 'rented']
    },
    priceItem: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {msg: 'cannot be null'},
        isInt: {msg: 'price item must be number'}
      }
    },
    subTotalPrice: {
      type: DataTypes.INTEGER,
      validate: {
        isInt: {msg: 'price item must be number'}
      }
    },
  }, {
    sequelize,
    modelName: 'orderItem',
    tableName: 'orderItem',
    hooks: {
      beforeCreate: setSubTotalPrice,
      beforeUpdate: setSubTotalPrice
    }
  });
  return orderItem;

  function setSubTotalPrice(item, options) {
    item.subTotalPrice = item.priceItem * item.qty * item.lamaSewa;
  }
};

