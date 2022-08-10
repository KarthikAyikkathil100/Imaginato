import {createDBConnection} from "./db_config"

async function createTable() {
    try {
        // Creating connection
        const connection = await createDBConnection()

        // creating article/blog table
        await connection.execute(`CREATE TABLE blogs(id INT NOT NULL PRIMARY KEY AUTO_INCREMENT, nickname VARCHAR(255), title VARCHAR(255), content TEXT, createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP)`)

    // creating comment table
    await connection.execute(`
        CREATE TABLE comments(
            id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
            nickname VARCHAR(255),
            content TEXT,
            blog_id INT NOT NULL,
            parent_id INT,
            createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (parent_id) REFERENCES comments(id),
            FOREIGN KEY (blog_id) REFERENCES blogs(id)
        )
    `)

    console.log("Database tables migrations executed successfully.")
    } catch (e) {
        console.log('Error while executing database migrations.')
        console.log(e)
    } finally {
        process.exit()
    }
}

createTable()