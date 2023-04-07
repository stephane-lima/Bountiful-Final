const urlAllFruit = 'https://brotherblazzard.github.io/canvas-content/fruit.json';

var allFruitInfo;
var select1, select2, select3;
var totalSpecialDrinks = JSON.parse(localStorage.getItem("totalDrinks"));

function init() {
    console.log("Inside init")
    select1 = document.getElementById('fruit1');
    select2 = document.getElementById('fruit2');
    select3 = document.getElementById('fruit3');
    select1.addEventListener('click', handleFruitSelect(select1));
    select2.addEventListener('click', handleFruitSelect(select2));
    select3.addEventListener('click', handleFruitSelect(select3));

}

function handleFruitSelect(selected) {

    fetch('json/fruit.json')

        .then(res => {
            console.log("Fetching fruits information from API!");
            return res.json();
        }).then((allfruit) => {

            allFruitInfo = allfruit;
            var options = `<option value="">Please select fruit</option>`;
            allfruit.forEach(fruit => {
                options = options + ` <option value="${fruit.id}">${fruit.name}</option>`;
            });
            selected.innerHTML = options;

        }).catch(err => {
            console.log("Fetch error :" + err);
        });
}

function addDrink() {

    var drink = {
        firstname: document.getElementById("firstName").value,
        email: document.getElementById("email").value,
        phone: document.getElementById("phone").value,
        fruit1: document.getElementById("fruit1").value,
        fruit2: document.getElementById("fruit2").value,
        fruit3: document.getElementById("fruit3").value,
        specNote: document.getElementById("extraNote").value
    };

    if (drink.firstname == "" || drink.email == "" || drink.phone == "" || drink.fruit1 == "" || drink.fruit2 == "" || drink.fruit3 == "") {
        return;

    }
    else {

        console.log("Before=" + JSON.stringify(drink));

        var sumCarb = 0.0;
        var sumProt = 0.0;
        var sumFat = 0.0;
        var sumSuga = 0.0;
        var sumCalo = 0.0;

        allFruitInfo.forEach(fruit => {

            if (fruit.id == drink.fruit1) {
                sumCarb += (fruit.nutritions.carbohydrates);
                sumProt += (fruit.nutritions.protein);
                sumFat += (fruit.nutritions.fat);
                sumSuga += (fruit.nutritions.sugar);
                sumCalo += (fruit.nutritions.calories);
                drink['fruit1name'] = fruit.name;
            }
        });
        allFruitInfo.forEach(fruit => {
            console.log("Fruit id is " + fruit.id + " and drink fruit id is " + drink.fruit1);
            if (fruit.id == drink.fruit2) {
                sumCarb += (fruit.nutritions.carbohydrates);
                sumProt += (fruit.nutritions.protein);
                sumFat += (fruit.nutritions.fat);
                sumSuga += (fruit.nutritions.sugar);
                sumCalo += (fruit.nutritions.calories);
                drink['fruit2name'] = fruit.name;
            }
        });
        allFruitInfo.forEach(fruit => {
            console.log("Fruit id is " + fruit.id + " and drink fruit id is " + drink.fruit1);
            if (fruit.id == drink.fruit3) {
                sumCarb += (fruit.nutritions.carbohydrates);
                sumProt += (fruit.nutritions.protein);
                sumFat += (fruit.nutritions.fat);
                sumSuga += (fruit.nutritions.sugar);
                sumCalo += (fruit.nutritions.calories);
                drink['fruit3name'] = fruit.name;
            }
        });

        drink["sumCarb"] = sumCarb.toFixed(2);
        drink["sumProt"] = sumProt.toFixed(2);
        drink["sumFat"] = sumFat.toFixed(2);
        drink["sumSuga"] = sumSuga.toFixed(2);
        drink["sumCalo"] = sumCalo.toFixed(2);

        console.log("After=" + JSON.stringify(drink));
        totalSpecialDrinks++;
        console.log(totalSpecialDrinks);

        //storing to user local storage
        localStorage.setItem("totalDrinks", JSON.stringify(totalSpecialDrinks));

        showResult(drink);
    }

}

function showResult(drinkDetail) {
    var x = document.getElementById("drink-result");
    //removing hidden attribute  
    x.removeAttribute("hidden");

    const todayDate = new Date();
    //removing hidden attribute ^
    var resultHTML = `<br> First Name : ${drinkDetail.firstname}`;
    resultHTML += `<br> Email : ${drinkDetail.email}`;
    resultHTML += `<br> Phone : ${drinkDetail.phone}`;
    resultHTML += `<br> 1st Fruit selected : ${drinkDetail.fruit1name}`;
    resultHTML += `<br> 1st Fruit selected : ${drinkDetail.fruit2name}`;
    resultHTML += `<br> 1st Fruit selected : ${drinkDetail.fruit3name}`;
    resultHTML += `<br> Additional Note : "${drinkDetail.specNote}"`;


    resultHTML += `<br> Ordered on : ${todayDate}`;

    resultHTML += `<br><br> Drink's Nutrition Values:`;
    resultHTML += `<br> Calories : ${drinkDetail.sumCalo}`;
    resultHTML += `<br> Carbohydrates : ${drinkDetail.sumCarb}`;
    resultHTML += `<br> Protein : ${drinkDetail.sumProt}`;
    resultHTML += `<br> Fat : ${drinkDetail.sumFat}`;
    resultHTML += `<br> Sugar : ${drinkDetail.sumSuga}`;

    // result on html file fresh.html

    resultHTML += '<br><br>';
    x.innerHTML = resultHTML;

}

function handleSubmit(event) {
    event.preventDefault();
}
var SpecialDrinkForm = document.getElementById("SpecialDrinkForm");
SpecialDrinkForm.addEventListener('submit', handleSubmit);

document.addEventListener('DOMContentLoaded', init);