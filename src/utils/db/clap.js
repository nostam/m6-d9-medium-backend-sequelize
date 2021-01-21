module.exports = (sequelize, DataTypes) => {
  const Clap = sequelize.define(
    "clap",
    {
      clap: { type: DataTypes.INTEGER },
    },
    { timestamps: false }
  );
  Clap.associate = (models) => {
    Clap.belongsTo(models.Author);
    Clap.belongsTo(models.Article);
  };
  return Clap;
};
