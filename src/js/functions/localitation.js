import { create, selector } from "../module/app";
import { showInfoFor5Days } from "./weather5Days";
import 'regenerator-runtime/runtime'
// import {  } from ;

export const localizate = async (position) => {
    let city;
    let cityActual = selector('#geo_now')
    const latitude = Number(position.coords.latitude);
    const longitude = Number(position.coords.longitude);
    const apiKey = 'd62111581f103b598198001d275a170b';
    const url = (`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`)
    /* ~ */


    try {
        const resoponse = await fetch(url)
        const result = await resoponse.json();
        const { name, id } = result;
        city = name;
        addDataBase(city, latitude, longitude);
        cityActual.textContent = city
        weatherConsult(id);
        weatherConsultFor5Days(latitude, longitude); 
    } catch (error) {
        console.log(error)
    }

}

// create database with IndexdDB
function addDataBase(city, latitude, longitude) {
    let DB;
    let locale = {
        city:city,
        lat: latitude,
        long: longitude,
        id: Date.now()
    }
    let openDataBase = window.indexedDB.open('location', 1);

    openDataBase.onsuccess = () => {
        DB = openDataBase.result
        // agreagamos los datos en la base de datos
        let transaction = DB.transaction(['location'], 'readwrite');
        let objectStore = transaction.objectStore('location');

        objectStore.add(locale);

    }
    openDataBase.oncomplete = () => console.log("Transaccion completa");
    openDataBase.onerror = () => console.log('Sucedio un error')
}

// Check the API for the current weather in the city with your ID
async function weatherConsult(cityID) {
    let currentCity = cityID
    const apiKey = 'd62111581f103b598198001d275a170b';
    const url = (`http://api.openweathermap.org/data/2.5/weather?id=${currentCity}&appid=${apiKey}`)
    /* ~ */
    try {
        const response = await fetch(url);
        const result = await response.json();
        showData(result)
    } catch (error) {
        console.log(error)
    }
}

// Returns the forecast extended by 5 days
async function weatherConsultFor5Days(lat, long) {
    const apiKey = 'd62111581f103b598198001d275a170b';
    const url = (`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&exclude=current,minutely,hourly,alerts&appid=${apiKey}`)
    /* ~ */

    try {
        const response = await fetch(url);
        const result = await response.json();
        showInfoFor5Days(result)
    } catch (error) {
        console.log(error)
    }
}

// Show data the API
function showData(data) {
    const { main: { temp, humidity, pressure } } = data;
    const { weather: [{ main, icon }] } = data;
    const { wind: {speed}, visibility} = data

    scripting(temp, humidity, pressure, main, visibility, speed, icon)
}

function scripting(temp, humidity, air_pressure,main, visibility, speed, icon){
    let currentTemp = selector('#temp_now');
    let hudity = selector('#humudity');
    let progressBar = selector('.progress-bar');
    let pressure = selector('#aid-mb');
    let description = selector('.decription-weather');
    let visibilityDistace = selector('#ditance');
    let speddWind = selector('#wind-speed')
    let divIcon = selector('.status');

    currentTemp.textContent = `${Math.floor(temp - 273.15)}°c`;
    hudity.textContent = `${humidity}%`
    pressure.textContent = `${air_pressure}mb`
    description.textContent = `${main}`;
    visibilityDistace.textContent = `${visibility} m`;
    speddWind.textContent = `${speed} mph`
    progress_Bar(progressBar, humidity)
    showIcon(icon, divIcon)
}

function progress_Bar(bar, humidity) {
    let percentage = selector('#percentage')
    bar.style.width = `${humidity}%`
    bar.ariaValueNow = `${humidity}`;
    percentage.textContent = `${humidity}%`

}
function showIcon(icon, div) {
    let iconID = icon;
    let img = create('img')
    img.classList.add('weather-icon')
    img.src = (`http://openweathermap.org/img/wn/${iconID}@2x.png`);
    div.appendChild(img)
}