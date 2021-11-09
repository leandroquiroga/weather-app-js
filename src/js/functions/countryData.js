import { create, selector } from "../module/app";
import { limpiarHTML } from "./clearHTML";

export const dataWeatherCountry = async (info) => {
    const { coord: { lon, lat }} = info;

    const apiKey = 'd62111581f103b598198001d275a170b';
    const url = (`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,hourly,alerts&appid=${apiKey}`)
/*     fetch(url)
        .then(response => response.json())
        .then(data => {
            showInfoFor5Days(data, info)
        }) */
    try {
        const response = await fetch(url);
        const data = await response.json();

        showInfoFor5Days(data, info)
    } catch (error) {
        console.log(error)
    }
}


function showInfoFor5Days(data, info) {
    const { visibility, main: {humidity, pressure }, wind: {speed} } = info; 
    const { daily } = data;


    let iconDayOne = selector('#icon-day-one');
    let tempDayOne = selector('#temp-day1');
    let iconDayTwo = selector('#icon-day-two');
    let tempDayTwo = selector('#temp-day2');
    let iconDayThree = selector('#icon-day-three');
    let tempDayThree = selector('#temp-day3');
    let iconDayFour = selector('#icon-day-four');
    let tempDayFour = selector('#temp-day4');
    let iconDayFive = selector('#icon-day-five');
    let tempDayFive = selector('#temp-day5');

    dailyWeather(iconDayOne,tempDayOne,daily[0]);
    dailyWeather(iconDayTwo,tempDayTwo,daily[1]);
    dailyWeather(iconDayThree,tempDayThree,daily[2]);
    dailyWeather(iconDayFour,tempDayFour,daily[3]);
    dailyWeather(iconDayFive, tempDayFive, daily[4]);
    scriptingCountry(visibility, humidity, pressure, speed) 
}

function dailyWeather (div, temp, arrDays) {
    const { temp: { min, max } } = arrDays;
    const { weather: [{ icon }] } = arrDays;
    let img = create('img');
    let iconID = icon;

    limpiarHTML(div)
    temp.childNodes[1].textContent = `${Math.floor(min - 273.15)}°c`;
    temp.childNodes[3].textContent = `${Math.floor(max - 273.15)}°c`;
    img.src = (`http://openweathermap.org/img/wn/${iconID}@2x.png`);
    img.style.width = '50px'
    img.style.heigth = '40px'

    div.appendChild(img)
}

function scriptingCountry(visibility, humidity, pressure, speed) {

    let hudity = selector('#humudity');
    let progressBar = selector('.progress-bar');
    let pressureAir = selector('#aid-mb');
    let visibilityDistace = selector('#ditance');
    let speddWind = selector('#wind-speed');

    hudity.textContent = `${humidity}%`
    pressureAir.textContent = `${pressure}mb`
    visibilityDistace.textContent = `${visibility} m`;
    speddWind.textContent = `${speed} mph`
    progress_Bar(progressBar, humidity)
}

function progress_Bar(bar, humidity) {
    let percentage = selector('#percentage')
    bar.style.width = `${humidity}%`
    bar.ariaValueNow = `${humidity}`;
    percentage.textContent = `${humidity}%`
}