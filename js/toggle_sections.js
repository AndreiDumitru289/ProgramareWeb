const titluri = document.querySelectorAll('main h2');

titluri.forEach(function(titlu) {

    titlu.textContent = '▼ ' + titlu.textContent;
    titlu.style.cursor = 'pointer';

    titlu.addEventListener('click', function() {
        
        if (this.textContent.includes('▼')) {
            this.textContent = this.textContent.replace('▼', '▶');
        } else {
            this.textContent = this.textContent.replace('▶', '▼');
        }

        let elementUrmator = this.nextElementSibling;
        
        while (elementUrmator) {
            elementUrmator.classList.toggle('hidden');
            
            elementUrmator = elementUrmator.nextElementSibling;
        }
    });
});