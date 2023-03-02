export const up = async ({ context: { sequelize, DataTypes } }) => {
  await sequelize.getQueryInterface().createTable('user', {
    'id': {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    'first_name': {
      type: DataTypes.STRING,
      allowNull: false
    },
    'last_name': {
      type: DataTypes.STRING,
      allowNull: false
    },
    'password': {
      type: DataTypes.STRING,
      allowNull: false
    },
    'username': {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    'account_created': {
      type: 'TIMESTAMP',
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
    },
    'account_updated': {
      type: 'TIMESTAMP',
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'),
    }
  });
}

export const down = async ({ context: { sequelize } }) => {
  await sequelize.getQueryInterface().dropTable('user');
}