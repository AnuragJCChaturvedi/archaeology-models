module.exports = (sequelize, DataTypes) => {
  const SurveyMetaData = sequelize.define(
    'surveyMetaData',
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

  SurveyMetaData.associate = (models) => {
    SurveyMetaData.belongsTo(models.user, { foreignKey: 'createdBy' });
    SurveyMetaData.belongsTo(models.user, { foreignKey: 'supervisedBy' });
    SurveyMetaData.belongsTo(models.survey, { foreignKey: 'surveyId' });
  };

  return SurveyMetaData;
};
