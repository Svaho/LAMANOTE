const express = require('express');
const dotenv = require("dotenv")
dotenv.config();
const app = express();
const port = process.env.PORT;
const conn = require("./dbConfig");
const cors = require('cors');

var corsOptions = {
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204
}
  
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors(corsOptions));

app.get('/', (req, res) => {
    res.send("Welcome to Lama Todo app server")
})

app.post("/create-note", (req, res) => {
    const { note } = req.body
    console.log(note)
    var query = "INSERT INTO notes (note) VALUES (?)";
    conn.query(query, [note], (err, data, fields) => {
        if (err) throw err;
        res.status(200).json("Todo created");
    })
})

app.get('/notes', (req, res) => {
    const query = "SELECT * FROM notes";
    conn.query(query, (err, data) => {
        if (err) throw err;
        res.status(200).json(data)
    })
})

app.get('/note/:id', (req, res) => {
    const id = req.params.id;
    const query = `SELECT * FROM notes WHERE id = ${id}`;
    conn.query(query, (err, data) => {
        if (err) throw err;
        res.status(200).json(data)
    })
})

app.patch('/note/:id', (req, res) => {
    const id = req.params.id
    const { note } = req.body
    const query = `UPDATE notes SET note = ? WHERE id = ${id}`;
    conn.query(query, [note], (err, done) => {
        if (err) throw err;
        res.status(200).json("Todo updated")
    })
})

app.delete('/note/:id', (req, res) => {
    const id = req.params.id;
    const query = `DELETE FROM notes WHERE id = ${id}`;
    conn.query(query, (err, done) => {
        if (err) throw err;
        res.status(200).json("Todo Deleted")
    })
})

app.listen(port, () => {
    console.log("Server is running on port ", port);
})