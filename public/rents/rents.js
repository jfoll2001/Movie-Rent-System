//Inserts Rental
let save = () => {
    let rentStart = document.querySelector("#rentDate").value;
    let rentVal = /(\d{1,2})\/(\d{1,2})\/(\d{4})/;

    let rentEnd = document.querySelector("#returnDate").value;
    let returnVal = /(\d{1,2})\/(\d{1,2})\/(\d{4})/;

    let rentPrice = document.querySelector("#price").value;
    let priceVal = /^\d+\.\d{0,2}$/;

    if (rentVal.test(rentStart) && returnVal.test(rentEnd) && priceVal.test(rentPrice) == true) {
        let form = {
            rentdate: rentStart,
            returndate: rentEnd,
            price: rentPrice,
            movierented: document.querySelector("#movieSelect").value,
            userrenting: document.querySelector("#customerSelect").value
        }
        fetch(`http://localhost:5000/saveRents`, {
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
    };
};

//Reads all Needed Data
let read = () => {
    fetch(`http://localhost:5000/showMoviesName`, {
        method: 'GET'
    })
        .then(response => response.json())
        .then(data => movieSelect(data));

    fetch(`http://localhost:5000/showCustomersName`, {
        method: 'GET'
    })
        .then(response => response.json())
        .then(data => customerSelect(data));

    fetch(`http://localhost:5000/readRents`, {
        method: 'GET'
    })
        .then(response => response.json())
        .then(data => displayData(data));
};

//Shows Movie Names
let movieSelect = (movies) => {
    let select = document.querySelector("#movieSelect");
    movies.forEach(movie => {
        select.innerHTML += `
            <option value="${movie.title}">${movie.title}</option>
         `;
    });
};

//Shows Customer Names
let customerSelect = (users) => {
    let select = document.querySelector("#customerSelect");
    users.forEach(user => {
        select.innerHTML += `
            <option value="${user.name}">${user.name}</option>
         `;
    });
};

//Displays Data
let displayData = (data) => {
    let table = "";

    data.forEach(rental => {
        table += `
        <tr>
          <td>
            <a type="button" onclick='updateRentals(${JSON.stringify(rental)})' data-bs-toggle="modal" data-bs-target="#updateModal" style="color: blue;">
              ${rental.rentdate}
            </a>
         </td>          
         <td>${rental.returndate}</td>
         <td>${rental.price}</td>
         <td>${rental.userrenting}</td>          
         <td>${rental.movierented}</td>
         <td><a type="button" onclick="deleteRental(${rental.idrentals})" data-bs-toggle="modal" data-bs-target="#deleteModal">&#128465;</a></td>
        </tr>
       `;
    });
    document.querySelector("#rentalsList").innerHTML = table;
};

//Delete Rental
let deleteRental = (id) => {

    document.querySelector("#btnDelete").addEventListener("click", () => {
        fetch(`http://localhost:5000/deleteRents?id=${id}`, {
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

//Get Rental Data for Update
let updateRentals = (rental) => {
    document.querySelector("#rentDate2").value = rental.rentdate;
    document.querySelector("#returnDate2").value = rental.returndate;
    document.querySelector("#price2").value = rental.price;
    document.querySelector("#customerSelect").value = rental.userrenting;
    document.querySelector("#movieSelect").value = rental.movierented;
    document.querySelector("#rentalID").value = rental.idrentals;
};

//Insert Updated Data
document.querySelector("#btnUpdate").addEventListener("click", () => {
    let rentStart = document.querySelector("#rentDate2").value;
    let rentVal = /(\d{1,2})\/(\d{1,2})\/(\d{4})/;

    let rentEnd = document.querySelector("#returnDate2").value;
    let returnVal = /(\d{1,2})\/(\d{1,2})\/(\d{4})/;

    let rentPrice = document.querySelector("#price2").value;
    let priceVal = /^\d+\.\d{0,2}$/;

    if (rentVal.test(rentStart) && returnVal.test(rentEnd) && priceVal.test(rentPrice) == true) {
        let form = {
            rentdate: rentStart,
            returndate: rentEnd,
            price: rentPrice,
            movierented: document.querySelector("#movieSelect").value,
            userrenting: document.querySelector("#customerSelect").value
        }
        let id = document.querySelector("#rentalID").value;
        fetch(`http://localhost:5000/updateRents?id=${id}`, {
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
    };
});