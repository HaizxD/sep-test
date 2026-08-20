(function () {
    "use strict";
    const CONSENT_COOKIE = "aiic-cookie-consent";
    const CONSENT_MAX_AGE = 60 * 60 * 24 * 30;
    const THEME_COOKIE = "aiClubTheme";
    const LAST_PAGE_COOKIE = "aiic-last-page";
    const LAST_PAGE_MAX_AGE = 60 * 60 * 24 * 30;
    const RETURN_SESSION_KEY = "aiic-return-session";
    const VALID_PAGES = new Set([
        "index.html",
        "about.html",
        "ml-projects.html",
        "resources.html",
        "ai.html",
        "workshop.html",
        "events.html",
        "challenges.html",
        "join.html",
        "profile.html"
    ]);
    function getCookie(name) {
        const prefix = `${encodeURIComponent(name)}=`;
        const row = document.cookie
            .split("; ")
            .find((item) => item.startsWith(prefix));
        return row ? decodeURIComponent(row.slice(prefix.length)) : "";
    }
    function setCookie(name, value, maxAge) {
        document.cookie = `${encodeURIComponent(name)}=${encodeURIComponent(value)}; max-age=${maxAge}; path=/; SameSite=Lax`;
    }
    function deleteCookie(name) {
        document.cookie = `${encodeURIComponent(name)}=; max-age=0; path=/; SameSite=Lax`;
    }
    function getCurrentPage() {
        const page = window.location.pathname.split("/").pop() || "index.html";
        return VALID_PAGES.has(page) ? page : "";
    }
    function saveCurrentPage() {
        if (getCookie(CONSENT_COOKIE) !== "accepted") {
            return;
        }
        const currentPage = getCurrentPage();
        if (currentPage) {
            setCookie(LAST_PAGE_COOKIE, currentPage, LAST_PAGE_MAX_AGE);
        }
    }
    function setupContinueWhereLeftOff() {
        let isNewSession = true;
        try {
            isNewSession = sessionStorage.getItem(RETURN_SESSION_KEY) !== "active";
            sessionStorage.setItem(RETURN_SESSION_KEY, "active");
        }
        catch (error) {
            isNewSession = true;
        }
        if (getCookie(CONSENT_COOKIE) !== "accepted") {
            return;
        }
        const currentPage = getCurrentPage();
        const lastPage = getCookie(LAST_PAGE_COOKIE);
        if (isNewSession && currentPage === "index.html" && lastPage && lastPage !== "index.html" && VALID_PAGES.has(lastPage)) {
            window.location.replace(lastPage);
            return;
        }
        saveCurrentPage();
        window.addEventListener("pagehide", saveCurrentPage);
    }
    function syncThemeCookieAfterAccept() {
        let savedTheme = "";
        try {
            savedTheme = localStorage.getItem("aiClubTheme") || "";
        }
        catch (error) {
            savedTheme = "";
        }
        if (savedTheme === "light" || savedTheme === "dark") {
            setCookie(THEME_COOKIE, savedTheme, 60 * 60 * 24 * 365);
        }
    }
    function createBanner() {
        const banner = document.createElement("aside");
        banner.id = "cookieBanner";
        banner.className = "aiic-cookie-banner";
        banner.setAttribute("role", "dialog");
        banner.setAttribute("aria-live", "polite");
        banner.setAttribute("aria-label", "Cookie preferences");
        banner.innerHTML = `
            <div class="aiic-cookie-icon" aria-hidden="true">◉</div>
            <div class="aiic-cookie-content">
                <span class="aiic-cookie-label">Cookie preferences</span>
                <h2>Allow preference cookies?</h2>
                <p>We use a consent cookie to remember this choice. If accepted, preference cookies can remember your selected theme and the last page you visited so you can continue where you left off.</p>
            </div>
            <div class="aiic-cookie-actions">
                <button class="aiic-cookie-btn aiic-cookie-reject" id="rejectCookies" type="button">Reject</button>
                <button class="aiic-cookie-btn aiic-cookie-accept" id="acceptCookies" type="button">Accept</button>
            </div>
        `;
        document.body.appendChild(banner);
        return banner;
    }
    function hideBanner(banner) {
        banner.classList.remove("show");
        window.setTimeout(() => banner.remove(), 260);
    }
    function setupCookieConsent() {
        const savedConsent = getCookie(CONSENT_COOKIE);
        if (savedConsent === "accepted" || savedConsent === "rejected") {
            return;
        }
        const banner = createBanner();
        const acceptButton = banner.querySelector("#acceptCookies");
        const rejectButton = banner.querySelector("#rejectCookies");
        window.requestAnimationFrame(() => {
            banner.classList.add("show");
        });
        acceptButton.addEventListener("click", function () {
            setCookie(CONSENT_COOKIE, "accepted", CONSENT_MAX_AGE);
            syncThemeCookieAfterAccept();
            saveCurrentPage();
            hideBanner(banner);
        });
        rejectButton.addEventListener("click", function () {
            setCookie(CONSENT_COOKIE, "rejected", CONSENT_MAX_AGE);
            deleteCookie(THEME_COOKIE);
            deleteCookie(LAST_PAGE_COOKIE);
            hideBanner(banner);
        });
    }
    window.AIICCookieConsent = {
        getChoice: function () {
            return getCookie(CONSENT_COOKIE);
        },
        hasAccepted: function () {
            return getCookie(CONSENT_COOKIE) === "accepted";
        },
        getLastPage: function () {
            return getCookie(LAST_PAGE_COOKIE);
        }
    };
    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", function () {
            setupCookieConsent();
            setupContinueWhereLeftOff();
        }, { once: true });
    }
    else {
        setupCookieConsent();
        setupContinueWhereLeftOff();
    }
})();
