import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

export default (sequelize, DataTypes) => {
  const Faculty = sequelize.define(
    "Faculty",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING(255),
        allowNull: false,
        validate: {
          notEmpty: true,
          len: [1, 255],
        },
      },
      title: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      department: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      image: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      isDeleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        field: "is_deleted",
      },
    },
    {
      tableName: "faculty",
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
      // Add a default scope to exclude deleted records
      defaultScope: {
        where: {
          isDeleted: false,
        },
      },
      // Add scopes for different queries
      scopes: {
        withDeleted: {
          where: {},
        },
        onlyDeleted: {
          where: {
            isDeleted: true,
          },
        },
      },
    }
  );

  return Faculty;
};
