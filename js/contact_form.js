const form = document.getElementById('contactForm');
const feedback = document.getElementById('feedback');

form.addEventListener('submit', function(event) {
    
    event.preventDefault();

    const firstName = document.getElementById('fname').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    if (firstName.length < 2) {
        
        feedback.textContent = "Eroare: Numele trebuie să aibă cel puțin 2 caractere!";
        feedback.style.color = "red";

    } else if (!email.includes('@')) {
        
        feedback.textContent = "Eroare: Adresa de email trebuie să conțină caracterul '@'!";
        feedback.style.color = "red";

    } else if (message.length < 10) {
        
        feedback.textContent = "Eroare: Mesajul este prea scurt (minim 10 caractere)!";
        feedback.style.color = "red";

    } else {
        
        feedback.textContent = `Multumim, ${firstName}! Mesajul a fost trimis.`;
        feedback.style.color = "green";
        
        form.reset();
    }
});