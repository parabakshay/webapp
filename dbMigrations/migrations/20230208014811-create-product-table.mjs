export const up = async ({ context: { sequelize, DataTypes } }) => {
  await sequelize.getQueryInterface().createTable('product', {
    'id': {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    'name': {
      type: DataTypes.STRING,
      allowNull: false
    },
    'description': {
      type: DataTypes.STRING,
      allowNull: false
    },
    'sku': {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    'manufacturer': {
      type: DataTypes.STRING,
      allowNull: false,
    },
    'quantity': {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    'date_added': {
      type: 'TIMESTAMP',
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
    },
    'date_last_updated': {
      type: 'TIMESTAMP',
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'),
    },
    'owner_user_id': {
      type: DataTypes.INTEGER,
      references: {
        model: 'user', // Can be both a string representing the table name or a Sequelize model
        key: 'id'
      }
    }
  });
}

export const down = async ({ context: { sequelize } }) => {
  await sequelize.getQueryInterface().dropTable('product');
}