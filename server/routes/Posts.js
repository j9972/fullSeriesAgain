const express = require("express");
const router = express.Router();
// endpoint를 지정해줘야 하는데 이를 하는데 있어서 express와 router 연결이 팔요함

// table - Posts
const { Posts } = require("../models");

router.get("/", async (req, res) => {
  // table에 있는 데이터를 가져와 보자
  const listOfPosts = await Posts.findAll(); // table명.findAll() -> table의 모든 데이터를 가져옴
  res.json(listOfPosts);
});

// post request를 테스트 하기 위해서는 postman을 사용하기
// inserting data를 하는데 sequelize가 편하며, 사용하면 된다. sequelize는 항상 async 이다
router.post("/", async (req, res) => {
  // front-end에 보내주는 데이터에 접근하기 위해서는 req에 body 부분이 필요
  // req.body를 통헤 post.title 등 db - talbe에 접근 가능
  const post = req.body;
  await Posts.create(post); // create로 우리가 가져온 데이터 즉, req.body를 post테이블에 넣을 수 있다
  res.json(post);
});

module.exports = router;