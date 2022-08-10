import express, { Errback } from "express";
import dotev from "dotenv";
import { createDBConnection } from "./db_config";
import { commentRouter } from "./routes/commentRouter";
import { blogRouter } from "./routes/blogRouter";
dotev.config();
export const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const port = process.env.PORT || 3001;

app.use("/blog", blogRouter)
app.use("/comment", commentRouter)

app.listen(port, async () => {
  console.log("Started server at port ", port);
  await createDBConnection();
});
