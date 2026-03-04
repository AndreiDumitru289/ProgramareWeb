const themeToggleBtn = document.getElementById('themeToggle');

themeToggleBtn.addEventListener('click', function() {

    document.body.classList.toggle('dark-mode');

    if (document.body.classList.contains('dark-mode')) {

        themeToggleBtn.textContent = '☀️ Light Mode';
    } else {

        themeToggleBtn.textContent = '🌙 Dark Mode';
    }
});