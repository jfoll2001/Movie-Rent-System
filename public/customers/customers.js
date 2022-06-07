//Insert Customer 
//let save = () => {
//    let form = {
//        name: document.querySelector("#fullName").value,
//        address: document.querySelector("#address").value,
//        phonenum: document.querySelector("#phoneNum").value,
//        email: document.querySelector("#email").value,
//        zipcode: document.querySelector("#zipCode").value
//    }
//    fetch(`http://localhost:5000/uniqueCustomers?param=${form}`, {
//        method: 'GET'               
//    })
//        .then(response => response.json())
//        .then(console.log(form))
//};

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
             <a type="button" onclick="updateUser(${JSON.stringify(user)})" data-bs-toggle="modal" data-bs-target="#updateModal" style="color: blue;">
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
    let form = {
        name: document.querySelector("#fullName").value,
        address: document.querySelector("#address").value,
        phonenum: document.querySelector("#phoneNum").value,
        email: document.querySelector("#email").value,
        zipcode: document.querySelector("#zipCode").value
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
});