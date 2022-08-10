import { createBlog, getBlogDetail, getBlogList } from './../controllers/blogController';
import express from "express"
export const blogRouter = express.Router()

blogRouter.post("/", createBlog)
blogRouter.get("/", getBlogList)
blogRouter.get("/:id", getBlogDetail)
