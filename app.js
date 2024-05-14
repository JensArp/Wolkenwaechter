const apiKey = 'cbbc4708df34fee8dbcc2e5accb3caf0'; // Replace with your OpenWeatherMap API key

document.addEventListener('DOMContentLoaded', () => {
    const cityInput = document.getElementById('city-input');
    
    // Add event listener for 'Enter' key
    cityInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            getWeather();
        }
    });
});

async function getWeather() {
    const city = document.getElementById('city-input').value;
    const weatherInfo = document.getElementById('weather-info');
    weatherInfo.style.display = 'none';

    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=de`);
        const currentWeather = await response.json();

        const forecastResponse = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}&lang=de`);
        const forecast = await forecastResponse.json();

        displayWeather(currentWeather, forecast);
    } catch (error) {
        alert('Stadt nicht gefunden!');
    }
}

function displayWeather(currentWeather, forecast) {
    document.getElementById('city-name').textContent = currentWeather.name;

    // Round the current temperature
    let currentTemperature = currentWeather.main.temp;
    let roundedCurrentTemperature = Math.round(currentTemperature); // Rounds to the nearest integer

    document.getElementById('temperature').textContent = `Temperatur: ${roundedCurrentTemperature}°C`;
    document.getElementById('description').textContent = currentWeather.weather[0].description;

    const forecastElement = document.getElementById('forecast');
    forecastElement.innerHTML = '';

    for (let i = 0; i < forecast.list.length; i += 8) {
        const dayForecast = forecast.list[i];
        const dayElement = document.createElement('div');
        dayElement.classList.add('forecast-day');

        const weatherIcon = getWeatherIcon(dayForecast.weather[0].icon);

        // Round the forecast temperature
        let forecastTemperature = dayForecast.main.temp;
        let roundedForecastTemperature = Math.round(forecastTemperature); // Rounds to the nearest integer

        dayElement.innerHTML = `
            <p>${new Date(dayForecast.dt_txt).toLocaleDateString()}</p>
            <img src="images/${weatherIcon}" alt="${dayForecast.weather[0].description}">
            <p>Temp: ${roundedForecastTemperature}°C</p>
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
