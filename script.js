const weather_element = document.getElementById("weather");
const temperature_main_element = document.getElementById("temperature-main");
const weather_description_element = document.getElementById("weather-description");
const weather_icon_element = document.getElementById("icon");
const temperature_element = document.getElementById("temperature");
const humidity_element = document.getElementById("humidity");
const wind_speed_element = document.getElementById("wind-speed");
const country_element = document.getElementById("country");
const town_element = document.getElementById("city");
const home_city_icon = document.querySelector("#right img");

const apiKey = "ec81ab187004377dd35f6a64b600cd80";
const urlParams = new URLSearchParams(window.location.search);
let city = urlParams.get("city") || 'Islamabad'; // Default city to Islamabad if none provided

const apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
const forecastURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

fetch(apiURL)
  .then((response) => {
    if (!response.ok) {
      throw new Error("City not found or an error occurred");
    }
    return response.json();
  })
  .then((data) => {
    console.log("Weather Data:", data);

    const weather = data.weather[0].main;
    const weather_description = data.weather[0].description;
    const weather_icon = data.weather[0].icon;
    const temperature = data.main.temp;
    const humidity = data.main.humidity;
    const wind_speed = data.wind.speed;
    const country = data.sys.country;
    const town = data.name;

    weather_element.innerText = weather;
    country_element.innerText = country;
    town_element.innerText = town;
    temperature_main_element.innerText = `${temperature}°C`;
    weather_description_element.innerText = weather_description;
    humidity_element.innerText = `${humidity}%`;
    wind_speed_element.innerText = `${wind_speed} m/s`;
    temperature_element.innerText = `${temperature} °C`;

    const iconUrl = `https://openweathermap.org/img/wn/${weather_icon}@2x.png`;
    weather_icon_element.src = iconUrl;
    home_city_icon.src = iconUrl;
  })
  .catch((error) => {
    alert(error.message);
  });

// Fetch 5-day weather forecast
fetch(forecastURL)
  .then((response) => {
    if (!response.ok) {
      throw new Error("Failed to fetch forecast data");
    }
    return response.json();
  })
  .then((forecastData) => {
    const forecastContainer = document.getElementById('forecast-container');
    forecastContainer.innerHTML = ''; // Clear previous forecast items

    // Get forecast data for every 8th entry (3-hour intervals -> approx 1 day)
    forecastData.list.forEach((forecast, index) => {
      if (index % 8 === 0) {
        const day = new Date(forecast.dt * 1000).toLocaleDateString('en-US', { weekday: 'long' });
        const temp = forecast.main.temp.toFixed(2); // Keep temperature with 2 decimals
        const icon = forecast.weather[0].icon;
        const description = forecast.weather[0].description;

        // Create forecast item
        const forecastItem = document.createElement('div');
        forecastItem.classList.add('forecast-item', 'p-6', 'rounded-lg', 'bg-[#0198afb6]', 'text-center', 'shadow-lg', 'flex', 'flex-col', 'items-center', 'justify-center', 'space-y-2');

        forecastItem.innerHTML = `
          <p class="text-sm font-semibold text-white">${day}</p>
          <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="weather icon" class="w-16 h-16 mb-1" />
          <p class="text-lg text-white font-bold">${temp} °C</p>
          <p class="text-sm text-white font-medium">${description}</p>
        `;

        // Append each forecast item to the container
        forecastContainer.appendChild(forecastItem);
      }
    });
  })
  .catch((error) => {
    console.error("Error fetching forecast:", error);
  });
