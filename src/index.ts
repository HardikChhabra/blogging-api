import express, { json, urlencoded } from "express";
import blogRouter from "./routes/blogs/route.js";
import authRouter from "./routes/auth/route.js";
import commentRouter from "./routes/comments/route.js";
import cors from "cors";
const port = 3000;
const app = express();
const corsOptions = {
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};
app.use(cors(corsOptions));
app.use(urlencoded({ extended: false }));
app.use(json());
app.use("/auth", authRouter);
app.use("/blog", blogRouter);
app.use("/comment", commentRouter);

/* app.listen(port, () => {
  console.log("Listening to port:", port);
}); */

export default app;
