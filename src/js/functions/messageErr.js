import { selector } from "../module/app";

// Muesta un error en caso de cumplir ciertas condiciones
export const messageErr = (text, btn) => {
    let small = selector('#text-err')
    if (!small.textContent !== '') {
        small.textContent = text;
        btn.disabled = true
    }

    setTimeout(() => {
        small.textContent = '   ';       
    }, 2000);
}
