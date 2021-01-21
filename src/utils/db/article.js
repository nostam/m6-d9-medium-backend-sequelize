module.exports = (sequelize, DataTypes) => {
  const Article = sequelize.define(
    "article",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      headLine: {
        type: DataTypes.STRING(200),
        allowNull: false,
      },
      subHead: {
        type: DataTypes.STRING(200),
      },
      content: { type: DataTypes.TEXT, allowNull: false },
      categoryId: { type: DataTypes.INTEGER, allowNull: false },
      authorId: { type: DataTypes.INTEGER, allowNull: false },
      cover: { type: DataTypes.TEXT },
    },
    { timestamps: true }
  );

  Article.associate = (models) => {
    Article.belongsTo(models.Category, { through: models.Category });
    Article.belongsTo(models.Author, { through: models.Author });
    Article.hasMany(models.Review);
    Article.belongsToMany(models.Author, { through: models.Clap });
  };

  return Article;
};
