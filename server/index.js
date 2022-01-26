const express = require("express");
const app = express();
const PORT = 3001;

const cors = require("cors");

// server측에서 데이터를 json 형식으로 받을때 필요하다
app.use(express.json());
// client측에서 npm start를통헤  브라우져에 화면을 띄울때 나올 수 있는 cors문제 해결을 위해 필요
app.use(cors());

const db = require("./models");

//Routers -> routes folder속에 있는 파일들을 연결을 해주는 역할
const postRouter = require("./routes/Posts");

// ./posts로 연결하면 안된다 -> local에 연결되지 않음
app.use("/posts", postRouter);

const commmentRouter = require("./routes/Comments");

// ./comments 연결하면 안된다 -> local에 연결되지 않음
app.use("/comments", commmentRouter);

const usersRouter = require("./routes/Users");

// ./auth 연결하면 안된다 -> local에 연결되지 않음
app.use("/auth", usersRouter);

db.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`server is running on ${PORT}`);
  });
});
