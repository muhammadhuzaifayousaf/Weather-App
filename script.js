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
const suggestions = document.getElementById("suggestions");
const apiKey = "ec81ab187004377dd35f6a64b600cd80";

// Geolocation detection
function getWeatherByLocation(lat, lon) {
  const apiURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  const forecastURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

  fetchWeather(apiURL, forecastURL);
}

navigator.geolocation.getCurrentPosition(
  (position) => {
    const { latitude, longitude } = position.coords;
    getWeatherByLocation(latitude, longitude);
  },
  () => {
    // If user denies access, default to Islamabad
    const defaultCity = "Islamabad";
    fetchWeatherByCity(defaultCity);
  }
);

// Fetch weather by city
function fetchWeatherByCity(city) {
  const apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  const forecastURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

  fetchWeather(apiURL, forecastURL);
}

// Fetch weather and forecast data
function fetchWeather(apiURL, forecastURL) {
  fetch(apiURL)
    .then((response) => {
      if (!response.ok) throw new Error("City not found or an error occurred");
      return response.json();
    })
    .then((data) => {
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

  // Fetch forecast data
  fetch(forecastURL)
    .then((response) => {
      if (!response.ok) throw new Error("Failed to fetch forecast data");
      return response.json();
    })
    .then((forecastData) => {
      const forecastContainer = document.getElementById("forecast-container");
      forecastContainer.innerHTML = ""; // Clear previous forecast items

      forecastData.list.forEach((forecast, index) => {
        if (index % 8 === 0) {
          const day = new Date(forecast.dt * 1000).toLocaleDateString("en-US", { weekday: "long" });
          const temp = forecast.main.temp.toFixed(1);
          const icon = forecast.weather[0].icon;
          const description = forecast.weather[0].description;

          const forecastItem = document.createElement("div");
          forecastItem.classList.add("forecast-item", "p-6", "rounded-lg", "bg-[#0198afb6]", "text-center", "shadow-lg", "flex", "flex-col", "items-center", "justify-center", "space-y-2");

          forecastItem.innerHTML = `
            <p class="text-base font-semibold text-white">${day}</p>
            <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="weather icon" class="w-16 h-16 mb-1" />
            <p class="text-xl text-white font-bold">${temp} °C</p>
            <p class="text-sm text-white font-medium">${description}</p>
          `;

          forecastContainer.appendChild(forecastItem);
        }
      });
    })
    .catch((error) => {
      console.error("Error fetching forecast:", error);
    });
}

// Search Suggestions
document.getElementById("town").addEventListener("input", (event) => {
  const query = event.target.value;

  // If the input length is less than 3, clear the suggestions
  if (query.length < 3) {
    suggestions.innerHTML = "";
    return;
  }

  // Fetch the cities suggestions
  fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5&appid=${apiKey}`)
    .then((response) => response.json())
    .then((data) => {
      suggestions.innerHTML = ""; // Clear previous suggestions

      // Populate the suggestions list
      data.forEach((city) => {
        const suggestion = document.createElement("li");
        suggestion.textContent = `${city.name}, ${city.country}`;
        suggestion.classList.add(
          "cursor-pointer",
          "py-2",
          "px-4",
          "hover:bg-[#0198afb6]",
          "rounded-lg",
          "transition-colors",
          "ease-in-out",
          "duration-200"
        );

        // Handle the suggestion click
        suggestion.addEventListener("click", () => {
          document.getElementById("town").value = city.name; // Set the input value to the clicked city
          suggestions.innerHTML = ""; // Clear the suggestions after selecting
          fetchWeatherByCity(city.name); // Fetch weather for the clicked city
        });

        suggestions.appendChild(suggestion); // Add each suggestion to the list
      });
    })
    .catch((error) => {
      console.error("Error fetching suggestions:", error);
    });
});

// Hide suggestions when clicking outside
document.addEventListener("click", (event) => {
  const form = document.getElementById("form");
  if (!form.contains(event.target)) {
    suggestions.innerHTML = ""; // Clear suggestions if clicked outside the form
  }
});

// Optional: Hide suggestions when input field loses focus
/*
document.getElementById("town").addEventListener("blur", () => {
  setTimeout(() => {
    suggestions.innerHTML = ""; // Clear suggestions after input loses focus (with delay to allow clicks on suggestions)
  }, 150);
});
*/

// Handle form submission
document.getElementById("form").addEventListener("submit", (event) => {
  event.preventDefault();
  const city = document.getElementById("town").value;
  fetchWeatherByCity(city);
});
