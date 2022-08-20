'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      order.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'renter'
      })
      order.hasMany(models.orderItem, {
        foreignKey: 'orderId',
        as: 'listOrderItem'
      })
    }
  }
  order.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    status: {
      type: DataTypes.ENUM,
      values: ['unpayed', 'payed']
    },
    totalPrice: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {msg: 'cannot be null'},
        isInt: {msg: 'total price must be number'}
      }
    }
  }, {
    sequelize,
    modelName: 'order',
    tableName: 'orders'
  });
  return order;
};