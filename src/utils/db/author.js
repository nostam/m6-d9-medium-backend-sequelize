module.exports = (sequelize, DataTypes) => {
  const Author = sequelize.define(
    "author",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      surname: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      img: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    { timestamps: true }
  );
  Author.associate = (models) => {
    // Author.belongsToMany(models.Article, {
    //   through: { model: models.Author_Article },
    // });
    Author.hasMany(models.Article);
    Author.belongsToMany(models.Article, {
      through: { model: models.Clap, unique: false },
    });
  };
  return Author;
};
