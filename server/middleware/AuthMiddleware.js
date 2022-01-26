// token을 위한 페이지이다 client 부분을 통함
// token이 필요항 파일들은 validatieToken의 변수를 호출해준다.

const { verify } = require("jsonwebtoken");

const validateToken = (req, res, next) => {
  // front -> back 으로 token 보내는 방법
  const accessToken = req.header("accessToken");

  if (!accessToken) {
    return res.json({ error: "user not logged in" });
  } else {
    try {
      // "importantSecretForSecurity" 이 부분은 routes의 user.js와 같이 같고 있어야 한다
      // sign - verify를 이으면서 token을 보낸다
      // Back에서 token을 생성하고 이 부분에서 user들의 token을 확인해 유저를 구분한다
      const validToken = verify(accessToken, "importantSecretForSecurity");

      if (validToken) {
        return next();
      }
    } catch (err) {
      res.json({ error: err });
    }
  }
};

module.exports = { validateToken };
