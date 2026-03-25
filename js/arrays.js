const elementeLista = document.querySelectorAll('#education li');
const arrayEducatie = Array.from(elementeLista).map(element => element.textContent.trim());
console.log(arrayEducatie);