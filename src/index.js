
function refreshWeather(response) {
let temperatureElement = document.querySelector("#temperature");
let temperature = response.data.temperature.current;
let cityElement = document.querySelector("#city");
let descriptionElement = document.querySelector("#description");
let humidityElement = document.querySelector("#humidity");
let windSpeedElement = document.querySelector("#wind-speed");
let timeElement = document.querySelector("#time");
let date = new Date(response.data.time * 1000);
let iconElement = document.querySelector("#icon");

icon.innerHTML = `<img src="${response.data.condition.icon_url}" class="weather-app-icon" />`;

console.log(response.data);

cityElement.innerHTML = response.data.city;
timeElement.innerHTML = formatDate(date);
descriptionElement.innerHTML = response.data.condition.description;
humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
windSpeedElement.innerHTML = `${response.data.wind.speed}km/h`;
temperatureElement.innerHTML = Math.round(temperature);

getForecast(response.data.city);

}

function formatDate(date) {
    
    let minutes = date.getMinutes();
    let hours = date.getHours();

    let days = [
    "Sunday", 
    "Monday", 
    "Tuesday", 
    "Wednesday", 
    "Thursday", 
    "Friday", 
    "Saturday",
];
    let day = days[date.getDay()];

    if (minutes < 10) {
        minutes = `0${minutes}`;
    }

    return `${day} ${hours}:${minutes}`;

}



function searchCity(city) {
let apiKey = "c7ab0aao28aa127c97428t4f44e0f3b8";
let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
axios.get(apiUrl).then(refreshWeather);
}




function handleSearchSubmit(event) {
    event.preventDefault();
    let searchInput = document.querySelector("#search-form-input");
    let cityElement = document.querySelector("#city");
    cityElement.innerHTML = searchInput.value;
    searchCity(searchInput.value);
}



let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);





function getForecast(city) {
let apiKey = "c7ab0aao28aa127c97428t4f44e0f3b8";
let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}`;
axios(apiUrl).then(displayForecast)

}



function displayForecast(response) {

    console.log(response.data);

let days = ["Tue", "Wed", "Thur", "Fri", "Sat"];
let forecastHtml ="";

days.forEach(function(day) {
    forecastHtml = 
    forecastHtml +
`
  <div class="weather-forecast-day">
                    <div class="weather-forecast-date">
                        ${day}</div>

                    <img src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/broken-clouds-day.png" alt=""
                        width="42" />
                    <div class="weather-forecast-temperatures">
                        <span class="weather-forecast-temperature-max">
                            18ºC
                        </span>
                        <span class="weather-forecast-temperature-min">
                            12ºC
                        </span>
                    </div>
                </div>
                `;
});

let forecastElement = document.querySelector("#forecast");
forecastElement.innerHTML = forecastHtml;
}



searchCity("Paris");


