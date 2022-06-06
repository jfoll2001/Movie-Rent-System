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