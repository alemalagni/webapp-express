const express = equire('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.send('Server Avviato :D!')
})