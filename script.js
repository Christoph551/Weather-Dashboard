const apiKey = '63b77ed365bd0d35dba55f456d174d34'; // https://home.openweathermap.org/api_keys
const $main = document.querySelector('#main');
const $submitBtn = document.querySelector('#submitBtn');
const $userInput = document.getElementById('inputCity');
const searchHistory = document.querySelector('#searchHistory');
const previouslySearchedCity = document.querySelector('#previousCityList');
const $currentDate = document.querySelector('#currentDate');
let previousSearchList = [];
let city;


let clickEventHandler = function (event) {
    event.preventDefault();
    city = $userInput.value.trim().toUpperCase();
    console.log($userInput.value);
    if (city == '') {
        alert('Please enter a city name to search.')
        return;
    }
    getApi();
    dateWeather();
}


let getApi = function (weather) {
    let lang = 'en';
    let units = 'imperial';
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=${apiKey}&lang=${lang}`;

    fetch(url)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            if (!previousSearchList.includes(city)) {
                previousSearchList.push(city);
                window.localStorage.setItem('storedSearches', JSON.stringify(previousSearchList));
                previousCity(data);
                displayToday(data);
            }
            // oneCall(data[0].lat, data[0].lon);
            
        })
}

function oneCall(lat, lon) {

    var oneCallAPI = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=hourly,minutely,alerts&appid=${apiKey}&units=imperial`

    fetch(oneCallAPI)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            clearPreviousSearch();
            displayToday(data.current, data.daily);
            displayFiveDay(data.daily);
        })
}

function previousSearches() {
    var storedSearches = window.localStorage.getItem("storedSearches")
    if (storedSearches) {
        previousSearchList = JSON.parse(storedSearches);
        previousCity();
    }
}

function previousCity(data) {
    searchHistory.textContent = "Previously Searched Cities";
    for (i = 0; i < 6; i++) {
        let searchList = document.createElement('figure');
        searchList.setAttribute('class', 'list-group-item rounded');
        searchList.textContent = previousSearchList[i];
        searchHistory.appendChild(searchList);
    }
}

//created function for the previous search buttons to reload that city when clicked
function previousButton(event) {
    city = event.target.textContent;
    getApi(city);
}

//setup funciton to clear the field for the next searched city
function clearPreviousSearch() {
    fiveDayForecast.innerHTML = '';
    forecastHeader.textContent = '';
    cityEntered.value = '';
    todaysWeather.textContent = '';
}

function displayToday(weather) {
    const todayData = document.querySelector('#main');
    const container = document.createElement('figure');

    container.innerHTML = `
                            <section class="todayWeather">
                                <h2 class="cityName">${weather.name}</h2>
                                <aside class="d-flex">
                                    <ul class="container">
                                        <li class="listItems">Temperature: ${weather.main.temp} °F</li>
                                        <li class="listItems">Humidity: ${weather.main.humidity} %</li>
                                        <li class="listItems">Wind: ${weather.wind.speed} MPH</li>
                                        <li class="listItems">${weather.weather[0].description}</li>
                                    </ul>
                                </aside>
                            </section>
                            `;
    todayData.append(container);
}

function displayWeek(weather) {
    const weekData = document.querySelector('.days');
    const forecast = document.createElement('ol');

    forecast.innerHTML = `
                        
                        `
}

let dateWeather = function (data) {

    if (!$userData) {
        // Next 5 const are to display the date in the center above the weather data
        const dateFormat = dayjs().format("MMMM D, YYYY");
        const $currentDate = document.querySelector('#currentDate');
        const $figure = document.createElement('figure');
        const $figContent = document.createElement('div');
        const $currentDay = document.createElement('h3');
        $figure.setAttribute("class", "figure");
        $figContent.setAttribute("class", "weatherDisplay");
        $currentDay.innerHTML = dateFormat;
        $currentDay.setAttribute("class", "todaysDate");
        $currentDate.append(dateFormat);
    }
}

let clearDateWeather = function () {
    $currentDate.innerHTML = '';
}












$submitBtn.addEventListener('click', clickEventHandler);
