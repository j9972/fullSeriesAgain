const express = require("express");
const router = express.Router();
// endpoint를 지정해줘야 하는데 이를 하는데 있어서 express와 router 연결이 팔요함
// table - Comments
const { Comments } = require("../models");
const { validateToken } = require("../middleware/AuthMiddleware");

// Posts.js에 있는 각각의 post를 가리키는 id랑은 다른 id 인 즉 postId를 써야 각 post마다의 comment가 달린다
// server 측의 브라우져에서 어떤 post를 띄어주려면, endpoint를 잘 따라야 한다
// PostId는 db에서 post 테이블과 연결되어 생긴 column의 이름이다 . postId 랑 PostId랑은 다른것이다 주의
router.get("/:postId", async (req, res) => {
  const postId = req.params.postId;
  const comments = await Comments.findAll({
    where: {
      PostId: postId,
    },
  });
  res.json(comments);
});

// post method 같이 어떤 데이터를 보내려고 할때는 db에 어떤 column이 있는지 생각하고 그에 파생되서 보내야 한다
// postman에 적을 body 부분은 commentBody, PostId이다 -> 연결된 부분
// validateToken이 생김으로써, 댓글을 다는 사람이 누군인지, validateToken가 없으면 댓글을 못달게 한다
router.post("/", validateToken, async (req, res) => {
  const comment = req.body; // req.body가 우리가 적는 부분이며, db에 저장될 데이터다

  const username = req.user.username; // req.user은 validateToken에서 가져온 값으로 validToken값이다
  // user가 request에 대해서 접근이 가능하게 한다
  comment.username = username;
  // username도 db에 올라가게됨 -> 로그인이 되어있지 않으면 댓글을 못적고, 적을 수 있다면 누가 적었는지도 저장되게 함

  await Comments.create(comment); // await table이름.create(req.body);
  res.json(comment);
});

// endpoint는 중요하지 않고 지우고자 하는 댓글의 id를 알아야 함 -> each post each commendId
router.delete("/:commentId", validateToken, async (req, res) => {
  const commentId = req.params.commentId;

  await Comments.destroy({
    where: {
      id: commentId,
    },
  });

  res.json("DELETE SUCCESS");
});

module.exports = router;
