module.exports = function(sequelize, DataTypes) {
  const Search = sequelize.define("Search", {
    songTitle: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    artist: {
      type: DataTypes.TEXT,
      allowNull: false,
      len: [1]
    }
  });
  Search.associate = function(models) {
    models.Search.belongsTo(models.User, {
      onDelete: "CASCADE",
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Search;
};
