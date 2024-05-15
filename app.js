const apiKey = 'cbbc4708df34fee8dbcc2e5accb3caf0'; // Ersetze durch deinen OpenWeatherMap API-Key

document.addEventListener('DOMContentLoaded', () => {
    const cityInput = document.getElementById('city-input');
    const searchButton = document.getElementById('search-button');
    
    // Event Listener für die 'Enter'-Taste
    cityInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            getWeather();
        }
    });

    // Event Listener für den Such-Button
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

        // Anzeige des aktuellen Wetters
        const weatherIcon = getWeatherIcon(currentWeatherData.weather[0].icon);
        currentWeatherIcon.src = `images/${weatherIcon}`;
        currentTemperature.textContent = `${Math.round(currentWeatherData.main.temp)}°C`;
        currentLocation.textContent = currentWeatherData.name;
        currentWeather.style.display = 'block';

        // Hintergrund ändern basierend auf dem aktuellen Wetter
        const weatherCondition = currentWeatherData.weather[0].main.toLowerCase();
        changeBackground(weatherCondition);
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

        const date = new Date(dayForecast.dt_txt);
        const weekday = date.toLocaleDateString('de-DE', { weekday: 'short' });
        const day = date.getDate();
        const month = date.getMonth() + 1; // Monate beginnen bei 0

        dayElement.innerHTML = `
            <p>${weekday}</p>
            <p>${day}.${month < 10 ? '0' : ''}${month}</p>
            <img src="images/${weatherIcon}" alt="${dayForecast.weather[0].description}">
            <p>${Math.round(dayForecast.main.temp)}°C</p>
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
            return 'default.png'; // Optional: Fallback-Icon
    }
}

function changeBackground(weatherCondition) {
    const body = document.body;
    let backgroundFilename = '';

    switch(weatherCondition) {
        case 'clear':
            backgroundFilename = 'clear.jpg';
            break;
        case 'clouds':
            backgroundFilename = 'cloudy.jpg';
            break;
        case 'rain':
            backgroundFilename = 'rain.jpg';
            break;
        case 'thunderstorm':
            backgroundFilename = 'thunderstorm.jpg';
            break;
        case 'snow':
            backgroundFilename = 'snow.jpg';
            break;
        case 'mist':
        case 'smoke':
        case 'haze':
        case 'dust':
        case 'fog':
        case 'sand':
        case 'ash':
        case 'squall':
        case 'tornado':
            backgroundFilename = 'fog.jpg';
            break;
        default:
            backgroundFilename = 'default.jpg';
            break;
    }

    body.style.backgroundImage = `url('backgrounds/${backgroundFilename}')`;
}