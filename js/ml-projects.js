(function fixThemeToggle() {
    var toggle = document.getElementById('themeToggle');
    if (!toggle)
        return;
    function syncButton() {
        var isLight = document.body.classList.contains('light-mode');
        toggle.textContent = isLight ? '🌙' : '☀️';
    }
    function loadTheme() {
        var stored = localStorage.getItem('aiClubTheme');
        if (stored === 'light') {
            document.body.classList.add('light-mode');
        }
        else {
            document.body.classList.remove('light-mode');
        }
        syncButton();
    }
    function toggleTheme(e) {
        e.preventDefault();
        document.body.classList.toggle('light-mode');
        var isLight = document.body.classList.contains('light-mode');
        localStorage.setItem('aiClubTheme', isLight ? 'light' : 'dark');
        syncButton();
    }
    loadTheme();
    toggle.addEventListener('click', toggleTheme);
})();
