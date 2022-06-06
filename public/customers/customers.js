let save = () => {
    let namePattern = new RegExp(/^[a-z ,.'-]+$/i);
    let phonePattern = new RegExp(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im);
    let addressPattern = new RegExp(/^[a-zA-Z0-9\s,.'-]{3,}$/);
    let emailPattern = new RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    let zipPattern = new RegExp(/(^\d{10}$)|(^\d{4}-\d{8}$)/);

    if (document.querySelector("#fullName").value != namePattern && document.querySelector("#address").value != addressPattern && document.querySelector("#phoneNum").value != phonePattern && document.querySelector("#Email").value != emailPattern && document.querySelector("#zipCode").value != zipPattern) {
       document.querySelector("#warning").removeAttribute("hidden");
       return;
    } else {
        let form = {
            name: document.querySelector("#fullName").value,
            address: document.querySelector("#address").value,
            phonenum: document.querySelector("#phoneNum").value,
            email: document.querySelector("#Email").value,
            zipcode: document.querySelector("#zipCode").value
        }
        
    }        
};