const mysql = require('mysql2');

let conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'movie-rent-system'
});
conn.connect((err) => {
    if (err) throw err;
    console.log('Connected!')
});

module.exports = conn;