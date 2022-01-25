const express = require("express");
const app = express();
const PORT = 3001;

app.use(express.json());

const db = require("./models");

//Routers -> routes folder속에 있는 파일들을 연결을 해주는 역할
const postRouter = require("./routes/Posts");

// ./posts로 연결하면 안된다 -> local에 연결되지 않음
app.use("/posts", postRouter);

db.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`server is running on ${PORT}`);
  });
});
