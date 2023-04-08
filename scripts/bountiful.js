const urlAllFruit = 'json/fruit.json';

let allFruitInfo;
let select1, select2, select3;
let totalSpecialDrinks = JSON.parse(localStorage.getItem("totalDrinks"));



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
            let options = `<option value="">Please select fruit</option>`;
            allfruit.forEach(fruit => {
                options = options + ` <option value="${fruit.id}">${fruit.name}</option>`;
            });
            selected.innerHTML = options;

        }).catch(err => {
            console.log("Fetch error :" + err);
        });
}

function addDrink() {

    let drink = {
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

        let sumCarb = 0.0;
        let sumProt = 0.0;
        let sumFat = 0.0;
        let sumSuga = 0.0;
        let sumCalo = 0.0;

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
    let x = document.getElementById("drink-result");
    
    let order = document.querySelector(".special-drink-result-wrapper");
    order.style.display = "block";

    //removing hidden attribute  
    x.removeAttribute("hidden");

    const todayDate = new Date();

    const fName = document.getElementById("fName");
    const e_mail = document.getElementById("e-mail");
    const telephone = document.getElementById("telephone");
    const firstFruit = document.getElementById("firstFruit");
    const secondfruit = document.getElementById("secondFruit");
    const thirdFruit = document.getElementById("thirdFruit");
    const instructions = document.getElementById("instructions");
    const orderDate = document.getElementById("orderDate");
    const calories = document.getElementById("calories");
    const carbohydrates = document.getElementById("carbohydrates");
    const protein = document.getElementById("protein");
    const fat = document.getElementById("fat");
    const sugar = document.getElementById("sugar");
    // const fName = document.getElementById("fName");

    fName.textContent = `${drinkDetail.firstname}`;
    e_mail.textContent = `${drinkDetail.email}`;
    telephone.textContent = `${drinkDetail.phone}`;
    firstFruit.textContent = `${drinkDetail.fruit1name}`;
    secondfruit.textContent = `${drinkDetail.fruit2name}`;
    thirdFruit.textContent = `${drinkDetail.fruit3name}`;
    instructions.textContent = `${drinkDetail.specNote}`;
    orderDate.textContent = `${new Date().toLocaleString()}`;
    calories.textContent = `${drinkDetail.sumCalo}`;
    carbohydrates.textContent = `${drinkDetail.sumCarb}`;
    protein.textContent = `${drinkDetail.sumProt}`;
    fat.textContent = `${drinkDetail.sumFat}`;
    sugar.textContent = `${drinkDetail.sumSuga}`;
    //removing hidden attribute ^
    // let resultHTML = `<p>First Name : ${drinkDetail.firstname}</p>`;
    // resultHTML += `<p>Email : ${drinkDetail.email}</p>`;
    // resultHTML += `<p>Phone : ${drinkDetail.phone}</p>`;
    // resultHTML += `<p>1st Fruit selected : ${drinkDetail.fruit1name}</p>`;
    // resultHTML += `<p>2nd Fruit selected : ${drinkDetail.fruit2name}</p>`;
    // resultHTML += `<p>3rd Fruit selected : ${drinkDetail.fruit3name}</p>`;
    // resultHTML += `<p>Additional Note : "${drinkDetail.specNote}"</p><br>`;


    // resultHTML += `<p>Ordered on : ${new Date().toLocaleString()}</p>`;

    // resultHTML += `<br><p>Drink's Nutrition Values:</p>`;
    // resultHTML += `<p>Calories : ${drinkDetail.sumCalo}Kcal</p>`;
    // resultHTML += `<p>Carbohydrates: ${drinkDetail.sumCarb}g</p>`;
    // resultHTML += `<p>Protein: ${drinkDetail.sumProt}g</p>`;
    // resultHTML += `<p>Fat: ${drinkDetail.sumFat}g</p>`;
    // resultHTML += `<p>Sugar: ${drinkDetail.sumSuga}g</p>`;

    // result on html file fresh.html

    // resultHTML += '<br><br>';
    // x.innerHTML = resultHTML;

}

function handleSubmit(event) {
    event.preventDefault();
}
let SpecialDrinkForm = document.getElementById("SpecialDrinkForm");
SpecialDrinkForm.addEventListener('submit', handleSubmit);

document.addEventListener('DOMContentLoaded', init);