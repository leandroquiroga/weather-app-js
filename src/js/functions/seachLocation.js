// import { hideMainBody } from "./hidemain";
import { openMenuSearch } from "./menuSearch";

export const searchWeather = (error) => {
    switch (error.code) {
        case error.PERMISSION_DENIED:
            openMenuSearch();
            // hideMainBody()
            console.log('Permiso denegado');
            break;
        case error.POSITION_UNAVAILABLE:
            console.log("Ubicacion desconocida")
            break;
        
    }
}

/*
=============================================================================
    En caso de que el usuario no comparta la ubicacion se le va a permitir 
    buscar una ciudad en particular. 
=============================================================================
*/