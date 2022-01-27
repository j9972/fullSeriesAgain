module.exports = (sequelize, DataTypes) => {
  const Likes = sequelize.define("Likes");

  return Likes;
};

// Likes는 id만 있으면 할 수 있고, 이걸 post comment table이랑 연결만 하면 된다
