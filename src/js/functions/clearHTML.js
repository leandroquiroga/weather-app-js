export const limpiarHTML = (div) => {
    while( div.firstChild ){
        div.removeChild(div.firstChild);
    }
}

/*
    =============================================================================
        Si el elemento padre tiene un elemento hijo, lo elimina
    =============================================================================
*/