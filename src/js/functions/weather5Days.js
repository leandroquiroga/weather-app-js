import { create } from "../module/app";
import { selector } from './../module/app';

export const showInfoFor5Days = (data) => {
    const { daily } = data
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

    dailyWeather(iconDayOne,tempDayOne,daily[0])
    dailyWeather(iconDayTwo,tempDayTwo,daily[1])
    dailyWeather(iconDayThree,tempDayThree,daily[2])
    dailyWeather(iconDayFour,tempDayFour,daily[3])
    dailyWeather(iconDayFive,tempDayFive,daily[4])
}

function dailyWeather (div, temp, arrDays) {
    const { temp: { min, max } } = arrDays;
    const { weather: [{ icon }] } = arrDays;
    let img = create('img');
    let iconID = icon;

    temp.childNodes[1].textContent = `${Math.floor(min - 273.15)}°c`;
    temp.childNodes[3].textContent = `${Math.floor(max - 273.15)}°c`;
    img.src = (`http://openweathermap.org/img/wn/${iconID}@2x.png`);
    img.style.width = '50px'
    img.style.heigth = '40px'

    div.appendChild(img)
}

/*
=============================================================================
    Pinta el HTML con la informacion traida desde la API 
=============================================================================
*/