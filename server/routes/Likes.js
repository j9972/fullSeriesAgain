const express = require("express");
const { validateToken } = require("../middleware/AuthMiddleware");
const router = express.Router();
// endpoint를 지정해줘야 하는데 이를 하는데 있어서 express와 router 연결이 팔요함

// table - Likes
const { Likes } = require("../models");

router.post("/", validateToken, async (req, res) => {
  // UserId는 validateToken 때문에 필요하지 않다. -> user를 구별해 주므로,
  const { PostId } = req.body;
  const UserId = req.user.id; // AuthMiddleware에서 가져옴

  // user를 먼저 확인 하고 그 유저가 그 post를 좋아하고 안좋아하고 toggle형식으로 만들어줌.
  const found = await Likes.findOne({ where: { PostId, UserId } });
  if (!found) {
    // postman에서 할때는 body - json에는 PostId값만 주고 UserId는 accessToken을 header에 넣어주면 된다
    await Likes.create({
      PostId,
      UserId,
    });
    res.json({ liked: true });
  } else {
    await Likes.destroy({
      where: {
        PostId,
        UserId,
      },
    });
    res.json({ liked: false });
  }
});

module.exports = router;
