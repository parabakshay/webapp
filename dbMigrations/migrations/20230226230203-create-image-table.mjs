// 'use strict';

// /** @type {import('sequelize-cli').Migration} */
// module.exports = {
//   async up(queryInterface, Sequelize) {
//     /**
//      * Add altering commands here.
//      *
//      * Example:
//      * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
//      */
//     const transaction = await queryInterface.sequelize.transaction();
//     try {
//       await queryInterface.createTable('image', {
//         'image_id': {
//           type: Sequelize.INTEGER,
//           allowNull: false,
//           primaryKey: true,
//           autoIncrement: true,
//         },
//         'product_id': {
//           type: Sequelize.INTEGER,
//           references: {
//             model: 'product', // Can be both a string representing the table name or a Sequelize model
//             key: 'id'
//           }
//         },
//         'file_name': {
//           type: Sequelize.STRING,
//           allowNull: true
//         },
//         'date_created': {
//           type: 'TIMESTAMP',
//           allowNull: false,
//           defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
//         },
//         's3_bucket_path': {
//           type: Sequelize.STRING,
//           allowNull: true
//         }
//       }, {
//         uniqueKeys: {
//           product_id_image_id_unique: {
//             fields: ['product_id', 'image_id']
//           }
//         },
//       }, {
//         transaction
//       });
//       await queryInterface.addIndex('image', ['product_id'], { transaction });
//       await transaction.commit();
//     } catch (err) {
//       await transaction.rollback();
//     }
//   },

//   async down(queryInterface, Sequelize) {
//     /**
//      * Add reverting commands here.
//      *
//      * Example:
//      * await queryInterface.dropTable('users');
//      */
//     await queryInterface.dropTable('image');
//   }
// };
// import Sequelize from 'sequelize';
export const up = async ({
  context: {
    sequelize,
    DataTypes
  }
}) => {
  const transaction = await sequelize.transaction();
  try {
    await sequelize.getQueryInterface().createTable('image', {
      'image_id': {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      'product_id': {
        type: DataTypes.INTEGER,
        references: {
          model: 'product', // Can be both a string representing the table name or a Sequelize model
          key: 'id'
        }
      },
      'file_name': {
        type: DataTypes.STRING,
        allowNull: true
      },
      'date_created': {
        type: 'TIMESTAMP',
        allowNull: false,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
      },
      's3_bucket_path': {
        type: DataTypes.STRING,
        allowNull: true
      }
    }, {
      uniqueKeys: {
        product_id_image_id_unique: {
          fields: ['product_id', 'image_id']
        }
      },
    }, {
      transaction
    });
    await sequelize.getQueryInterface().addIndex('image', ['product_id'], {
      transaction
    });
    await transaction.commit();
  } catch (err) {
    console.log(err);
    await transaction.rollback();
  }
}

export const down = async ({
  context: {
    sequelize
  }
}) => {
  await sequelize.getQueryInterface().dropTable('image');
}
