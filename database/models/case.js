module.exports = (sequelize, DataTypes) => {
  const Case = sequelize.define(
    'case',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV1,
        primaryKey: true,
        allowNull: false,
      },
      schema: {
        allowNull: false,
        type: DataTypes.JSONB,
      },
      isApproved: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      supervisedBy: {
        allowNull: false,
        type: DataTypes.UUID,
        references: {
          model: 'user',
          key: 'id',
        },
      },
      surveyId: {
        allowNull: false,
        type: DataTypes.UUID,
        references: {
          model: 'survey',
          key: 'id',
        },
      },
      createdBy: {
        allowNull: false,
        type: DataTypes.UUID,
        references: {
          model: 'user',
          key: 'id',
        },
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        allowNull: false,
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

  Case.associate = (models) => {
    Case.belongsTo(models.user, { foreignKey: 'createdBy' });
    Case.belongsTo(models.user, { foreignKey: 'supervisedBy' });
    Case.belongsTo(models.survey, { foreignKey: 'surveyId' });
    Case.hasMany(models.case, { foreignKey: 'caseId' });
  };

  return Case;
};
