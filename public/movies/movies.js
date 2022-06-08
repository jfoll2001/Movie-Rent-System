let save = () => {

    let titleI = document.querySelector("#title").value;

    let directorI = document.querySelector("#director").value;
    let directorVal = /^([^0-9]*)$/;

    let actorsI = document.querySelector("#actors").value;
    let actorsVal = /^([^0-9]*)$/;

    let genreI = document.querySelector("#genre").value;
    let genreVal = /^([^0-9]*)$/;

    let amountStockI = document.querySelector("#amountInStock").value;
    let stockVal = /^[0-9]{2}$/;

    let premiereI = "";

    if (document.querySelector("#premiere").checked = true) {
        premiereI = "YES"
    } else {
        premiereI = "NO"
    }

    if (directorI != directorVal && actorsI != actorsVal && genreI != genreVal && amountStockI != stockVal) {
        alert("Incorrect Input");
    } else {
        let form = {
            title: titleI,
            director: directorI,
            actors: actorsI,
            genre: genreI,
            premiere: premiereI,
            available: "YES",
            numberinstock: amountStockI
        }
    }
};