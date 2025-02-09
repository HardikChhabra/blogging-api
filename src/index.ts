import express, { json, urlencoded } from "express";
import blogRouter from "./routes/blogs/route";
import authRouter from "./routes/auth/route";
import commentRouter from "./routes/comments/route";
const port = 3000;
const app = express();
app.use(urlencoded({ extended: false }));
app.use(json());
app.use("/auth", authRouter);
app.use("/blog", blogRouter);
app.use("/comment", commentRouter);

app.listen(port, () => {
  console.log("Listening to port:", port);
});
