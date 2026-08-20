(function () {
    const body = document.body;
    const themeToggle = document.getElementById("themeToggle");
    const savedTheme = localStorage.getItem("aiic-theme");
    if (savedTheme === "light") {
        body.classList.add("light-mode");
    }
    function updateThemeIcon() {
        if (!themeToggle) {
            return;
        }
        if (body.classList.contains("light-mode")) {
            themeToggle.innerHTML =
                '<i class="bi bi-moon-stars-fill"></i>';
        }
        else {
            themeToggle.innerHTML =
                '<i class="bi bi-sun-fill"></i>';
        }
    }
    updateThemeIcon();
    themeToggle?.addEventListener("click", function () {
        body.classList.toggle("light-mode");
        const currentTheme = body.classList.contains("light-mode")
            ? "light"
            : "dark";
        localStorage.setItem("aiic-theme", currentTheme);
        updateThemeIcon();
    });
    const mobileMenu = document.getElementById("mobileMenu");
    const navLinks = document.getElementById("navLinks");
    mobileMenu?.addEventListener("click", function () {
        navLinks.classList.toggle("open");
    });
    const currentPage = body.dataset.page;
    document
        .querySelectorAll(".nav-links a[data-page]")
        .forEach(function (link) {
        if (link.dataset.page ===
            currentPage) {
            link.classList.add("active");
        }
    });
    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target
                    .classList
                    .add("visible");
            }
        });
    }, {
        threshold: 0.12
    });
    document
        .querySelectorAll(".reveal")
        .forEach(function (element) {
        observer.observe(element);
    });
})();
