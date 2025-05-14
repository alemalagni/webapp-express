const express = require('express');
const app = express();
const port = 3000;
const db = require('./db')

app.get('/', (req, res) => {
    db.query('SELECT NOW() AS ora_corrente', (err, results) => {
        if (err) {
            return res.status(500).send('Errore nella query: ' + err.message);
        }
        res.send(`DB funzionante! Ora dal DB: ${results[0].ora_corrente}`);
    });
});

app.listen(port, () => {
    console.log(`Server in ascolto su http://localhost:${port}`);
});