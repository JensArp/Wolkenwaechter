const apiKey = 'cbbc4708df34fee8dbcc2e5accb3caf0'; // Replace with your OpenWeatherMap API key

document.addEventListener('DOMContentLoaded', () => {
    const cityInput = document.getElementById('city-input');
    const searchButton = document.getElementById('search-button');
    
    // Add event listener for 'Enter' key
    cityInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            getWeather();
        }
    });

    // Add event listener for search button
    searchButton.addEventListener('click', getWeather);
});

async function getWeather() {
    const city = document.getElementById('city-input').value;
    const weatherInfo = document.getElementById('weather-info');
    const currentWeather = document.getElementById('current-weather');
    const currentWeatherIcon = document.getElementById('current-weather-icon');
    const currentTemperature = document.getElementById('current-temperature');
    const currentLocation = document.getElementById('current-location');
    
    weatherInfo.style.display = 'none';
    currentWeather.style.display = 'none';

    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=de`);
        const currentWeatherData = await response.json();

        const forecastResponse = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}&lang=de`);
        const forecastData = await forecastResponse.json();

        displayWeather(currentWeatherData, forecastData);

        // Display current weather
        const weatherIcon = getWeatherIcon(currentWeatherData.weather[0].icon);
        currentWeatherIcon.src = `icons/${weatherIcon}`;
        currentTemperature.textContent = `${Math.round(currentWeatherData.main.temp)}°C`;
        currentLocation.textContent = currentWeatherData.name;
        currentWeather.style.display = 'block';
    } catch (error) {
        alert('Stadt nicht gefunden!');
    }
}

function displayWeather(currentWeather, forecast) {
    const forecastElement = document.getElementById('forecast');
    forecastElement.innerHTML = '';

    for (let i = 0; i < forecast.list.length; i += 8) {
        const dayForecast = forecast.list[i];
        const dayElement = document.createElement('div');
        dayElement.classList.add('forecast-day');

        const weatherIcon = getWeatherIcon(dayForecast.weather[0].icon);

        dayElement.innerHTML = `
            <p>${new Date(dayForecast.dt_txt).toLocaleDateString()}</p>
            <img src="images/${weatherIcon}" alt="${dayForecast.weather[0].description}">
            <p>Temp: ${Math.round(dayForecast.main.temp)}°C</p>
            <p>${dayForecast.weather[0].description}</p>
        `;
        forecastElement.appendChild(dayElement);
    }

    document.getElementById('weather-info').style.display = 'block';
}

function getWeatherIcon(iconCode) {
    switch(iconCode) {
        case '01d':
        case '01n':
            return 'clear.png';
        case '02d':
        case '02n':
        case '03d':
        case '03n':
        case '04d':
        case '04n':
            return 'cloudy.png';
        case '09d':
        case '09n':
        case '10d':
        case '10n':
            return 'rain.png';
        case '11d':
        case '11n':
            return 'thunderstorm.png';
        case '13d':
        case '13n':
            return 'snow.png';
        default:
            return 'default.png'; // Optional: Fallback icon
    }
}
