import { Request, Response } from "express";
import { db } from "../../db/index";
import { blogs } from "../../db/schema";
import { eq } from "drizzle-orm";
//C
export async function createBlog (req: Request, res: Response) {
    try {
        const [newBlog] = await db.insert(blogs).values(req.body).returning();
        res.status(201).json(newBlog);
    } catch (error) {
        res.status(500).send(error);
    }
}

//R
export async function readBlogById (req: Request, res: Response) {
    try{
        const [blog] = await db.select().from(blogs).where(eq(blogs.blogId, req.params.id));
        if(!blog){
            res.status(204)
        } else {
            res.status(200).json(blog)
        }
    }catch(error){
        res.status(500).send(error)
    }
}
export async function readBlogByUser (req: Request, res: Response) {
    try{
        const allBlogs = await db.select().from(blogs).where(eq(blogs.userId, req.body.userId));
        if(allBlogs.length == 0){
            res.status(204)
        } else {
            res.status(200).json(allBlogs)
        }
    }catch(error){
        res.status(500).send(error)
    }
}
export async function readBlogByTitle (req: Request, res: Response) {
    try{
        const allBlogs = await db.select().from(blogs).where(eq(blogs.title, req.body.title));
        if(allBlogs.length == 0){
            res.status(204)
        } else {
            res.status(200).json(allBlogs)
        }
    }catch(error){
        res.status(500).send(error)
    }
}
export async function readBlogByRange (req: Request, res: Response) {
    try{
        const limit = Number(req.query.limit);
        const offset = Number(req.query.offset);
        const page = await db.select().from(blogs).limit(limit).offset(offset)
        if(page.length == 0){
            res.status(204)
        } else {
            res.status(200).json(page)
        }
    }catch(error){
        res.status(500).send(error)
    }
}

//U
export async function updateBlogById (req: Request, res: Response) {
    try{
        const updatedFeilds = req.body;
        const [updatedBlog] = await db.update(blogs).set(updatedFeilds).where(eq(blogs.blogId, req.params.id));
        if(!updatedBlog){
            res.status(404).send({message: "Blog not found"})
        } else {
            res.status(200).json(updatedBlog);
        }
    }catch(error){
        res.status(500).send(error)
    }
}

//D
export async function deleteBlogById (req: Request, res: Response) {
    try{
        const [deletedBlog] = await db.delete(blogs).where(eq(blogs.blogId, req.params.id)).returning();
        if(!deletedBlog){
            res.status(404).send({message: "Blog not found"})
        } else {
            res.status(204).send();
        }
    }catch(error){
        res.status(500).send(error)
    }
}