module.exports = (sequelize, DataTypes) => {
  const CaseMetaData = sequelize.define(
    'caseMetaData',
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
      caseId: {
        allowNull: false,
        type: DataTypes.UUID,
        references: {
          model: 'case',
          key: 'id',
        },
      },
      supervisedBy: {
        allowNull: false,
        type: DataTypes.UUID,
        references: {
          model: 'user',
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

  CaseMetaData.associate = (models) => {
    CaseMetaData.belongsTo(models.user, { foreignKey: 'createdBy' });
    CaseMetaData.belongsTo(models.user, { foreignKey: 'supervisedBy' });
    CaseMetaData.belongsTo(models.case, { foreignKey: 'caseId' });
  };

  return CaseMetaData;
};
