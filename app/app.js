const express = require('express');
const app = express();
const cors = require('cors')
const port = 3000;
const db = require('./db')

app.use(cors());
app.use(express.json());

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
    db.query(movieQuery, [movieId], (err, movieResult) => {
        if (err) {
            console.error('Errore durante il recupero del film: ', err);
            return res.status(500).send('Errore interno al server');
        }

        if (movieResult.length === 0) {
            return send.status(404).send('Film non trovato');
        }

        const movie = movieResult[0];

        const reviewsQuery = 'SELECT id, name, vote, text, created_at FROM reviews WHERE movie_id = ?';
        db.query(reviewsQuery, [movieId], (err, reviewResults) => {
            if (err) {
                console.log('Errore durante il recupero delle recensioni: ', err);
                return res.status(500).send('Errore interno al server');
            }
            res.json({
                ...movie,
                reviews: reviewResults
            });
        });
    });
});

app.listen(port, () => {
    console.log(`Server in ascolto su http://localhost:${port}`);
});