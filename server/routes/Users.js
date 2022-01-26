const express = require("express");
const router = express.Router();
// endpoint를 지정해줘야 하는데 이를 하는데 있어서 express와 router 연결이 팔요함

const bcrypt = require("bcrypt");

// table - Posts
const { Users } = require("../models");

const { sign } = require("jsonwebtoken");

// post request를 테스트 하기 위해서는 postman을 사용하기
// inserting data를 하는데 sequelize가 편하며, 사용하면 된다. sequelize는 항상 async 이다
// 이 부분은 user를 만드는 부분에서 data를 접근
router.post("/", async (req, res) => {
  // front-end에 보내주는 데이터에 접근하기 위해서는 req에 body 부분이 필요
  // req.body를 통헤 post.title 등 db - talbe에 접근 가능
  // username, password는 독립적으로 이뤄줘야함
  const { username, password } = req.body;

  bcrypt.hash(password, 10).then((hash) => {
    // create로 db에 접근할 데이터를 만든다
    Users.create({
      username,
      password: hash,
    });
    res.json("success");
  });
});

// 만든 user를 통해 login 기능 구현 하는 파트
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  // 이렇게 하려면 username이 중복되면 안된다
  const user = await Users.findOne({ where: { username } });

  if (!user) {
    res.json({ error: "User doesnt exist" });
  }

  bcrypt.compare(password, user.password).then((match) => {
    if (!match) {
      res.json({ error: "wrong username and password combination" });
    }

    // 파라미터에는 token이 들어가야 한다., user은 username을 통해 존재의 유무를 알 수 있도록 선언한 변수
    // token의 사용예시를 보면, 누가 어떤 댓글을 남겼는지 등 user 자체를 구분하기 위해서이다.
    // token의 생성은 f12 -> application -> storage부분을 확인
    const accessToken = sign(
      { username: user.username, id: user.id },
      "importantSecretForSecurity"
    );

    res.json(accessToken);
  });
});

module.exports = router;
