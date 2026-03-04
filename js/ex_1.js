
const oraCurenta = new Date().getHours();


const paragraf = document.querySelector('header p');


if (paragraf) {
    let mesaj = "";

   
    if (oraCurenta >= 6 && oraCurenta < 12) {
        
        mesaj = "Bună dimineața! Bine ai venit pe pagina mea.";
        
    } else if (oraCurenta >= 12 && oraCurenta < 18) {
        
        mesaj = "Bună ziua! Bine ai venit pe pagina mea.";
        
    } else {
        
        mesaj = "Bună seara! Bine ai venit pe pagina mea.";
    }

    
    paragraf.textContent = mesaj;
}