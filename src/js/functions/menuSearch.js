import { selector } from "../module/app";

export const openMenuSearch = () => {
    let menuSearch = selector('.barra-lateral-inf');
    let menuInfo = selector('.barra-lateral');

    if (menuSearch.classList.contains('oculto')) {
        menuInfo.classList.add('oculto');
        menuSearch.classList.remove('oculto')
        menuSearch.classList.add('scale-in-hor-left')
    } else {
        menuInfo.classList.remove('oculto');
        menuInfo.classList.add('scale-in-hor-left')
        menuSearch.classList.add('oculto')
    }
}



/*
=============================================================================
    Muestra el menu para buscar una ciudad en particular
=============================================================================
*/