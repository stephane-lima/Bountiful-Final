const fruitDataUrl = "json/fruit.json";
const form = document.getElementById("drink-form");
let fruitData;

// Fetch the fruit data from the JSON file
async function fetchFruitData() {
  try {
    const response = await fetch(fruitDataUrl);
    if (response.ok) {
      fruitData = await response.json();
      populateFruitSelects(fruitData);
    } else {
      throw Error(await response.text());
    }
  } catch (error) {
    console.log(error);
  }
}

// Populate the fruit selects with the fruit options
function populateFruitSelects(fruitData) {
  const fruitSelects = document.querySelectorAll("select[name^='fruit']");
  fruitSelects.forEach((select) => {
    // Add an empty option to the select element
    const emptyOption = document.createElement("option");

    // Add an option for each fruit in the data
    fruitData.forEach((fruit) => {
      const option = document.createElement("option");
      option.value = fruit.name;
      option.textContent = fruit.name;
      select.appendChild(option);
    });
  });
}

// Handle form submission
form.addEventListener("submit", (event) => {
  event.preventDefault(); // Prevent default form submission behavior
  const formData = new FormData(form);

  // Display the order details in the output area
  const outputArea = document.getElementById("output-area");
  const orderDetails = document.createElement("p");
  orderDetails.innerHTML = `Name: ${formData.get("first-name")}<br>Email: ${formData.get("email")}<br>Phone: ${formData.get("phone")}<br>Fruit 1: ${formData.get("fruit1")}<br>Fruit 2: ${formData.get("fruit2")}<br>Fruit 3: ${formData.get("fruit3")}<br>Special Instructions: ${formData.get("instructions") || "None"}`;
  outputArea.appendChild(orderDetails);

  // Display the order date
  const orderDate = document.createElement("p");
  orderDate.textContent = `Order Date: ${new Date().toLocaleString()}`;
  outputArea.appendChild(orderDate);

  // Calculate and display the nutrition information for the selected fruits
  const fruitSelects = document.querySelectorAll("select[name^='fruit']");
  const nutritionData = { carbohydrates: 0, protein: 0, fat: 0, calories: 0, sugar: 0 };
  fruitSelects.forEach((select) => {
    const fruitName = select.value;
    if (fruitName) {
      const fruit = fruitData.find((fruit) => fruit.name === fruitName);
      Object.keys(nutritionData).forEach((nutrition) => {
        nutritionData[nutrition] += fruit.nutritions[nutrition];
      });
    }
  });
  const nutritionDetails = document.createElement("p");
nutritionDetails.innerHTML = `Total Nutrition Information:<br>Carbohydrates: ${nutritionData.carbohydrates.toFixed(2)}g<br>Protein: ${nutritionData.protein.toFixed(2)}g<br>Fat: ${nutritionData.fat.toFixed(2)}g<br>Calories: ${nutritionData.calories.toFixed(2)}kcal<br>Sugar: ${nutritionData.sugar.toFixed(2)}g`;
outputArea.appendChild(nutritionDetails);

let drinkCount = localStorage.getItem("drinkCount");
  if (!drinkCount) {
    drinkCount = 0;
  }
  drinkCount++;
  localStorage.setItem("drinkCount", drinkCount);
  const drinkCountElement = document.getElementById("drink-count");
  drinkCountElement.textContent = `Total drinks submitted: ${drinkCount}`;
});

fetchFruitData();