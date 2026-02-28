
const tempDisplay = document.getElementById("temperature");
const weatherImg = document.getElementById("weatherImg");
const condDisplay = document.getElementById("weatherCondition");
const apiCallURL = 'https://api.open-meteo.com/v1/forecast?latitude=45.419853&longitude=-75.68995&daily=sunrise,sunset&hourly=temperature_2m,weather_code&timezone=America%2FNew_York&forecast_days=1';

const date = new Date();
hour = date.toLocaleTimeString([], {
    hourCycle: 'h23',
    hour: '2-digit'
});
console.log("Hour: " + hour);

let sunCondition = 0; //1: night, 2: night/rising, 3: day, 4: day/setting;

window.addEventListener("load", (event) => {
    weatherFetch();
    weatherDescriptionsFetch();
});

let weatherDescriptions = {};
async function weatherDescriptionsFetch(){
    const res = await fetch('/js/weather-descriptions.json');
    const data = await res.json();
    if(res.ok){
        updateWeatherDescriptions(data);
    }
}
async function weatherFetch(){
    const res = await fetch(apiCallURL);
    const data = await res.json();
    if(res.ok){
        weatherDisplay(data);
    }
}
function weatherDisplay(data){
    console.log(data);
    const temp = data.hourly.temperature_2m[hour];
    console.log("Temp: " + temp);
    tempDisplay.innerText = temp + "°C";
    const conditionCodeWMO = data.hourly.weather_code[hour];
    console.log("Condition code: " + conditionCodeWMO);
    const sunriseTime = new Date(data.daily.sunrise[0]).toLocaleTimeString([], {
        hourCycle: 'h23',
        hour: '2-digit'
    });
    console.log("Sunrise time: " + sunriseTime);
    const sunsetTime = new Date(data.daily.sunset[0]).toLocaleTimeString([], {
        hourCycle: 'h23',
        hour: '2-digit'
    });
    console.log("Sunset time: " + sunsetTime);
    if(hour < sunriseTime){
        sunCondition = 1;
    }else if(hour == sunriseTime){
        sunCondition = 2;
    }else if(hour > sunriseTime && hour < sunsetTime){
        sunCondition = 3;
    }else if(hour == sunsetTime){
        sunCondition = 4;
    }else if(hour > sunsetTime){
        sunCondition = 1;
    }
    console.log("Sun condition code: " + sunCondition);
    weatherConditionInterpreter(conditionCodeWMO);
}
function updateWeatherDescriptions(data){
    weatherDescriptions = data;
}

let currentWeatherDescription = 'weather loading';
let currentWeatherImg = '/img/weather/default.jpg';
function weatherConditionInterpreter(code){
    if (sunCondition == 1 || sunCondition == 2){
        currentWeatherDescription = weatherDescriptions[code].night.description;
        currentWeatherImg = weatherDescriptions[code].night.image;
    }else if (sunCondition == 3 || sunCondition == 4){
        currentWeatherDescription = weatherDescriptions[code].day.description;
        currentWeatherImg = weatherDescriptions[code].day.image;
    }
    console.log(currentWeatherImg);
    condDisplay.innerText = currentWeatherDescription;
    weatherImg.src = currentWeatherImg;

}