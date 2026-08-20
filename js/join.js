(function () {
    const form = document.getElementById("joinForm");
    const message = document.getElementById("formMessage");
    const phoneCountry = document.getElementById("phoneCountry");
    const phoneNumber = document.getElementById("phoneNumber");
    const phoneHelp = document.getElementById("phoneHelp");
    const draftKey = "aisApplicationDraft";
    if (!form || !message) {
        return;
    }
    function updatePhoneFormat() {
        if (!phoneCountry || !phoneNumber || !phoneHelp) {
            return;
        }
        const selected = phoneCountry.options[phoneCountry.selectedIndex];
        const code = selected?.dataset.code || "+";
        const example = selected?.dataset.example || "country code + local number";
        phoneNumber.placeholder = example;
        phoneHelp.textContent = phoneCountry.value === "OTHER"
            ? "Enter your country calling code and local number, for example +33 6 12 34 56 78."
            : `Selected format example: ${code} ${example}. Spaces and hyphens are allowed.`;
    }
    function restoreDraft() {
        const savedDraft = localStorage.getItem(draftKey);
        if (!savedDraft) {
            updatePhoneFormat();
            return;
        }
        try {
            const draft = JSON.parse(savedDraft);
            Object.entries(draft).forEach(([name, value]) => {
                const element = form.elements[name];
                if (!element) {
                    return;
                }
                if (element.type === "checkbox") {
                    element.checked = value === "on" || value === true;
                }
                else {
                    element.value = value || "";
                }
            });
        }
        catch (error) {
            localStorage.removeItem(draftKey);
        }
        updatePhoneFormat();
    }
    function saveDraft() {
        const data = Object.fromEntries(new FormData(form).entries());
        data.agreement = document.getElementById("agreement")?.checked || false;
        localStorage.setItem(draftKey, JSON.stringify(data));
    }
    function normalizePhone() {
        if (!phoneCountry || !phoneNumber) {
            return "";
        }
        const selected = phoneCountry.options[phoneCountry.selectedIndex];
        const code = selected?.dataset.code || "";
        const raw = phoneNumber.value.trim();
        const digits = raw.replace(/\D/g, "");
        if (phoneCountry.value !== "OTHER" && (digits.length < 6 || digits.length > 15)) {
            phoneNumber.setCustomValidity("Enter a valid local phone number using 6 to 15 digits.");
            return "";
        }
        if (phoneCountry.value === "OTHER" && !/^\+?[\d\s()-]{7,22}$/.test(raw)) {
            phoneNumber.setCustomValidity("Enter an international phone number including the country calling code.");
            return "";
        }
        phoneNumber.setCustomValidity("");
        return phoneCountry.value === "OTHER" ? raw : `${code} ${raw}`;
    }
    restoreDraft();
    phoneCountry?.addEventListener("change", updatePhoneFormat);
    phoneNumber?.addEventListener("input", () => {
        phoneNumber.setCustomValidity("");
    });
    form.addEventListener("input", saveDraft);
    form.addEventListener("change", saveDraft);
    form.addEventListener("submit", (event) => {
        event.preventDefault();
        const formattedPhone = normalizePhone();
        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }
        if (!document.getElementById("agreement").checked) {
            message.className = "form-message error";
            message.textContent = "Confirm the declaration before submitting.";
            return;
        }
        const data = Object.fromEntries(new FormData(form).entries());
        let applications = [];
        try {
            applications = JSON.parse(localStorage.getItem("aisApplications") || "[]");
        }
        catch (error) {
            applications = [];
        }
        data.phone = formattedPhone;
        data.submittedAt = new Date().toISOString();
        applications.push(data);
        localStorage.setItem("aisApplications", JSON.stringify(applications));
        sessionStorage.setItem("lastApplication", data.fullName || "Applicant");
        localStorage.removeItem(draftKey);
        form.reset();
        updatePhoneFormat();
        message.className = "form-message success";
        message.textContent = `Application saved on this device. Reference: AIS-${String(applications.length).padStart(3, "0")}`;
    });
})();
