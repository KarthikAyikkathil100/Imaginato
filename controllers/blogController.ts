import { defaultPage, defaultPerPage } from './../Constants/constants';
import { RequestHandler } from "express";
import { Connection } from "mysql2/promise";
let connection: Connection

export const createBlog = async (req: any, res: any) => {
    const connection = (process as any).db_connection;
    try {
      const { nickname, content, title } = req.body;
      if (!nickname || !content || !title) {
        return res.send({
          error: "nickname, content and title are required.",
        });
      }
      const [result, err] = await connection.execute(
        "INSERT INTO blogs (nickname, title, content, createdAt) VALUES(?,?,?,?)",
        [nickname, title, content, new Date()]
      );
      // fetch the newly created record
      const [new_doc] = await connection.query(
        `select * from blogs where id = ${result.insertId}`
      );
      if (!new_doc || new_doc.length !== 1) {
        return res.send({
          error: "Error while fetching blog.",
        });
      }
      res.send({
        data: new_doc[0],
      });
    } catch (e) {
      res.status(500).send({
        error: "Error while creating blog",
      });
    }
}

export const getBlogList = async (req: any, res: any) => {
    try {
      let connection: Connection = (process as any).db_connection;
      let query = "select * from blogs";
      let page = defaultPage;
      let perPage = defaultPerPage;
      if (req.query.page) page = parseInt(req.query.page as string);
      if (req.query.per_page) perPage = parseInt(req.query.per_page as string);
      const offset = (page - 1) * perPage;
  
      query += ` LIMIT ${offset}, ${perPage}`;
      const [result] = await connection.query(query);
      const countResult = await connection.query(
        'select count(*) as "count" from blogs'
      );
      res.send({
        data: result,
        metadata: {
          page,
          per_page: perPage,
          total: (countResult as any)[0][0].count,
        },
      });
    } catch (e) {
      res.status(500).send({
        error: "Error while fetching the blogs.",
      });
    }
}

export const getBlogDetail = async (req: any, res:any) => {
    try {
      let connection: Connection = (process as any).db_connection;
      const { id } = req.params;
      if (!id) {
        return res.send({
          error: "blog id is required",
        });
      }
      const query = `SELECT * FROM blogs where id=${id}`;
      const [result] = await connection.query(query);
      if(!(result as [any]).length) {
          return res.send({
              error: "Blog with given id was not found"
          })    
      }
      res.send({
        data: (result as [any])[0],
      });
    } catch (e) {
      res.status(500).send({
          error: "error while fetching the blog content"
      })
    }
}