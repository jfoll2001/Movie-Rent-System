//Insert Movie
let save = () => {
    let titleI = document.querySelector("#title").value;

    let directorI = document.querySelector("#director").value;
    let directorVal = /^[A-Za-z ]{2,30}$/;

    let actorsI = document.querySelector("#actors").value;
    let actorsVal = /^\w+(?:(?:,\s\w+)+|(?:\s\w+)+)$/;

    let genreI = document.querySelector("#genre").value;
    let genreVal = /^\w+(?:(?:,\s\w+)+|(?:\s\w+)+)$/;

    let premiereI = "";

    if (document.querySelector("#premiere").checked) {
        premiereI = "YES"
    } else {
        premiereI = "NO"
    }

    if (document.querySelector("#available").checked) {
        availableI = "YES"
    } else {
        availableI = "NO"
    }

    if (directorVal.test(directorI) && actorsVal.test(actorsI) && genreVal.test(genreI) == true) {
        let form = {
            title: titleI,
            director: directorI,
            actors: actorsI,
            genre: genreI,
            premiere: premiereI,
            available: availableI
        }
        fetch(`http://localhost:5000/saveMovies`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(form)
        })
            .then(response => response.json())
            .then(data => {
                data.status ? read() : alert(data.message);
            });
    } else {
        alert("Incorrect Input");
    }
};

//Read Data
let read = () => {
    fetch(`http://localhost:5000/readMovies`, {
        method: 'GET'
    })
        .then(response => response.json())
        .then(data => displayData(data));
};

let displayData = (data) => {
    let table = "";

    data.forEach(movie => {
        table += `
         <tr>
           <td>
             <a type="button" onclick='updateMovie(${JSON.stringify(movie)})' data-bs-toggle="modal" data-bs-target="#updateModal" style="color: blue;">
               ${movie.title}
             </a>
          </td>          
          <td>${movie.actors}</td>
          <td>${movie.genre}</td>
          <td>${movie.premiere}</td>          
          <td>${movie.available}</td>
          <td><a type="button" onclick="deleteMovie(${movie.movieid})" data-bs-toggle="modal" data-bs-target="#deleteModal">&#128465;</a></td>
         </tr>
        `;
    });
    document.querySelector("#movieList").innerHTML = table;
};

//Delete Movie
let deleteMovie = (id) => {

    document.querySelector("#btnDelete").addEventListener("click", () => {
        fetch(`http://localhost:5000/deleteMovies?id=${id}`, {
            method: 'GET'
        })
            .then(response => response.json())
            .then(data => {
                if (data.affectedRows != 0) {
                    read();
                }
            });
    });
};

//Get Movie Data for Update
let updateMovie = (movie) => {
    document.querySelector("#title2").value = movie.title;
    document.querySelector("#director2").value = movie.director;
    document.querySelector("#actors2").value = movie.actors;
    document.querySelector("#genre2").value = movie.genre;    
    document.querySelector("#movieID").value = movie.movieid;
};

//Insert Update Data
document.querySelector("#btnUpdate").addEventListener("click", () => {
    let titleI = document.querySelector("#title2").value;

    let directorI = document.querySelector("#director2").value;
    let directorVal = /^[A-Za-z ]{2,30}$/;

    let actorsI = document.querySelector("#actors2").value;
    let actorsVal = /^\w+(?:(?:,\s\w+)+|(?:\s\w+)+)$/;

    let genreI = document.querySelector("#genre2").value;
    let genreVal = /^\w+(?:(?:,\s\w+)+|(?:\s\w+)+)$/;

    let premiereI = "";

    if (document.querySelector("#premiere2").checked) {
        premiereI = "YES"
    } else {
        premiereI = "NO"
    }

    if (document.querySelector("#available2").checked) {
        availableI = "YES"
    } else {
        availableI = "NO"
    }

    if (directorVal.test(directorI) && actorsVal.test(actorsI) && genreVal.test(genreI) == true) {
        let form = {
            title: titleI,
            director: directorI,
            actors: actorsI,
            genre: genreI,
            premiere: premiereI,
            available: availableI
        }
        let id = document.querySelector("#movieID").value;
        fetch(`http://localhost:5000/updateMovies?id=${id}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(form)
        })
            .then(response => response.json())
            .then(data => {
                data.status ? read() : alert(data.message);
            });
    } else {
        alert("Incorrect Input");
    }
});

//Search Movie
document.querySelector("#btnSearchMovie").addEventListener("click", () => {
    let search = document.querySelector("#searchMovie").value;
    fetch(`http://localhost:5000/searchMovies?param=${search}`, {
        method: 'GET'
    })
        .then(response => response.json())
        .then(data => displayData(data));
});