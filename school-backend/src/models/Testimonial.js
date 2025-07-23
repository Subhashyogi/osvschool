import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

export default (sequelize, DataTypes) => {
  const Testimonial = sequelize.define(
    "Testimonial",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      avtar: {
        type: DataTypes.STRING(255),
        allowNull: true,
        comment: "Path to testimonial avatar image",
      },
      name: {
        type: DataTypes.STRING(255),
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Name is required",
          },
          len: {
            args: [1, 255],
            msg: "Name must be between 1 and 255 characters",
          },
        },
      },
      title: {
        type: DataTypes.STRING(255),
        allowNull: true,
        validate: {
          len: {
            args: [0, 255],
            msg: "Title must be less than 255 characters",
          },
        },
      },
      quote: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Quote is required",
          },
          len: {
            args: [1, 1000],
            msg: "Quote must be between 1 and 1000 characters",
          },
        },
      },
      isDeleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        field: "is_deleted",
      },
    },
    {
      tableName: "testimonial",
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
      // Default scope excludes soft deleted records
      defaultScope: {
        where: {
          isDeleted: false,
        },
      },
      // Define scopes for including/excluding deleted records
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

  return Testimonial;
};
