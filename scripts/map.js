const apiKey = "AIzaSyAa2Vrjh6ASPvQyMWaknXTyoi5c5L-N7jE";
const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=Carlsbad&appid=${apiKey}&units=imperial`;

// Initialize the map
function initMap() {
  const map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 33.158093, lng: -117.350594 },
    zoom: 10,
  });
  const marker = new google.maps.Marker({
    position: { lat: 33.158093, lng: -117.350594 },
    map: map,
    title: "Carlsbad",
  });
}

// // Update the weather display
// function updateWeatherDisplay(data) {
//   const weatherDisplay = document.getElementById("weather-display");
//   weatherDisplay.innerHTML = `
//     <h2>${data.name}, ${data.sys.country}</h2>
//     <div class="weather-description">${data.weather[0].description}</div>
//     <div class="temperature">${Math.round(data.main.temp)} &deg;F</div>
//     <div class="feels-like">Feels like ${Math.round(
//     data.main.feels_like
//   )} &deg;F</div>
//     <div class="humidity">Humidity: ${data.main.humidity}%</div>
//   `;
// }

// fetchCurrentWeather();