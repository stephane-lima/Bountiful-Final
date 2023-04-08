function init() {
    displayDrinks();
}

function displayDrinks() {
    let dis = document.getElementById("totalDrinksDisplay");
    let totalDrinks = JSON.parse(localStorage.getItem("totalDrinks"));
    console.log(totalDrinks);
    if (totalDrinks == null) {
        totalDrinks = 0;
    }
    dis.innerHTML = `<h3>Total Drinks Created: ${totalDrinks} </h3>
    <p>Do you want a drink mix made specially by you?</p><a id="pastOrderButton" href="./fresh.html"> Do it Right here!</a>
    `;

}

document.addEventListener('DOMContentLoaded', init);