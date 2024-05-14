const apiKey = 'cbbc4708df34fee8dbcc2e5accb3caf0'; // Replace with your OpenWeatherMap API key

async function getWeather() {
    const city = document.getElementById('city-input').value;
    const weatherInfo = document.getElementById('weather-info');
    weatherInfo.style.display = 'none';

    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`);
        const currentWeather = await response.json();

        const forecastResponse = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`);
        const forecast = await forecastResponse.json();

        displayWeather(currentWeather, forecast);
    } catch (error) {
        alert('City not found');
    }
}

function displayWeather(currentWeather, forecast) {
    document.getElementById('city-name').textContent = currentWeather.name;
    document.getElementById('temperature').textContent = `Temperature: ${currentWeather.main.temp}°C`;
    document.getElementById('description').textContent = currentWeather.weather[0].description;

    const forecastElement = document.getElementById('forecast');
    forecastElement.innerHTML = '';

    for (let i = 0; i < forecast.list.length; i += 8) {
        const dayForecast = forecast.list[i];
        const dayElement = document.createElement('div');
        dayElement.classList.add('forecast-day');
        dayElement.innerHTML = `
            <p>${new Date(dayForecast.dt_txt).toLocaleDateString()}</p>
            <p>Temp: ${dayForecast.main.temp}°C</p>
            <p>${dayForecast.weather[0].description}</p>
        `;
        forecastElement.appendChild(dayElement);
    }

    document.getElementById('weather-info').style.display = 'block';
}