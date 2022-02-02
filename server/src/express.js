const express = require("express");
import Template from "../template";
import movieRouter from "./routes/movie.routes";
import authRouter from "./routes/auth.routes";
import userRouter from "./routes/user.routes";
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());
app.use("/", userRouter);
app.use("/", authRouter);
app.use("/", movieRouter);

app.get("/", (req, res) => {
  res.status(200).send(Template());
});

app.use((err, req, res, next) => {
  if (err.name === "UnauthorizedError") {
    res.status(401).json({ error: "Unauthorized Access" });
  }
});

export default app;
