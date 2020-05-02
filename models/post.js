/* eslint-disable semi */
module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define("User", {
    userID: DataTypes.INTEGER,
    post_title: DataTypes.STRING,
    post_content: DataTypes.STRING,
    post_image: DataTypes.STRING
  }, {});
  Post.associate = function (models) {
    // associations can be defined here
    Post.belongsTo(models.user, {
      foreignKey: {
        allowNull: false
      }
    });
  };
  return Post;
}
