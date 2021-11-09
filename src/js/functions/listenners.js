import { openMenuSearch } from './menuSearch';
import { isText, selector } from './../module/app';
import { addCountryArr } from './listCountry';
import { dataWeatherCountry } from './countryData';
import { messageErr } from './messageErr';


export const eventListtener = () => {
    let btnclose = selector('#close');
    let btnSearch = selector('#btn_search');
    let inputForm = selector('#input-form');
    let btnCity = selector('#btn-form');
    let form = selector('#formulario')

    btnclose.addEventListener('click', () => openMenuSearch())
    btnSearch.addEventListener('click', () => openMenuSearch())
    inputForm.addEventListener('blur', () => {
        if (inputForm.value === '') {
            messageErr('Campo obligatorio', btnCity);
        } else if(!isText(inputForm.value)){
            messageErr('Datos invalidos', btnCity);
        } else {
            btnCity.disabled = false
        }
    })

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        let city = form[0].value
        searchCity(city, form);
    })

}

// Search the forescast extended by 5 days 
async function searchCity(city, form) {
    let btnCity = selector('#btn-form');
    const apiKey = 'd62111581f103b598198001d275a170b';
    const url = (`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`)
/*     fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.cod === '404') {
                messageErr('Ciudad Invalida', btnCity);
                return
            }
            
            addCountryArr(city)
            dataWeatherCountry(data);
            form.reset()
        
        })
 */
    
    try {
        const response = await fetch(url);
        const result = await response.status
        if (result === 404) {
            messageErr('Ciudad Invalida', btnCity);
            return
        }
        const data = await response.json();
        addCountryArr(city)
        dataWeatherCountry(data);
        form.reset()

    } catch (error) {
        console.log(error)
    }
}