const express = require('express');
const app = express();
const port = 3000;
const db = require('./db')

// INDEX
app.get('/', (req, res) => {
    db.query('SELECT * FROM movies', (err, results) => {
        if (err) {
            return res.status(500).send('Errore nel recupero della lista dei film: ' + err.message);
        }
        res.send(results);
    });
});

// SHOW 
app.get('/movies/:id', (req, res) => {
    const movieId = req.params.id;

    const movieQuery = 'SELECT * FROM movies WHERE id = ?';
    db.query(movieQuery, [movieId], (err, movieResult));
})

app.listen(port, () => {
    console.log(`Server in ascolto su http://localhost:${port}`);
});