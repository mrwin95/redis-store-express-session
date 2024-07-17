const { default: RedisStore } = require("connect-redis");
const express = require("express");
const express_session = require("express-session");
const redis = require("ioredis");
const redisClient = redis.createClient();

// initial redisStore

const redisStore = new RedisStore({
  client: redisClient,
  prefix: "redis",
});

const app = express();
// app.set('trust proxy', 1);
app.use(
  express_session({
    saveUninitialized: true,
    secret: "123",
    store: redisStore,
    resave: true,
    cookie: {
      httpOnly: true,
      secure: false,
      maxAge: 5 * 60 * 1000,
    },
  })
);
app.get("/", (req, res) => {});

app.get("/get-session", (req, res) => {
  res.send(req.session);
});

app.get("/set-session", (req, res) => {
  req.session.user = {
    username: "Thang",
    age: 40,
    email: "thang@gmail.com",
  };
  res.send("Set Ok");
});

app.listen(3001, () => {
  console.log(`Server started`);
});
