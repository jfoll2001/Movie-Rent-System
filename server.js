const http = require('http');
const fs = require('fs');
const connection = require('./dbconnection/dbconnect.js');
const { URLSearchParams } = require('url');
const port = 5000;

connection.connect((err) => {
    if (err) {
        throw err;
    }
    console.log("Connected to database");
});

http.createServer((req, res) => {
    let url = req.url.split('?')[0];
    switch (url) {
        case '/':
            fs.createReadStream('./public/general/home.html').pipe(res);
            break;
        case '/about':
            fs.createReadStream('./public/general/about.html').pipe(res);
            break;
        case '/contact':
            fs.createReadStream('./public/general/contact.html').pipe(res);
            break;
        case '/newCustomer':
            fs.createReadStream('./public/customers/newCustomers.html').pipe(res);
            break;
        case '/listCustomer':
            fs.createReadStream('./public/customers/listCustomers.html').pipe(res);
            break;
        case '/newMovie':
            fs.createReadStream('./public/movies/newMovies.html').pipe(res);
            break;
        case '/listMovie':
            fs.createReadStream('./public/movies/listMovies.html').pipe(res);
            break;
        case '/newRental':
            fs.createReadStream('./public/rents/newRents.html').pipe(res);
            break;
        case '/listRental':
            fs.createReadStream('./public/rents/listRents.html').pipe(res);
            break;
        case '/availableMovies':
            fs.createReadStream('./public/reports/availableMovies.html').pipe(res);
            break;
        case '/rentedMovies':
            fs.createReadStream('./public/reports/rentedMovies.html').pipe(res);
            break;
        case '/readMovies':
            readMovies(req, res);
            break;
        case '/saveMovies':
            saveMovies(req, res);
            break;
        case '/updateMovies':
            updateMovies(req, res);
            break;
        case '/deleteMovies':
            deleteMovies(req, res);
            break;
        case '/searchMovies':
            searchMovies(req, res);
            break;
        case '/showMoviesName':
            showMoviesName(req, res);
            break;
        case '/readRents':
            readRents(req, res);
            break;
        case '/saveRents':
            saveRents(req, res);
            break;
        case '/updateRents':
            updateRents(req, res);
            break;
        case '/deleteRents':
            deleteRents(req, res);
            break;
        case '/readCustomers':
            readCustomers(req, res);
            break;
        case '/saveCustomers':
            saveCustomers(req, res);
            break;
        case '/updateCustomers':
            updateCustomers(req, res);
            break;
        case '/deleteCustomers':
            deleteCustomers(req, res);
            break;
        case '/searchCustomers':
            searchCustomers(req, res);
            break;
        case '/showCustomersName':
            showCustomersName(req, res);
            break;
        default:
            let file = __dirname + '/public' + url;
            let stream = fs.createReadStream(file);
            stream.on('error', () => {
                res.writeHead(404, { 'Content-Type': 'text/plain' });
                res.end('File not found');
            });
            stream.pipe(res);
            break;
    }
}).listen(port);

console.log(`Server running at http://localhost:${port}`);

//Customers
let readCustomers = (req, res) => {
    let query = `SELECT * FROM users`;
    connection.query(query, (err, results) => {
        if (err) {
            throw (err);
        }
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(JSON.stringify(results));
    });
};

let saveCustomers = (req, res) => {
    let body = '';
    req.on('data', (chunk) => {
        body += chunk;
    });
    req.on('end', () => {
        let customers = JSON.parse(body);
        let query = `INSERT INTO users SET ?`;
        connection.query(query, customers, (err, results) => {
            if (err) {
                res.end(JSON.stringify({
                    status: false,
                    message: err.message
                }));
            }
            else {
                res.writeHead(200, { 'Content-Type': 'json' });
                res.end(JSON.stringify({
                    status: true
                }));
            }
        });
    });
};

let deleteCustomers = (req, res) => {
    let url = req.url.split('?')[1];
    let id = new URLSearchParams(url).get('id');
    let query = `DELETE FROM users WHERE userid = ${id}`;
    connection.query(query, id, (err, results) => {
        if (err) {
            throw (err);
        }
        res.writeHead(200, { 'Content-Type': 'json' });
        res.end(JSON.stringify(results));
    });
};

let updateCustomers = (req, res) => {
    let url = req.url.split('?')[1];
    let id = new URLSearchParams(url).get('id');
    let body = '';
    req.on('data', (chunk) => {
        body += chunk;
    });
    req.on('end', () => {
        let customers = JSON.parse(body);
        let query = `UPDATE users SET ? WHERE userid = ?`;
        connection.query(query, [customers, id], (err, results) => {
            if (err) {
                res.end(JSON.stringify({
                    status: false,
                    message: err.message
                }));
            }
            else {
                res.writeHead(200, { 'Content-Type': 'json' });
                res.end(JSON.stringify({
                    status: true
                }));
            }
        });
    });
};

let searchCustomers = (req, res) => {
    let url = req.url.split('?')[1];
    let param = new URLSearchParams(url).get('param');
    let query = `SELECT * FROM users WHERE name LIKE '%${param}%'`;
    connection.query(query, (err, results) => {
        if (err) {
            throw (err);
        }
        res.writeHead(200, { 'Content-Type': 'json' });
        res.end(JSON.stringify(results));
    });
};

let showCustomersName = (req, res) => {
    let query = `SELECT name FROM users`;
    connection.query(query, (err, results) => {
        if (err) {
            throw (err);
        }
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(JSON.stringify(results));
    });
};

//Movies
let readMovies = (req, res) => {
    let query = `SELECT * FROM movies`;
    connection.query(query, (err, results) => {
        if (err) {
            throw (err);
        }
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(JSON.stringify(results));
    });
};

let saveMovies = (req, res) => {
    let body = '';
    req.on('data', (chunk) => {
        body += chunk;
    });
    req.on('end', () => {
        let customers = JSON.parse(body);
        let query = `INSERT INTO movies SET ?`;
        connection.query(query, customers, (err, results) => {
            if (err) {
                res.end(JSON.stringify({
                    status: false,
                    message: err.message
                }));
            }
            else {
                res.writeHead(200, { 'Content-Type': 'json' });
                res.end(JSON.stringify({
                    status: true
                }));
            }
        });
    });
};

let deleteMovies = (req, res) => {
    let url = req.url.split('?')[1];
    let id = new URLSearchParams(url).get('id');
    let query = `DELETE FROM movies WHERE movieid = ${id}`;
    connection.query(query, id, (err, results) => {
        if (err) {
            throw (err);
        }
        res.writeHead(200, { 'Content-Type': 'json' });
        res.end(JSON.stringify(results));
    });
};

let updateMovies = (req, res) => {
    let url = req.url.split('?')[1];
    let id = new URLSearchParams(url).get('id');
    let body = '';
    req.on('data', (chunk) => {
        body += chunk;
    });
    req.on('end', () => {
        let customers = JSON.parse(body);
        let query = `UPDATE movies SET ? WHERE movieid = ?`;
        connection.query(query, [customers, id], (err, results) => {
            if (err) {
                res.end(JSON.stringify({
                    status: false,
                    message: err.message
                }));
            }
            else {
                res.writeHead(200, { 'Content-Type': 'json' });
                res.end(JSON.stringify({
                    status: true
                }));
            }
        });
    });
};

let searchMovies = (req, res) => {
    let url = req.url.split('?')[1];
    let param = new URLSearchParams(url).get('param');
    let query = `SELECT * FROM movies WHERE title LIKE '%${param}%'`;
    connection.query(query, (err, results) => {
        if (err) {
            throw (err);
        }
        res.writeHead(200, { 'Content-Type': 'json' });
        res.end(JSON.stringify(results));
    });
};

let showMoviesName = (req, res) => {
    let query = `SELECT title FROM movies`;
    connection.query(query, (err, results) => {
        if (err) {
            throw (err);
        }
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(JSON.stringify(results));
    });
};

//Rentals
let readRents = (req, res) => {
    let query = `SELECT * FROM rentals`;
    connection.query(query, (err, results) => {
        if (err) {
            throw (err);
        }
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(JSON.stringify(results));
    });
};

let saveRents = (req, res) => {
    let body = '';
    req.on('data', (chunk) => {
        body += chunk;
    });
    req.on('end', () => {
        let customers = JSON.parse(body);
        let query = `INSERT INTO rentals SET ?`;
        connection.query(query, customers, (err, results) => {
            if (err) {
                throw (err);
            }
            res.writeHead(200, { 'Content-Type': 'json' });
            res.end();
        });
    });
};

let deleteRents = (req, res) => {
    let url = req.url.split('?')[1];
    let id = new URLSearchParams(url).get('id');
    let query = `DELETE FROM rentals WHERE idrentals = ${id}`;
    connection.query(query, id, (err, results) => {
        if (err) {
            throw (err);
        }
        res.writeHead(200, { 'Content-Type': 'json' });
        res.end(JSON.stringify(results));
    });
};

let updateRents = (req, res) => {
    let url = req.url.split('?')[1];
    let id = new URLSearchParams(url).get('id');
    let body = '';
    req.on('data', (chunk) => {
        body += chunk;
    });
    req.on('end', () => {
        let customers = JSON.parse(body);
        let query = `UPDATE rentals SET ? WHERE idrentals = ?`;
        connection.query(query, [customers, id], (err, results) => {
            if (err) {
                res.end(JSON.stringify({
                    status: false,
                    message: err.message
                }));
            }
            else {
                res.writeHead(200, { 'Content-Type': 'json' });
                res.end(JSON.stringify({
                    status: true
                }));
            }
        });
    });
};

//Other