import { Request, Response } from "express";
//C
export function createBlog (req: Request, res: Response) {
    res.send(`Blog Created with id: ${req.body['id']}`);
    console.log(req.body['id'])
}

//R
export function readBlogById (req: Request, res: Response) {
    res.send("Blog with id:")
}
export function readBlogByRange (req: Request, res: Response) {
    res.send("Blogs of range:")
}

//U
export function updateBlogById (req: Request, res: Response) {
    res.send("Blog updated with id:")
}

//D
export function deleteBlogById (req: Request, res: Response) {
    res.send("Blog deleted with id:")
}