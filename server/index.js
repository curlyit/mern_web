require("dotenv").config();
const express = require("express");
const connectDB = require("./connectDB");
const cors = require("cors");
const authRouter = require("./routes/auth");
const postRouter = require("./routes/post");
const PORT = process.env.PORT || 5000;

connectDB();
const app = express();
app.use(express.json());
//app.use(cors());

app.use(
  cors({
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204,
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use("/api/auth", authRouter);
app.use("/api/posts", postRouter);

app.listen(PORT, () => {
  console.log(`Server start on port http://localhost:${PORT}`);
});
