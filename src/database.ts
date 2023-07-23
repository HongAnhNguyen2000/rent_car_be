import mysql from "mysql2";
import dotenv from "dotenv";

dotenv.config()

const database = mysql.createPool({
    host: process.env.MYSQL_HOST ,
    user: process.env.MYSQL_USER ,
    database: process.env.MYSQL_DATABASE,
    password: process.env.MYSQL_PASSWORD ,
}).promise();

export default database;
