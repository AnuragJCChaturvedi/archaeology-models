const bcrypt = require('bcrypt');
const config = require('../config/config.json');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'user',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV1,
        primaryKey: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
      },
      email: {
        type: DataTypes.STRING,
      },
      password: {
        type: DataTypes.STRING,
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        allowNull: false,
      },
      roleId: {
        type: DataTypes.UUID,
        references: {
          model: 'role',
          key: 'id',
        },
        allowNull: false,
      },
      isDeleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
      },
      signupToken: {
        type: DataTypes.TEXT,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    },
    {
      freezeTableName: true,
      timestamps: true,
    }
  );

  //   Customer.associate = (models) => {
  //     Customer.hasOne(models.teamMember);
  //     Customer.hasMany(models.teamBotLocationAccess);
  //     Customer.hasMany(models.emailMessage);
  //     Customer.hasMany(models.customerNotification);
  //     Customer.hasMany(models.pinnedConversation, { foreignKey: 'customerId' });
  //   };

  //   const setSaltAndPassword = async (customer) => {
  //     if (customer.changed('password')) {
  //       const salt = await bcrypt.genSaltAsync(config.saltRounds);
  //       customer.password = await bcrypt.hashAsync(customer.password, salt);
  //     }
  //   };

  //   Customer.beforeCreate(setSaltAndPassword);
  //   Customer.beforeUpdate(setSaltAndPassword);

  User.associate = (models) => {
    User.belongsTo(models.role, { foreignKey: 'roleId' });
    User.hasMany(models.case, { foreignKey: 'createdBy' });
    User.hasMany(models.case, { foreignKey: 'supervisedBy' });
    User.hasMany(models.survey, { foreignKey: 'createdBy' });
    User.hasMany(models.survey, { foreignKey: 'updatedBy' });
    User.hasMany(models.caseMetaData, { foreignKey: 'createdBy' });
    User.hasMany(models.caseMetaData, { foreignKey: 'supervisedBy' });
    User.hasMany(models.surveyMetaData, { foreignKey: 'createdBy' });
    User.hasMany(models.surveyMetaData, { foreignKey: 'supervisedBy' });
  };

  return User;
};
