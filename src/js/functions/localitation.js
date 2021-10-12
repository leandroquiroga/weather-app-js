import { create, selector } from "../module/app";
import { showInfoFor5Days } from "./weather5Days";
// import {  } from ;

export const localizate = (position) => {
    let city;
    let cityActual = selector('#geo_now')
    const latitude = Number(position.coords.latitude);
    const longitude = Number(position.coords.longitude);
    const apiKey = 'd62111581f103b598198001d275a170b';
    const url = (`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`)
    console.log(url)
    fetch(url)
        .then(response => response.json())
        .then(datos => {
            const {name, id} = datos 
            city = name
            addDataBase(city, latitude, longitude);
            cityActual.textContent = city
            weatherConsult(id);
            weatherConsultFor5Days(latitude,longitude)
        })
        
}

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

function weatherConsult(cityID) {
    let currentCity = cityID
    const apiKey = 'd62111581f103b598198001d275a170b';
    const url = (`http://api.openweathermap.org/data/2.5/weather?id=${currentCity}&appid=${apiKey}`)
    fetch(url)
        .then(response => response.json())
        .then(data => {
            showData(data)
         })
}

function weatherConsultFor5Days(lat,long) {
    const apiKey = 'd62111581f103b598198001d275a170b';
    const url = (`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&exclude=current,minutely,hourly,alerts&appid=${apiKey}`)
    fetch(url)
        .then(response => response.json())
        .then(data => {
            showInfoFor5Days(data)
        })
}

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