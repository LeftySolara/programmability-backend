import DatabaseModel from "@components/database/databaseModel";
import { DataTypes } from "sequelize";

class BoardCategoryModel extends DatabaseModel {
  declare boardCategoryId: number;
}

BoardCategoryModel.init(
  {
    boardCategoryId: {
      field: "boardCategoryId",
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      field: "title",
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    uuid: DatabaseModel.defaultFields.uuidField,
    slug: DatabaseModel.defaultFields.slugField,
  },
  {
    ...DatabaseModel.defaultInitOptions,
    modelName: "BoardCategory",
    tableName: "BoardCategory",
  },
);

BoardCategoryModel.afterCreate(
  "generateSlug",
  async (boardCategory, options) => {
    await boardCategory.update(
      { slug: BoardCategoryModel.generateSlug(boardCategory.uuid) },
      {
        where: {
          boardCategoryId: boardCategory.boardCategoryId,
        },
        transaction: options.transaction,
      },
    );
  },
);

export default BoardCategoryModel;
