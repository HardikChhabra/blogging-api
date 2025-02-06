import express, {json, urlencoded} from "express";
import blogRouter from './routes/blogs/route'
const port = 3000;
const app = express();
app.use(urlencoded({extended: false}));
app.use(json())


app.use('/blog', blogRouter);

app.listen(port, () => {
    console.log('Listening to port:', port);
})