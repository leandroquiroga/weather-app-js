import { create } from "../module/app"
import { selector } from './../module/app';

export const addCountryArr = (value) => {
    let ul = selector('#list-coutry')
    let li = create('li');
    let btn = create('button');

    li.classList.add('list-group-item');
    btn.value = value;
    btn.id = Date.now();
    btn.type = 'submit';
    btn.textContent = value
    btn.classList.add('button');
    li.appendChild(btn)

    ul.appendChild(li)
}

/*
=============================================================================
    Por cada vez que buscas una localida en particular, se crea un TODO-list 
    de dichas ciudades
=============================================================================
*/