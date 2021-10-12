import moment from "moment"
import { selector } from './../module/app';

export const showDays = () => {
    let date = selector('#weather_now');
    let dataNow = selector('#dia_one');
    let tomorrow = selector('#dia_two');
    let dayThree = selector('#dia_three');
    let dayFour = selector('#dia_four');
    let dayFive = selector('#dia_five');
    let day = moment().format("MMM Do");
    date.textContent = day;
    dataNow.textContent = day;
    tomorrow.textContent = moment().add(1, 'day').format("MMM Do");
    dayThree.textContent = moment().add(2, 'day').format("MMM Do");
    dayFour.textContent = moment().add(3, 'day').format("MMM Do");
    dayFive.textContent = moment().add(4, 'day').format("MMM Do");
}
/*
    =============================================================================
        Calcula la fecha actual y la de 5 dias posteriores con Moment.js
    =============================================================================
*/