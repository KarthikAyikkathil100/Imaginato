import express from "express"
import { getBlogComments, postComment } from "../controllers/commentController"
export const commentRouter = express.Router()

commentRouter.post("/", postComment)
commentRouter.get("/blog/:id", getBlogComments)