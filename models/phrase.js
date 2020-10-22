module.exports = function(sequelize, DataTypes) {
  const Phrase = sequelize.define("Phrase", {
    saying: {
      type: DataTypes.TEXT,
      allowNull: false,
      len: [1]
    }
  });

  Phrase.associate = function(models) {
    // We're saying that a Phrase should belong to an Author
    // A Phrase can't be created without an Author due to the foreign key constraint
    models.Phrase.belongsTo(models.User, {
      onDelete: "CASCADE",
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Phrase;
};
