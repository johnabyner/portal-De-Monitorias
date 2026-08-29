document.addEventListener("DOMContentLoaded", () => {

    const navbar = document.querySelector("#navbar");

    fetch("../components/navbar.html")
        .then(response => response.text())
        .then(data => {

            navbar.innerHTML = data;

        });

});