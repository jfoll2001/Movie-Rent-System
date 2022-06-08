//Insert Customer 
let save = () => {
    let name = document.querySelector("#fullName").value;
    let nameVal = /^[a-zA-Z ]{2,30}$/;

    let address = document.querySelector("#address").value;
    let addressVal = /^[a-zA-Z0-9\s,.'-]{3,}$/;

    let phonenum = document.querySelector("#phoneNum").value;
    let phoneVal = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;

    let email = document.querySelector("#email").value;
    let emailVal = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    let zipcode = document.querySelector("#zipCode").value;
    let zipVal = /^[0-9]{6}$/;

    if (nameVal.test(name) && addressVal.test(address) && phoneVal.test(phonenum) && emailVal.test(email) && zipVal.test(zipcode) == true) {
        let form = {
            name: document.querySelector("#fullName").value,
            address: document.querySelector("#address").value,
            phonenum: document.querySelector("#phoneNum").value,
            email: document.querySelector("#email").value,
            zipcode: document.querySelector("#zipCode").value
        }
        fetch(`http://localhost:5000/saveCustomers`, {
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
        alert("Incorrect input");
    }
};

//Read Data
let read = () => {
    fetch(`http://localhost:5000/readCustomers`, {
        method: 'GET'
    })
        .then(response => response.json())
        .then(data => displayData(data));
};

//Display Data
let displayData = (data) => {
    let table = "";

    data.forEach(user => {
        table += `
         <tr>
           <td>
             <a type="button" onclick='updateUser(${JSON.stringify(user)})' data-bs-toggle="modal" data-bs-target="#updateModal" style="color: blue;">
               ${user.name}
             </a>
          </td>
           <td>${user.address}</td>
           <td>${user.phonenum}</td>
           <td>${user.email}</td>
           <td>${user.zipcode}</td>
           <td><a type="button" onclick="deleteUser(${user.userid})" data-bs-toggle="modal" data-bs-target="#deleteModal">&#128465;</a></td>
         </tr>
        `;
    });
    document.querySelector("#customerList").innerHTML = table;
};

//Delete Customer
let deleteUser = (id) => {

    document.querySelector("#btnDelete").addEventListener("click", () => {
        fetch(`http://localhost:5000/deleteCustomers?id=${id}`, {
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

//Get Customer Data for Update
let updateUser = (user) => {
    document.querySelector("#fullName2").value = user.name;
    document.querySelector("#address2").value = user.address;
    document.querySelector("#phoneNum2").value = user.phonenum;
    document.querySelector("#email2").value = user.email;
    document.querySelector("#zipCode2").value = user.zipcode;
    document.querySelector("#userID").value = user.userid;
};

//Insert Update Data
document.querySelector("#btnUpdate").addEventListener("click", () => {
    let name = document.querySelector("#fullName").value;
    let nameVal = /^[a-zA-Z ]{2,30}$/;

    let address = document.querySelector("#address").value;
    let addressVal = /^[a-zA-Z0-9\s,.'-]{3,}$/;

    let phonenum = document.querySelector("#phoneNum").value;
    let phoneVal = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;

    let email = document.querySelector("#email").value;
    let emailVal = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    let zipcode = document.querySelector("#zipCode").value;
    let zipVal = /^[0-9]{6}$/;
    if (nameVal.test(name) && addressVal.test(address) && phoneVal.test(phonenum) && emailVal.test(email) && zipVal.test(zipcode) == true) {
        let form = {
            name: document.querySelector("#fullName2").value,
            address: document.querySelector("#address2").value,
            phonenum: document.querySelector("#phoneNum2").value,
            email: document.querySelector("#email2").value,
            zipcode: document.querySelector("#zipCode2").value
        };
        let id = document.querySelector("#userID").value;
        fetch(`http://localhost:5000/updateCustomers?id=${id}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(form)
        })
            .then(response => response.json())
            .then(data => {
                if (data.status) {
                    read();
                }
            });
    } else {
        alert("Incorrect input");
    }
});

//Search Customer
document.querySelector("#btnSearchCustomer").addEventListener("click", () => {
    let search = document.querySelector("#searchCustomer").value;
    fetch(`http://localhost:5000/searchCustomers?param=${search}`, {
        method: 'GET'
    })
        .then(response => response.json())
        .then(data => displayData(data));
});