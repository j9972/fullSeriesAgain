module.exports = (sequelize, DataTypes) => {
  const Comments = sequelize.define("Comments", {
    commentBody: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  return Comments;
};

// Posts.js model 파일과 assciate해야한다. 각각의 post에는 각기 다른 comment가 생겨서
