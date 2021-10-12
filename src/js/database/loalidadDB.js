export let DB;

export const localizateDataBase = () => {
    // creamos la base de datos
    const dataBase = window.indexedDB.open('location', 1);
    // en caso de error
    dataBase.onerror = () =>  console.log("Hubo un error") 
    // se creo correctamente
    dataBase.onsuccess = () => {
        DB = dataBase.result;
        console.log("Se creo la base de datos ! ")
        // lamar funcion que muestra la localidad
    }
    // schema
    dataBase.onupgradeneeded = (e) => {
        const db = e.target.result;
        const objectStore = db.createObjectStore('location',{
            keyPath: 'id',
            autoIncremet: false,
        });
        // columnas 
        objectStore.createIndex('localidad', 'id', {unique: true})
        objectStore.createIndex('long', 'long', { unique: true });
        objectStore.createIndex('lat', 'lat', {unique: true} )
        objectStore.createIndex('city', 'city', {unique: true} )
    }
}

/*
=============================================================================
    Crea la base de datos para la ciudad actual que localiza tu GPS
=============================================================================
*/