let save = () => {
    let form = {
        name: document.querySelector("#fullName").value,
        address: document.querySelector("#address").value,
        phonenum: document.querySelector("#phoneNum").value,
        email: document.querySelector("#Email").value,
        zipcode: document.querySelector("#zipCode").value
    }
    fetch('http://localhost:5000/saveCustomers', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(form)
    })
        .then(response => response.json())
};