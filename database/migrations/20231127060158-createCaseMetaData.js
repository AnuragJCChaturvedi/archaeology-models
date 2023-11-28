'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.createTable('caseMetaData', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
      },
      schema: {
        allowNull: false,
        type: Sequelize.JSONB,
      },
      isApproved: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      caseId: {
        allowNull: false,
        type: Sequelize.UUID,
        references: {
          model: 'case',
          key: 'id',
        },
      },
      supervisedBy: {
        allowNull: false,
        type: Sequelize.UUID,
        references: {
          model: 'user',
          key: 'id',
        },
      },
      createdBy: {
        allowNull: false,
        type: Sequelize.UUID,
        references: {
          model: 'user',
          key: 'id',
        },
      },
      isActive: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('caseMetaData');
  },
};
