module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define("Users", {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  // associate와 hasMany로 Comment와 연결해준다 -> Comment 부분의 db column중에 postid가 생김
  // 1. associate 는 다른 모델과의 관계를 적는다.
  // 2. hasMany는 관계성을 갖는 데이터 사이의 처리를 위한것인데 1:n의 관계에서 사용
  Users.associate = (models) => {
    Users.hasMany(models.Likes, {
      onDelete: "cascade",
    });
  };

  return Users;
};
