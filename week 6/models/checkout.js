'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class checkout extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  checkout.init({
    order_id: DataTypes.STRING,
    id_user: DataTypes.STRING,
    id_product: DataTypes.STRING,
    quantity: DataTypes.INTEGER,
    status: DataTypes.STRING,
    va_number: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'checkout',
  });
  return checkout;
};