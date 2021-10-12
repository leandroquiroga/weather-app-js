import { DB } from "../database/loalidadDB";

export const showCity = () => {
    let openDataBase = window.indexedDB.open('location', 1);
    openDataBase.onsuccess = () => {
        // DB = openDataBase.result;
        let objectStore = DB.transaction('location').objectStore('location');
    
        objectStore.openCursor().onsuccess = (e) => {
            let cityActual = selector('#geo_now')
            let cursor = e.target.result;

            if (cursor) {
                const { city } = cursor.value
                cityActual.textContent = city
            }

        }

    }
}
