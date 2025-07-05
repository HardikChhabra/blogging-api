import express, { json, urlencoded } from "express";
import blogRouter from "./routes/blogs/route.js";
import authRouter from "./routes/auth/route.js";
import commentRouter from "./routes/comments/route.js";
import cors from "cors";
import { marked } from "marked";
import hljs from "highlight.js";
import fs from "fs";

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

marked.setOptions({
  //@ts-ignore
  highlight: function (code, lang) {
    const language = hljs.getLanguage(lang) ? lang : "plaintext";
    return hljs.highlight(code, { language }).value;
  },
});
app.get("/", (req, res) => {
  const readmePath = "README.md";
  fs.readFile(readmePath, "utf8", (err, data) => {
    if (err) return res.status(500).json({ error: "Could not read README" });
    const htmlContent = marked(data);
    res.send(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>README</title>
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/github-markdown-css/5.2.0/github-markdown-light.min.css" />
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/github.min.css" />
          <style>
            body {
              background: #f6f8fa;
              padding: 2rem;
              display: flex;
              justify-content: center;
            }
            .markdown-body {
              background: white;
              padding: 2rem;
              border-radius: 10px;
              max-width: 800px;
              width: 100%;
              box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
            }
          </style>
        </head>
        <body>
          <article class="markdown-body">
            ${htmlContent}
          </article>
        </body>
      </html>
    `);
  });
});

app.use("/auth", authRouter);
app.use("/blog", blogRouter);
app.use("/comment", commentRouter);

app.listen(port, () => {
  console.log("Listening to port:", port);
});

/* export default app; */
