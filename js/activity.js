(function () {
    if (!window.AIClub) {
        return;
    }
    const buttons = document.querySelectorAll("[data-track-activity]");
    function getActivityFromButton(button) {
        const proficiency = button.dataset.activityProficiency || "Participation";
        const explicitXp = Number(button.dataset.activityXp);
        const xp = Number.isFinite(explicitXp) && explicitXp > 0
            ? explicitXp
            : window.AIClub.difficultyXP(proficiency);
        return {
            id: button.dataset.activityId,
            type: button.dataset.activityType || "Activity",
            title: button.dataset.activityTitle || "AIS activity",
            date: button.dataset.activityDate || new Date().toISOString(),
            detail: button.dataset.activityDetail || "Completed AIS activity.",
            proficiency,
            skill: button.dataset.activitySkill || "Innovation",
            skillGain: Number(button.dataset.activitySkillGain) || undefined,
            xp
        };
    }
    function updateButtonState(button) {
        const status = button.parentElement?.querySelector(".track-status");
        const currentUser = window.AIClub.getCurrentUser();
        if (!currentUser) {
            if (status) {
                status.textContent = "Log in through Profile before recording this activity.";
            }
            return;
        }
        const activity = getActivityFromButton(button);
        const userData = window.AIClub.getUserData(currentUser);
        const alreadyRecorded = userData.activities.some((item) => item.id === activity.id);
        if (alreadyRecorded) {
            button.textContent = "Recorded ✓";
            button.disabled = true;
            if (status) {
                status.textContent = `Saved to @${currentUser}'s activity history.`;
            }
        }
        else if (status) {
            status.textContent = `${activity.proficiency} activity • +${activity.xp} XP when completed.`;
        }
    }
    buttons.forEach((button) => {
        updateButtonState(button);
        button.addEventListener("click", () => {
            const status = button.parentElement?.querySelector(".track-status");
            const username = window.AIClub.getCurrentUser();
            if (!username) {
                if (status) {
                    status.textContent = "Login required. Open Profile and sign in to record this activity.";
                    status.classList.add("error");
                }
                return;
            }
            const activity = getActivityFromButton(button);
            const added = window.AIClub.addActivity(username, activity);
            if (added) {
                button.textContent = "Recorded ✓";
                button.disabled = true;
                if (status) {
                    status.textContent = `Saved to @${username}. +${activity.xp} XP awarded.`;
                    status.classList.remove("error");
                    status.classList.add("success");
                }
            }
            else if (status) {
                status.textContent = "This activity is already in your profile history.";
            }
        });
    });
})();
