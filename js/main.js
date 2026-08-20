(function () {
    const MEMBER_DATA_KEY = "aiClubMemberDataV2";
    const SESSION_KEY = "aiClubLoggedIn";
    const seedAttempts = {
        user1: {
            id: "demo-user1-attempt",
            score: 2,
            total: 3,
            date: "2026-07-18T10:30:00",
            label: "Demo practice set",
            answers: [
                {
                    question: "What is the main purpose of keeping a test set separate from training data?",
                    selectedText: "To measure performance on unseen data",
                    correctText: "To measure performance on unseen data",
                    correct: true,
                    explanation: "A held-out test set estimates how the model performs on data it did not train on."
                },
                {
                    question: "What are embeddings commonly used for in semantic search?",
                    selectedText: "Compressing video files",
                    correctText: "Representing items as vectors so similar meaning can be compared",
                    correct: false,
                    explanation: "Embeddings encode semantic information as vectors so items with similar meaning can be compared mathematically."
                },
                {
                    question: "Which prompt change makes an LLM response easier to evaluate?",
                    selectedText: "Add a clear output format and acceptance criteria",
                    correctText: "Add a clear output format and acceptance criteria",
                    correct: true,
                    explanation: "Explicit format and acceptance criteria make outputs more consistent and easier to test."
                }
            ]
        },
        user2: {
            id: "demo-user2-attempt",
            score: 3,
            total: 3,
            date: "2026-07-25T14:15:00",
            label: "Demo practice set",
            answers: [
                {
                    question: "In a basic RAG pipeline, what normally happens before generation?",
                    selectedText: "Relevant source chunks are retrieved for the query",
                    correctText: "Relevant source chunks are retrieved for the query",
                    correct: true,
                    explanation: "Retrieval-augmented generation first retrieves relevant context and then supplies it to the generator."
                },
                {
                    question: "Which pair often provides more insight than accuracy alone for an imbalanced binary classifier?",
                    selectedText: "Precision and recall",
                    correctText: "Precision and recall",
                    correct: true,
                    explanation: "Precision and recall expose false-positive and false-negative behavior that accuracy can hide on imbalanced data."
                },
                {
                    question: "What is data leakage?",
                    selectedText: "Information from the test set influences training or feature creation",
                    correctText: "Information from the test set influences training or feature creation",
                    correct: true,
                    explanation: "Leakage occurs when information that should be unavailable during training or model selection influences the model."
                }
            ]
        },
        user3: {
            id: "demo-user3-attempt",
            score: 2,
            total: 3,
            date: "2026-08-02T16:40:00",
            label: "Demo practice set",
            answers: [
                {
                    question: "Which design best reduces unsupported answers in a club FAQ chatbot?",
                    selectedText: "Use retrieval from approved club documents and require citations",
                    correctText: "Use retrieval from approved club documents and require citations",
                    correct: true,
                    explanation: "Grounding the chatbot in approved documents reduces unsupported claims and makes answers easier to verify."
                },
                {
                    question: "What does temperature mainly influence in common text-generation settings?",
                    selectedText: "The amount of training data",
                    correctText: "The randomness of token selection",
                    correct: false,
                    explanation: "Temperature changes the distribution used when sampling tokens; higher values generally increase randomness."
                },
                {
                    question: "What is the strongest way to compare two prompt versions?",
                    selectedText: "Evaluate both on the same representative test set using defined metrics",
                    correctText: "Evaluate both on the same representative test set using defined metrics",
                    correct: true,
                    explanation: "Using the same representative cases and predefined criteria creates a controlled comparison."
                }
            ]
        },
        user4: {
            id: "demo-user4-attempt",
            score: 3,
            total: 3,
            date: "2026-08-09T11:20:00",
            label: "Demo practice set",
            answers: [
                {
                    question: "Which evaluation method best checks whether a new prompt is more reliable than the previous prompt?",
                    selectedText: "Run both prompts on the same test cases and compare predefined metrics",
                    correctText: "Run both prompts on the same test cases and compare predefined metrics",
                    correct: true,
                    explanation: "A controlled evaluation isolates the prompt change by keeping test cases and scoring criteria consistent."
                },
                {
                    question: "Why is a validation set useful during model development?",
                    selectedText: "It helps tune choices without using the final test set",
                    correctText: "It helps tune choices without using the final test set",
                    correct: true,
                    explanation: "Validation data supports model and hyperparameter selection while preserving the test set for final evaluation."
                },
                {
                    question: "What is the main goal of responsible AI evaluation?",
                    selectedText: "Check performance, limitations and relevant risks before deployment",
                    correctText: "Check performance, limitations and relevant risks before deployment",
                    correct: true,
                    explanation: "Responsible evaluation examines capability together with limitations and risks that matter in the intended use context."
                }
            ]
        }
    };
    const seedMembers = {
        user1: {
            activities: [
                {
                    id: "demo-prompt-foundations",
                    type: "Workshop",
                    title: "Prompt Engineering Foundations",
                    date: "2026-07-11T14:00:00",
                    detail: "Completed the beginner prompt structure and evaluation activity."
                },
                {
                    id: "demo-ai-kickoff",
                    type: "Event",
                    title: "AI Kickoff Night",
                    date: "2026-07-04T18:30:00",
                    detail: "Attended the club orientation and introductory prompt challenge."
                }
            ],
            challenges: [seedAttempts.user1]
        },
        user2: {
            activities: [
                {
                    id: "demo-ml-foundations",
                    type: "Workshop",
                    title: "Machine Learning Foundations",
                    date: "2026-07-18T14:00:00",
                    detail: "Completed the train, validation and test split activity."
                },
                {
                    id: "demo-project-sprint",
                    type: "Event",
                    title: "Mini ML Project Sprint",
                    date: "2026-07-26T10:00:00",
                    detail: "Participated in a small-team prototype sprint."
                }
            ],
            challenges: [seedAttempts.user2]
        },
        user3: {
            activities: [
                {
                    id: "demo-rag-grounding",
                    type: "Workshop",
                    title: "RAG & Grounding Lab",
                    date: "2026-08-01T14:00:00",
                    detail: "Built a basic retrieval-and-answer workflow using approved reference text."
                },
                {
                    id: "demo-prompt-lab",
                    type: "Event",
                    title: "Prompt Engineering Lab",
                    date: "2026-07-19T14:30:00",
                    detail: "Attended the structured prompting and scoring session."
                }
            ],
            challenges: [seedAttempts.user3]
        },
        user4: {
            activities: [
                {
                    id: "demo-evaluation-lab",
                    type: "Workshop",
                    title: "Evaluation & Responsible AI",
                    date: "2026-08-08T14:00:00",
                    detail: "Completed a model evaluation and risk-review exercise."
                },
                {
                    id: "demo-showcase",
                    type: "Event",
                    title: "Innovation Demo Evening",
                    date: "2026-08-15T18:00:00",
                    detail: "Presented a prototype and reviewed peer feedback."
                }
            ],
            challenges: [seedAttempts.user4]
        }
    };
    const seedProgress = {
        user1: {
            xp: 180,
            skills: {
                "Prompt Engineering": 62,
                "Machine Learning": 38,
                "LLM & RAG": 35,
                "Innovation": 55
            }
        },
        user2: {
            xp: 360,
            skills: {
                "Prompt Engineering": 71,
                "Machine Learning": 68,
                "LLM & RAG": 58,
                "Innovation": 60
            }
        },
        user3: {
            xp: 590,
            skills: {
                "Prompt Engineering": 84,
                "Machine Learning": 72,
                "LLM & RAG": 82,
                "Innovation": 77
            }
        },
        user4: {
            xp: 820,
            skills: {
                "Prompt Engineering": 88,
                "Machine Learning": 81,
                "LLM & RAG": 86,
                "Innovation": 91
            }
        }
    };
    function clone(value) {
        return JSON.parse(JSON.stringify(value));
    }
    function readStore() {
        try {
            const parsed = JSON.parse(localStorage.getItem(MEMBER_DATA_KEY) || "{}");
            return parsed && typeof parsed === "object" ? parsed : {};
        }
        catch (error) {
            return {};
        }
    }
    function writeStore(store) {
        localStorage.setItem(MEMBER_DATA_KEY, JSON.stringify(store));
    }
    function ensureMemberStore() {
        const store = readStore();
        let changed = false;
        Object.entries(seedMembers).forEach(([username, seed]) => {
            if (!store[username]) {
                store[username] = clone(seed);
                changed = true;
            }
            if (!Array.isArray(store[username].activities)) {
                store[username].activities = [];
                changed = true;
            }
            if (!Array.isArray(store[username].challenges)) {
                store[username].challenges = [];
                changed = true;
            }
            if (!Array.isArray(store[username].projects)) {
                store[username].projects = [];
                changed = true;
            }
            if (!store[username].progress || typeof store[username].progress !== "object") {
                store[username].progress = clone(seedProgress[username]);
                changed = true;
            }
            else {
                if (!Number.isFinite(Number(store[username].progress.xp))) {
                    store[username].progress.xp = seedProgress[username].xp;
                    changed = true;
                }
                if (!store[username].progress.skills || typeof store[username].progress.skills !== "object") {
                    store[username].progress.skills = clone(seedProgress[username].skills);
                    changed = true;
                }
                Object.entries(seedProgress[username].skills).forEach(([skill, level]) => {
                    if (!Number.isFinite(Number(store[username].progress.skills[skill]))) {
                        store[username].progress.skills[skill] = level;
                        changed = true;
                    }
                });
            }
        });
        if (changed || !localStorage.getItem(MEMBER_DATA_KEY)) {
            writeStore(store);
        }
        return store;
    }
    function getCurrentUser() {
        return sessionStorage.getItem(SESSION_KEY) || "";
    }
    function getUserData(username) {
        const store = ensureMemberStore();
        return clone(store[username] || {
            activities: [],
            challenges: [],
            projects: [],
            progress: { xp: 0, skills: {} }
        });
    }
    function saveUserData(username, data) {
        const store = ensureMemberStore();
        store[username] = data;
        writeStore(store);
    }
    function difficultyXP(level) {
        const normalized = String(level || "").toLowerCase();
        if (normalized.includes("advanced")) {
            return 50;
        }
        if (normalized.includes("intermediate")) {
            return 35;
        }
        if (normalized.includes("beginner")) {
            return 20;
        }
        return 15;
    }
    function applyProgress(data, xp, skill, skillGain) {
        const safeXp = Math.max(0, Number(xp) || 0);
        const safeSkillGain = Math.max(0, Number(skillGain) || 0);
        data.progress = data.progress || { xp: 0, skills: {} };
        data.progress.skills = data.progress.skills || {};
        data.progress.xp = Math.max(0, Number(data.progress.xp) || 0) + safeXp;
        if (skill) {
            const current = Number(data.progress.skills[skill]) || 0;
            data.progress.skills[skill] = Math.min(100, current + safeSkillGain);
        }
    }
    function addActivity(username, activity) {
        if (!username) {
            return false;
        }
        const data = getUserData(username);
        const duplicate = data.activities.some((item) => item.id === activity.id);
        if (duplicate) {
            return false;
        }
        const xp = Number(activity.xp) || difficultyXP(activity.proficiency);
        const skillGain = Number(activity.skillGain) || Math.max(1, Math.round(xp / 10));
        data.activities.unshift({
            ...activity,
            xp,
            recordedAt: new Date().toISOString()
        });
        applyProgress(data, xp, activity.skill || "Innovation", skillGain);
        saveUserData(username, data);
        return true;
    }
    function completeProject(username, project) {
        if (!username) {
            return false;
        }
        const data = getUserData(username);
        const duplicate = data.projects.some((item) => item.id === project.id);
        if (duplicate) {
            return false;
        }
        const xp = Number(project.xp) || difficultyXP(project.proficiency);
        const skillGain = Number(project.skillGain) || Math.max(2, Math.round(xp / 8));
        const completed = {
            ...project,
            xp,
            completedAt: new Date().toISOString()
        };
        data.projects.unshift(completed);
        data.activities.unshift({
            id: `project-${project.id}`,
            type: "Project",
            title: project.title,
            date: completed.completedAt,
            detail: project.detail || "Completed an AIS guided machine learning project.",
            proficiency: project.proficiency,
            xp
        });
        applyProgress(data, xp, project.skill || "Machine Learning", skillGain);
        saveUserData(username, data);
        return true;
    }
    function addChallengeAttempt(username, attempt) {
        if (!username) {
            return false;
        }
        const data = getUserData(username);
        data.challenges.unshift(attempt);
        data.challenges = data.challenges.slice(0, 20);
        const xp = Math.max(0, Number(attempt.xpEarned) || 0);
        applyProgress(data, xp, "Machine Learning", Math.max(1, Math.round(xp / 15)));
        const promptCorrect = (attempt.answers || []).filter((answer) => answer.correct && /prompt/i.test(`${answer.title || ""} ${answer.question || ""}`)).length;
        const ragCorrect = (attempt.answers || []).filter((answer) => answer.correct && /(rag|retriev|embedding|llm)/i.test(`${answer.title || ""} ${answer.question || ""}`)).length;
        if (promptCorrect) {
            applyProgress(data, 0, "Prompt Engineering", promptCorrect);
        }
        if (ragCorrect) {
            applyProgress(data, 0, "LLM & RAG", ragCorrect);
        }
        saveUserData(username, data);
        return true;
    }
    function getCookie(name) {
        return document.cookie
            .split("; ")
            .find((row) => row.startsWith(`${name}=`))
            ?.split("=")[1] || "";
    }
    function updateThemeIcon() {
        const themeButton = document.getElementById("themeToggle");
        if (themeButton) {
            themeButton.textContent = document.body.classList.contains("light-mode") ? "🌙" : "☀️";
        }
    }
    function setupTheme() {
        const body = document.body;
        const themeButton = document.getElementById("themeToggle");
        const mergedHomeSections = document.querySelector(".fv2-home-sections");
        const savedTheme = localStorage.getItem("aiClubTheme") || getCookie("aiClubTheme");
        function applyTheme(theme) {
            const isLight = theme === "light";
            body.classList.toggle("light-mode", isLight);
            mergedHomeSections?.classList.toggle("light-mode", isLight);
        }
        applyTheme(savedTheme === "light" ? "light" : "dark");
        updateThemeIcon();
        themeButton?.addEventListener("click", () => {
            const theme = body.classList.contains("light-mode") ? "dark" : "light";
            applyTheme(theme);
            localStorage.setItem("aiClubTheme", theme);
            if (getCookie("aiic-cookie-consent") === "accepted") {
                document.cookie = `aiClubTheme=${theme}; max-age=31536000; path=/; SameSite=Lax`;
            }
            updateThemeIcon();
        });
    }
    function setupNavigation() {
        const menuButton = document.getElementById("menuToggle");
        const mobileMenu = document.getElementById("mobileMenu");
        const navActions = document.querySelector(".nav-actions");
        const currentUser = getCurrentUser();
        menuButton?.addEventListener("click", () => {
            mobileMenu?.classList.toggle("open");
        });
        mobileMenu?.querySelectorAll("a").forEach((link) => {
            link.addEventListener("click", () => {
                mobileMenu.classList.remove("open");
            });
        });
        if (navActions && !document.querySelector(".member-status")) {
            const memberStatus = document.createElement("a");
            memberStatus.className = "member-status";
            memberStatus.href = "profile.html";
            memberStatus.textContent = currentUser ? `@${currentUser}` : "Login";
            memberStatus.title = currentUser ? "Open member profile" : "Open member login";
            navActions.prepend(memberStatus);
        }
    }
    function setupRevealAnimations() {
        const revealElements = document.querySelectorAll(".reveal");
        if (!("IntersectionObserver" in window)) {
            revealElements.forEach((element) => element.classList.add("visible"));
            return;
        }
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                }
            });
        }, { threshold: 0.12 });
        revealElements.forEach((element) => observer.observe(element));
    }
    function setupTiltCards() {
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            return;
        }
        document.querySelectorAll(".tilt-card").forEach((card) => {
            card.addEventListener("pointermove", (event) => {
                const rect = card.getBoundingClientRect();
                const x = (event.clientX - rect.left) / rect.width - 0.5;
                const y = (event.clientY - rect.top) / rect.height - 0.5;
                card.style.transform = `perspective(900px) rotateX(${(-y * 4).toFixed(2)}deg) rotateY(${(x * 5).toFixed(2)}deg) translateY(-4px)`;
            });
            card.addEventListener("pointerleave", () => {
                card.style.transform = "";
            });
        });
    }
    function setupImageFallbacks() {
        document.querySelectorAll("img[data-fallback]").forEach((image) => {
            image.addEventListener("error", () => {
                const fallback = image.dataset.fallback;
                if (fallback && image.dataset.fallbackApplied !== "true") {
                    image.dataset.fallbackApplied = "true";
                    image.src = fallback;
                }
            });
        });
    }
    ensureMemberStore();
    window.AIClub = {
        MEMBER_DATA_KEY,
        SESSION_KEY,
        getCurrentUser,
        getUserData,
        saveUserData,
        addActivity,
        completeProject,
        addChallengeAttempt,
        difficultyXP
    };
    setupTheme();
    setupNavigation();
    setupRevealAnimations();
    setupTiltCards();
    setupImageFallbacks();
    document.querySelectorAll("[data-year]").forEach((element) => {
        element.textContent = new Date().getFullYear();
    });
})();
(function () {
    const body = document.querySelector(".fv2-home-sections");
    if (!body) {
        return;
    }
    const themeToggle = body.querySelector("#themeToggle");
    const savedTheme = localStorage.getItem("aiClubTheme");
    body.classList.toggle("light-mode", document.body.classList.contains("light-mode") || savedTheme === "light");
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
        localStorage.setItem("aiClubTheme", currentTheme);
        document.body.classList.toggle("light-mode", currentTheme === "light");
        updateThemeIcon();
    });
    const mobileMenu = body.querySelector("#mobileMenu");
    const navLinks = body.querySelector("#navLinks");
    mobileMenu?.addEventListener("click", function () {
        navLinks.classList.toggle("open");
    });
    const currentPage = body.dataset.page;
    body
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
    body
        .querySelectorAll(".reveal")
        .forEach(function (element) {
        observer.observe(element);
    });
})();
document.addEventListener("DOMContentLoaded", function () {
    document
        .querySelectorAll('nav a[href="ai.html"], #mobileMenu a[href="ai.html"]')
        .forEach(function (link) {
        if (link.textContent.trim().toLowerCase() === "ai hub") {
            link.setAttribute("href", "ai.html");
        }
    });
});
