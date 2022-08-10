import { Connection, createConnection } from 'mysql2/promise';
import dotenv from "dotenv"
dotenv.config()


export async function createDBConnection() {
    try {
        const connection = await createConnection({
            host: process.env.DB_HOST || 'localhost',
            user: process.env.DB_USER || 'root',
            password: process.env.DB_PASSWORD || 'mind',
            database: process.env.DB_NAME ||'test'
        });  
        (process as any).db_connection = connection
        console.log('Database connected successfully.')
        return connection
    } catch (err) {
        throw err
    }
}




