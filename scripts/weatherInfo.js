// select HTML elements in the document
const currentTemp = document.querySelector("#current-temp");
const weatherIcon = document.querySelector("#weather-icon");
const captionDesc = document.querySelector("figcaption");
const windSpeed = document.querySelector("#wind-speed");
const humidity = document.querySelector("#humidity");
const forecast = document.querySelector("#forecast");

const url =
  "https://api.openweathermap.org/data/2.5/weather?q=Carlsbad&units=imperial&appid=c8530dcac32ea448112d0b54aee4261b";

const forecastUrl =
  "https://api.openweathermap.org/data/2.5/forecast?q=Carlsbad&units=imperial&appid=c8530dcac32ea448112d0b54aee4261b";

async function apiFetch() {
  try {
    const response = await fetch(url);
    const forecastResponse = await fetch(forecastUrl);

    if (response.ok && forecastResponse.ok) {
      const data = await response.json();
      const forecastData = await forecastResponse.json();

      console.log(data); // this is for testing the call
      console.log(forecastData);

      displayResults(data, forecastData);
    } else {
      throw Error(await response.text());
    }
  } catch (error) {
    console.log(error);
  }
}

function displayResults(weatherData, forecastData) {
  currentTemp.innerHTML = `<strong>${weatherData.main.temp.toFixed(
    0
  )}</strong>`;

  const iconsrc = `https://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`;
  const desc = weatherData.weather[0].description;

  weatherIcon.setAttribute("src", iconsrc);
  weatherIcon.setAttribute("alt", desc);
  captionDesc.textContent = desc;

  windSpeed.innerHTML = `Wind Speed: ${weatherData.wind.speed} mph`;
  humidity.innerHTML = `Humidity: ${weatherData.main.humidity}%`;

  const windChill = document.querySelector("#wind-chill");
  const temperature = weatherData.main.temp;
  const windSpeedValue = weatherData.wind.speed;
  const windChillValue = calculateWindChill(temperature, windSpeedValue);
  windChill.innerHTML = `Wind Chill: ${windChillValue.toFixed(0)}&deg;F`;

  // loop through the forecast data and display the information
  let html = "";
  const currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);
  let count = 0;

  // Filter the forecastData.list for the first data of each day
  const dailyForecastData = forecastData.list
    .filter((forecastItem, index, self) => {
      const forecastDate = new Date(forecastItem.dt_txt + " UTC");
      forecastDate.setHours(0, 0, 0, 0);
      const dayDiff =
        (forecastDate.getTime() - currentDate.getTime()) / (1000 * 3600 * 24);
      return (
        dayDiff > 0 &&
        !self.some((item, i) => {
          const otherDate = new Date(item.dt_txt + " UTC");
          otherDate.setHours(0, 0, 0, 0);
          return i < index && otherDate.getTime() === forecastDate.getTime();
        })
      );
    })
    .slice(0, 3);

  // display the forecast information
  dailyForecastData.forEach((forecastItem) => {
    const forecastIcon = `https://openweathermap.org/img/w/${forecastItem.weather[0].icon}.png`;
    const forecastDesc = forecastItem.weather[0].description;
    const forecastTemp = forecastItem.main.temp.toFixed(0);

    const dayOfWeek = new Date(forecastItem.dt_txt + " UTC").toLocaleDateString(
      "en-US",
      {
        weekday: "short",
      }
    );

    html += `<div class="forecast-item">
        <p class="forecast-day">${dayOfWeek}</p>
        <img src="${forecastIcon}" alt="${forecastDesc}">
        <p class="forecast-desc">${forecastDesc}</p>
        <p class="forecast-temp">${forecastTemp}&deg;F</p>
      </div>`;
  });

  forecast.innerHTML = html;

  function calculateWindChill(temperature, windSpeed) {
    const windChill =
      35.74 +
      0.6215 * temperature -
      35.75 * Math.pow(windSpeed, 0.16) +
      0.4275 * temperature * Math.pow(windSpeed, 0.16);
    return windChill;
  }
  console.log(document.getElementById("weatherResults"));
  document.getElementById("weatherResults").innerHTML = html;
}

apiFetch();