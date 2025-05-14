const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Sedmo1-fyqtyw-tehboc',
    database: 'movies_db'
});

connection.connect((err) => {
    if (err) {
        console.log('Errore di connessione con il database', err);
        return;
    }
    console.log('Connesso al database!');
});

module.exports = connection;