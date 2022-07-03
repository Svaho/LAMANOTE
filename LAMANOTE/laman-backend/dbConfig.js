const dotenv = require("dotenv")
dotenv.config();
const mysql = require("mysql2");
const conn = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
})

conn.connect((err) => {
    if (err) throw err;
    console.log("database successfully connected");
});

module.exports = conn;