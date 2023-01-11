// Need event listener on submit button. May also add loading animation if requestUrl takes a bit.
// Need to maintain local storage of user's input for city name
// Need to link a viable weather API to reference.
// Also need to import day.js to display current date

const apiKey = '63b77ed365bd0d35dba55f456d174d34'; // https://home.openweathermap.org/api_keys

const $main = document.querySelector('#main');
const dateFormat = dayjs().format("MMMM D, YYYY");
const $currentDate = document.querySelector('#currentDate');
const $submitBtn = document.querySelector('#submitBtn');
const $userInput = document.querySelector('#userInput');

// Need to figure out a for loop to iterate through API data and then append to newly
// created elements.
// for (let i = 0; i < data.length) 
const $figure = document.createElement('figure');
const $figContent = document.createElement('div');
const $currentDay = document.createElement('h2');
    $figure.setAttribute("class","figure");
    $figContent.setAttribute("class","weatherDisplay");
    $currentDay.innerHTML = dateFormat;       
    $currentDay.setAttribute("class","todaysDate");
    $currentDate.append(dateFormat);

function submitEventHandler (event) {
    event.preventDefault();
    const requestUrl = `https://api.openweathermap.org/data/2.5/weather?q=${$userInput}&appid=${apiKey}`;
    searchedCity = $userInput.val();

    // if () {

    // }
}






















$submitBtn.addEventListener('submit', submitEventHandler);











