const express = require("express");
const router = express.Router();
// endpoint를 지정해줘야 하는데 이를 하는데 있어서 express와 router 연결이 팔요함

// table - Posts, Likes
const { Posts, Likes } = require("../models");

router.get("/", async (req, res) => {
  // table에 있는 데이터를 가져와 보자 + Like TABLE과 연결 지어서 데이터를 가져옴
  const listOfPosts = await Posts.findAll({
    include: [Likes],
  }); // table명.findAll() -> table의 모든 데이터를 가져옴
  res.json(listOfPosts);
});

// server 측의 브라우져에서 어떤 post를 띄어주려면, endpoint를 잘 따라야 한다
router.get("/byId/:id", async (req, res) => {
  const id = req.params.id;
  // findByPk 는 primary key로 데이터를 가져온다는건데 id가 각 post들을 구별해주는 key가 되는것이다
  const post = await Posts.findByPk(id);
  res.json(post);
});

// post request를 테스트 하기 위해서는 postman을 사용하기
// inserting data를 하는데 sequelize가 편하며, 사용하면 된다. sequelize는 항상 async 이다
// validateToken이 생김으로써, 글을 쓰는 사람이 누군인지, validateToken가 없으면 글을 못쓰게 한다
router.post("/", async (req, res) => {
  // front-end에 보내주는 데이터에 접근하기 위해서는 req에 body 부분이 필요
  // req.body를 통헤 post.title 등 db - talbe에 접근 가능
  const post = req.body;
  // create부분은 sequelize 부분이다
  await Posts.create(post); // create로 우리가 가져온 데이터 즉, req.body를 post테이블에 넣을 수 있다
  res.json(post);
});

module.exports = router;
