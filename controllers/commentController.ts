import { Connection } from "mysql2/promise";
import { nest } from "../services/services";
let connection: Connection

export const postComment = async (req: any, res:any) => {
    try {
        connection = (process as any).db_connection;
        const {nickname, content, parent_id, blog_id} = req.body
        if(!nickname || !content || !blog_id) {
            return res.send({
                error: "nickname, blog_id and content are required"
            })
        }
        const [result, err] = await connection.execute(
            "INSERT INTO comments (nickname, parent_id, blog_id, content, createdAt) VALUES(?,?,?,?,?)",
            [nickname, parent_id ? parent_id : null , blog_id, content, new Date()]
        )
        const newComment = await connection.query(`select * from comments where id = ${(<any>result).insertId}`)
        res.send({
            data: (<any>newComment)[0][0],
            error: err
        })
    } catch(e) {
        res.status(500).send({
            error: "Error while adding comment"
        })
    }
}

export const getBlogComments = async (req:any, res:any) => {
    try {
        connection = (process as any).db_connection;
        const {id} = req.params
        if(!id) {
            return res.send({
                error: "id(blog) is required"
            })
        }
        const [result] = await connection.query(`select * from comments where blog_id=${id}`)
        const finalRes = nest(result)
        res.send({
            data: finalRes,
        })
    } catch (e) {
        res.status(500).send({
            error: "Error while fetching comment"
        })
    }
}