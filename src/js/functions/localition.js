import { localizate } from "./localitation";

export const showWeather = (position) => {
    let DB;
    let openDataBase = window.indexedDB.open('location', 1);
    openDataBase.onsuccess = () => {
        DB = openDataBase.result
        let objectStore = DB.transaction('location').objectStore('location');
        let lengthObjStoreName = objectStore.openCursor().transaction.db.objectStoreNames // se queda con la cantidad de elementos en la base de datos
        // verifica si hay elementos guardados en indexdDB
        if (lengthObjStoreName.length <= 1) {
            localizate(position);
        }   

    }
}


/*
=============================================================================
    En base a la longitud y latitud se actualiza el panel 
    con la informacion adecuada 
=============================================================================
*/