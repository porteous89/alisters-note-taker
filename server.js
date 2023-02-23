const express = require('express');
const path = require('path');
const noteRoutes = require('./routes/noteRoutes.js');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use("/api", noteRoutes);
app.get("/", (req, res)=>{
    res.sendFile(path.join(__dirname, "./public/index.html"));
})

app.get("/notes", (req, res)=>{
    res.sendFile(path.join(__dirname, "./public/notes.html"));
})


app.listen(PORT, () => console.log('Now listening'));