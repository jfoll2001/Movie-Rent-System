//All Read Data
let read = () => {
    fetch(`http://localhost:5000/allAvailableMovies`, {
        method: 'GET'
    })
        .then(response => response.json())
        .then(data => displayData(data));

    fetch(`http://localhost:5000/allRentedMovies`, {
        method: 'GET'
    })
        .then(response => response.json())
        .then(data => displayRentedData(data));
};

//Displays Data of Available Movies
let displayData = (data) => {
    let table = "";

    data.forEach(movie => {
        table += `
         <tr>
           <td>${movie.title}</td> 
           <td>${movie.director}</td>         
           <td>${movie.actors}</td>
           <td>${movie.genre}</td>
           <td>${movie.premiere}</td>          
           <td>${movie.available}</td>  
         </tr>        
        `;
    });
    document.querySelector("#allAvailableMovies").innerHTML = table;
};

//Displays Data of Rented Movies
let displayRentedData = (data) => {
    let table = "";

    data.forEach(movie => {
        table += `
         <tr>
           <td>${movie.title}</td> 
           <td>${movie.director}</td>         
           <td>${movie.actors}</td>
           <td>${movie.genre}</td>
           <td>${movie.premiere}</td>          
           <td>${movie.available}</td>  
         </tr>        
        `;
    });
    document.querySelector("#allRentedMovies").innerHTML = table;
};
