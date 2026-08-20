(function () {
    const users = {
        user1: {
            password: "1111",
            name: "Avery Tan",
            role: "AI Explorer"
        },
        user2: {
            password: "2222",
            name: "Jordan Lee",
            role: "ML Builder"
        },
        user3: {
            password: "3333",
            name: "Samira Wong",
            role: "LLM Maker"
        },
        user4: {
            password: "4444",
            name: "Kai Lim",
            role: "Innovation Challenger"
        }
    };
    const XP_PER_LEVEL = 250;
    const loginPanel = document.getElementById("loginPanel");
    const profilePanel = document.getElementById("profilePanel");
    const loginForm = document.getElementById("loginForm");
    const loginMessage = document.getElementById("loginMessage");
    const historyElement = document.getElementById("profileHistory");
    const activityElement = document.getElementById("activityHistory");
    if (!loginPanel || !profilePanel || !loginForm || !window.AIClub) {
        return;
    }
    function escapeHtml(value) {
        return String(value ?? "")
            .replaceAll("&", "&amp;")
            .replaceAll("<", "&lt;")
            .replaceAll(">", "&gt;")
            .replaceAll('"', "&quot;")
            .replaceAll("'", "&#039;");
    }
    function formatDate(value) {
        const date = new Date(value);
        return Number.isNaN(date.getTime()) ? "Date unavailable" : date.toLocaleString();
    }
    function renderSkills(skills) {
        const skillElement = document.getElementById("skills");
        if (!skillElement) {
            return;
        }
        const entries = Object.entries(skills || {});
        if (!entries.length) {
            skillElement.innerHTML = '<p class="mini">No skill data available.</p>';
            return;
        }
        skillElement.innerHTML = entries
            .map(([name, rawLevel]) => {
            const level = Math.max(0, Math.min(100, Math.round(Number(rawLevel) || 0)));
            return `
                    <div class="skill-bar">
                        <div class="row">
                            <span>${escapeHtml(name)}</span>
                            <span class="skill-level-label">Level ${level} / 100</span>
                        </div>
                        <div class="progress">
                            <span style="width: ${level}%"></span>
                        </div>
                    </div>
                `;
        })
            .join("");
    }
    function renderExperience(progress) {
        const totalXp = Math.max(0, Math.round(Number(progress?.xp) || 0));
        const level = Math.floor(totalXp / XP_PER_LEVEL) + 1;
        const xpWithinLevel = totalXp % XP_PER_LEVEL;
        const percentage = (xpWithinLevel / XP_PER_LEVEL) * 100;
        document.getElementById("profileLevel").textContent = `Experience Level ${level}`;
        document.getElementById("profileXP").textContent = `${totalXp} total XP`;
        document.getElementById("xpLevelLabel").textContent = `Progress to Level ${level + 1}`;
        document.getElementById("xpLevelValue").textContent = `${xpWithinLevel} / ${XP_PER_LEVEL} XP`;
        document.getElementById("xpLevelBar").style.width = `${percentage}%`;
    }
    function renderActivities(activities) {
        if (!activityElement) {
            return;
        }
        if (!activities.length) {
            activityElement.innerHTML = '<p class="mini">No event, workshop or project history recorded yet.</p>';
            return;
        }
        const sorted = [...activities].sort((a, b) => new Date(b.date) - new Date(a.date));
        activityElement.innerHTML = sorted
            .map((activity) => `
                <div class="activity-row">
                    <div>
                        <div class="event-date">${escapeHtml(activity.type)}${activity.proficiency ? ` • ${escapeHtml(activity.proficiency)}` : ""}</div>
                        <h3>${escapeHtml(activity.title)}</h3>
                        <p>${escapeHtml(activity.detail || "AIS activity completed.")}</p>
                        ${activity.xp ? `<div class="chips"><span class="pill">+${Number(activity.xp)} XP</span></div>` : ""}
                    </div>
                    <div class="activity-meta">${escapeHtml(formatDate(activity.date))}</div>
                </div>
            `)
            .join("");
    }
    function renderPracticeHistory(attempts) {
        if (!historyElement) {
            return;
        }
        if (!attempts.length) {
            historyElement.innerHTML = '<p class="mini">No challenge history recorded yet. Complete a test on the Challenges page.</p>';
            return;
        }
        historyElement.innerHTML = attempts
            .map((attempt) => {
            const answerReview = (attempt.answers || [])
                .map((answer, index) => {
                const statusClass = answer.correct ? "answer-good" : "answer-bad";
                const status = answer.correct ? "Correct" : "Needs review";
                return `
                            <div class="review-question">
                                <h4>${index + 1}. ${escapeHtml(answer.question)}</h4>
                                <p class="${statusClass}">${status}: ${escapeHtml(answer.selectedText)}</p>
                                ${answer.correct ? "" : `<p><strong>Correct answer:</strong> ${escapeHtml(answer.correctText)}</p>`}
                                <p><strong>Explanation:</strong> ${escapeHtml(answer.explanation)}</p>
                                ${answer.xp ? `<p><strong>XP from question:</strong> +${Number(answer.xp)}</p>` : ""}
                            </div>
                        `;
            })
                .join("");
            const percentage = attempt.total ? Math.round((attempt.score / attempt.total) * 100) : 0;
            return `
                    <div class="history-item">
                        <div class="history-item-top">
                            <div>
                                <div class="mini">${escapeHtml(attempt.label || "Practice test")}</div>
                                <strong>${escapeHtml(formatDate(attempt.date))}</strong>
                            </div>
                            <div class="history-score">
                                ${attempt.score}/${attempt.total} · ${percentage}%
                                ${attempt.xpEarned ? `<span class="mini">+${Number(attempt.xpEarned)} XP</span>` : ""}
                            </div>
                        </div>
                        <details class="review-accordion">
                            <summary>Review every answer and explanation</summary>
                            <div class="review-content">
                                ${answerReview || '<p class="mini">A detailed answer review is not available for this earlier attempt.</p>'}
                            </div>
                        </details>
                    </div>
                `;
        })
            .join("");
    }
    function renderMetrics(memberData) {
        const attempts = memberData.challenges || [];
        const completedQuestions = attempts.reduce((sum, attempt) => sum + Number(attempt.total || 0), 0);
        const totalCorrect = attempts.reduce((sum, attempt) => sum + Number(attempt.score || 0), 0);
        const average = completedQuestions ? Math.round((totalCorrect / completedQuestions) * 100) : 0;
        document.getElementById("metricActivities").textContent = (memberData.activities || []).length;
        document.getElementById("metricProjects").textContent = (memberData.projects || []).length;
        document.getElementById("metricQuestions").textContent = completedQuestions;
        document.getElementById("metricAverage").textContent = `${average}%`;
    }
    function showUser(username) {
        const user = users[username];
        if (!user) {
            return;
        }
        const memberData = window.AIClub.getUserData(username);
        loginPanel.style.display = "none";
        profilePanel.style.display = "block";
        document.getElementById("profileName").textContent = user.name;
        document.getElementById("profileUser").textContent = `@${username}`;
        document.getElementById("profileRole").textContent = user.role;
        document.getElementById("avatar").textContent = user.name
            .split(" ")
            .map((part) => part[0])
            .join("")
            .slice(0, 2);
        renderExperience(memberData.progress);
        renderSkills(memberData.progress?.skills);
        renderMetrics(memberData);
        renderActivities(memberData.activities || []);
        renderPracticeHistory(memberData.challenges || []);
    }
    loginForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const username = document.getElementById("username").value.trim();
        const password = document.getElementById("password").value;
        if (users[username]?.password === password) {
            sessionStorage.setItem(window.AIClub.SESSION_KEY, username);
            loginMessage.textContent = "";
            showUser(username);
            window.location.hash = "content";
        }
        else {
            loginMessage.className = "form-message error";
            loginMessage.textContent = "Invalid username or password.";
        }
    });
    document.getElementById("logoutBtn")?.addEventListener("click", () => {
        sessionStorage.removeItem(window.AIClub.SESSION_KEY);
        profilePanel.style.display = "none";
        loginPanel.style.display = "block";
        loginForm.reset();
        window.location.reload();
    });
    const currentUser = window.AIClub.getCurrentUser();
    if (users[currentUser]) {
        showUser(currentUser);
    }
})();
