const express = require("express");
const router = express.Router();
// endpoint를 지정해줘야 하는데 이를 하는데 있어서 express와 router 연결이 팔요함

const { validateToken } = require("../middleware/AuthMiddleware");
// { validateToken } 이렇게 해야함 -> module.exports = { validateToken }
// ->Error: Route.get() requires a callback function but got a [object Object] 이러 에러남

// table - Posts, Likes
const { Posts, Likes } = require("../models");

// 여기서 validateToken를 쓰는 이유는 user를 구분해서 각기 다른 유저가 좋아요를 눌렀을때 like 양의 변화를 위함
router.get("/", validateToken, async (req, res) => {
  // table에 있는 데이터를 가져와 보자 + Like TABLE과 연결 지어서 데이터를 가져옴
  const listOfPosts = await Posts.findAll({ include: [Likes] });
  // table명.findAll() -> table의 모든 데이터를 가져옴

  // like버튼을 누를떄 안누를때를 비교하기 위한 코드 -> 하나의 버튼으로 체크하기 위해서
  const likedPosts = await Likes.findAll({ where: { UserId: req.user.id } });
  res.json({ listOfPosts, likedPosts });
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
// validateToken -> username을 대체할 수 있다.
router.post("/", validateToken, async (req, res) => {
  // front-end에 보내주는 데이터에 접근하기 위해서는 req에 body 부분이 필요
  // req.body를 통헤 post.title 등 db - talbe에 접근 가능
  const post = req.body;
  post.username = req.user.username; // username field를 지우고 이로 대체한다
  post.UserId = req.user.id; // post 테이블의 userId가 null이 아닌 각각 값을 준다 success
  // create부분은 sequelize 부분이다
  await Posts.create(post); // create로 우리가 가져온 데이터 즉, req.body를 post테이블에 넣을 수 있다
  res.json(post);
});

// router.post("/") 와 유사
// validateToken을 이용해서 각 게시물을 누가 작성했는지도 알고 각각의 new version으로 update
router.put("/title", validateToken, async (req, res) => {
  const { newTitle, id } = req.body; // 각각의 post들의 id들에 따른 post title
  await Posts.update({ title: newTitle }, { where: { id } });
  res.json(newTitle);
});

// router.post("/") 와 유사
router.put("/postText", validateToken, async (req, res) => {
  const { newText, id } = req.body; // 각각의 post들의 id들에 따른 post title
  await Posts.update({ postText: newText }, { where: { id } });
  res.json(newText);
});

// same way with delete commendId
router.delete("/:postId", validateToken, async (req, res) => {
  const postId = req.params.postId;

  await Posts.destroy({
    where: {
      id: postId,
    },
  });

  res.json("DELETE SUCCESS");
});

// profile에 들어갔을때 그 user가 적은 모든 post들을 보여주고자 함
// byuserid의 params는 각기 post가 가지는 UserID를 판단해서 알 수 있음
router.get("/byuserId/:id", async (req, res) => {
  const id = req.params.id;
  // findByPk 는 primary key로 데이터를 가져온다는건데 id가 각 post들을 구별해주는 key가 되는것이다
  const listOfPosts = await Posts.findAll({
    where: { UserId: id },
    include: [Likes],
  });
  res.json(listOfPosts);
});

module.exports = router;
