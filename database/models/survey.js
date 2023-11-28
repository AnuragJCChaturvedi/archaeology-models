module.exports = (sequelize, DataTypes) => {
  const Survey = sequelize.define(
    'survey',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV1,
        primaryKey: true,
        allowNull: false,
      },
      name: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      schema: {
        allowNull: false,
        type: DataTypes.JSONB,
      },
      createdBy: {
        allowNull: false,
        type: DataTypes.UUID,
        references: {
          model: 'user',
          key: 'id',
        },
      },
      updatedBy: {
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

  Survey.associate = (models) => {
    Survey.belongsTo(models.user, { foreignKey: 'createdBy' });
    Survey.belongsTo(models.user, { foreignKey: 'updatedBy' });
    Survey.hasMany(models.surveyMetaData, { foreignKey: 'surveyId' });
  };

  return Survey;
};
