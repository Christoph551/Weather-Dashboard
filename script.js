// Need to maintain local storage of user's input for city name


const $main = document.querySelector('#main');
const $submitBtn = document.querySelector('#submitBtn');
const $userInput = document.querySelector('#userInput');

let submitEventHandler = function (event) {
    event.preventDefault();
    
    let input = $userInput.value.trim();
    
    if (!input) {
        return;
    }
    
    getApi(requestUrl);
    
}
// created elements for date display
const dateFormat = dayjs().format("MMMM D, YYYY");
const $currentDate = document.querySelector('#currentDate');
const $figure = document.createElement('figure');
const $figContent = document.createElement('div');
const $currentDay = document.createElement('h2');

// These are a quick note for myself to iterate the necessary elements through for loop.
// Previous Searched Cities as well as the main element all together.
$figure.setAttribute("class","figure");
$figContent.setAttribute("class","weatherDisplay");
$currentDay.innerHTML = dateFormat;       
$currentDay.setAttribute("class","todaysDate");
$currentDate.append(dateFormat);



let getApi = function (weather) {
    // input = $userInput.val();
    
    fetch(requestUrl)
    .then(function (response) {
        const apiKey = '63b77ed365bd0d35dba55f456d174d34'; // https://home.openweathermap.org/api_keys
        const requestUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${$userInput}&appid=${apiKey}`;
        
        if (response.ok) {
            response.json().then(function (data) {
                displayWeather(data.items, weather);
            });
        } else {
            alert('Error: We could not find the requested information')
        }
    });
}
console.log(requestUrl);






// Need to figure out a for loop to iterate through API data and then append to newly created elements.
// for (let i = 0; i < weather.length)













$submitBtn.addEventListener('submit', submitEventHandler);











