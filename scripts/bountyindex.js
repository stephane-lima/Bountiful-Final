function init() {
    displayDrinks();
}

function displayDrinks() {
    var dis = document.getElementById("totalDrinksDisplay");
    var totalDrinks = JSON.parse(localStorage.getItem("totalDrinks"));
    console.log(totalDrinks);
    if (totalDrinks == null) {
        totalDrinks = 0;
    }
    dis.innerHTML = `<h3>Total Drinks Created: ${totalDrinks} </h3>
    Do you want a drink mix made specially by you? <a href="./fresh.html"> Do it Right here!</a>
    `;

}

document.addEventListener('DOMContentLoaded', init);