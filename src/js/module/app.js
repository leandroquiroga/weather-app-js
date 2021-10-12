import { localizateDataBase } from "../database/loalidadDB";
import { showDays } from "../functions/dateMoment"
import { showWeather } from "../functions/localition"
import { searchWeather } from "../functions/seachLocation"
import showCity from "../functions/showCity";
import { eventListtener } from './../functions/listenners';

export const selector = (element) => document.querySelector(element)
export const create = (element) => document.createElement(element);
const expRegText = "^[A-ZÑa-zñáéíóúÁÉÍÓÚ'° ]+$";

// Evalua si son letras lo que se esta ingreando 
export const  isText = (value) => {
    if (value.match(expRegText) != null) return true

    return false
}

export const initAPP = () => {
    document.addEventListener('DOMContentLoaded', () => {
        localizateDataBase();
        showDays()
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(showWeather, searchWeather);
        }
        if (window.indexedDB.open('location', 1)) {
            showCity()
        }
    })
    eventListtener()
}


