module.exports = (sequelize, DataTypes) => {
  const Review = sequelize.define(
    "review",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      text: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      authorId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      articleId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    { timestamps: true }
  );
  Review.associate = (models) => {
    Review.belongsTo(models.Article, {
      through: { model: models.Author, unique: false },
    });
  };
  return Review;
};
