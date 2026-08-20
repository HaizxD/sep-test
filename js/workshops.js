(function () {
    if (!window.AIClub) {
        return;
    }
    const workshops = {
        "prompt-foundations": {
            id: "workshop-prompt-foundations",
            title: "Prompt Engineering Foundations",
            proficiency: "Beginner",
            xp: 20,
            skill: "Prompt Engineering",
            skillGain: 4,
            time: "60 min",
            summary: "Learn how goals, context, constraints, examples and output formats change the reliability of an LLM prompt.",
            notes: "A longer prompt is not automatically a better prompt. Every instruction should clarify the task, the allowed context or the expected output.",
            steps: [
                ["Start with a vague request", "Write a short request such as: Explain machine learning."],
                ["Add the audience and goal", "Specify who the answer is for and what they should be able to do after reading it."],
                ["Add useful context", "Provide only the facts or situation the model needs for this task."],
                ["Add constraints", "Specify length, tone, prohibited content or boundaries that matter to the task."],
                ["Define the output format", "Ask for headings, bullets, JSON, a table or another structure that can be checked."],
                ["Compare outputs", "Run the vague and structured versions, then record which differences came from the added instructions."]
            ],
            exercise: "Create two prompts for the same study task. Keep the task constant and change only the structure. Decide which response is easier to evaluate and explain why.",
            check: "Can another person read your prompt and identify the goal, relevant context, constraints and expected output without guessing?"
        },
        "ml-foundations": {
            id: "workshop-ml-foundations",
            title: "Machine Learning Foundations",
            proficiency: "Beginner",
            xp: 20,
            skill: "Machine Learning",
            skillGain: 4,
            time: "75 min",
            summary: "Learn the basic supervised learning workflow: define the target, prepare examples, split data, train a model and evaluate on unseen data.",
            notes: "Keep the final test data separate from model selection. Repeatedly tuning against the test set makes it less useful as an unbiased final check.",
            steps: [
                ["Define the prediction task", "Write down the input features and the target you want the model to predict."],
                ["Inspect the dataset", "Check feature types, missing values, label distribution and obvious data-quality problems."],
                ["Split the data", "Create training data for fitting, validation data for development decisions and test data for final evaluation when the dataset size supports it."],
                ["Choose a baseline", "Use a simple rule or simple model so improvements have something concrete to beat."],
                ["Train and evaluate", "Fit the model only with allowed training information, then calculate appropriate evaluation metrics."],
                ["Review errors", "Inspect incorrect predictions and look for patterns instead of relying only on one aggregate score."]
            ],
            exercise: "Sketch a train/validation/test workflow for a classifier that predicts whether a club member will attend an event. List which information is available before the event and which information would be leakage.",
            check: "Could you explain why the model must not learn from information that would only exist after the prediction time?"
        },
        "rag-grounding": {
            id: "workshop-rag-grounding",
            title: "RAG & Grounding Lab",
            proficiency: "Intermediate",
            xp: 35,
            skill: "LLM & RAG",
            skillGain: 6,
            time: "90 min",
            summary: "Understand a retrieval-augmented generation workflow by separating source retrieval from answer generation.",
            notes: "Retrieval quality matters. A fluent answer can still be unsupported if the retrieved context is irrelevant or incomplete.",
            steps: [
                ["Create approved source text", "Use a small set of club policies, workshop descriptions or event notes as the knowledge base."],
                ["Split into chunks", "Break long documents into sections that preserve enough context to answer likely questions."],
                ["Retrieve relevant chunks", "For each question, rank chunks by similarity or another retrieval method."],
                ["Build the grounded prompt", "Provide the selected chunks and instruct the model to answer only from that supplied evidence."],
                ["Show the source", "Display the retrieved source title or chunk with the answer so users can verify it."],
                ["Test failure cases", "Ask questions that are not covered by the sources and confirm the system can say that the information is unavailable."]
            ],
            exercise: "Write three FAQ questions: one clearly answered by the source, one that requires combining two source sections and one that is not covered. Define the desired behavior for each.",
            check: "Does your assistant distinguish between supported information and information that is absent from the retrieved sources?"
        },
        "evaluation-ai": {
            id: "workshop-evaluation-responsible-ai",
            title: "Evaluation & Responsible AI",
            proficiency: "Advanced",
            xp: 50,
            skill: "Innovation",
            skillGain: 7,
            time: "90 min",
            summary: "Create a repeatable evaluation plan that measures model behavior, documents limitations and checks risks relevant to the intended use.",
            notes: "An evaluation should match the real use case. A metric that is easy to calculate is not automatically the metric that matters most to users.",
            steps: [
                ["Define success criteria", "Write observable criteria before comparing models or prompt variants."],
                ["Create representative test cases", "Include normal cases, difficult cases and realistic edge cases from the intended use."],
                ["Keep the comparison controlled", "Use the same cases and scoring rules for every system version being compared."],
                ["Record failures", "Classify failure types instead of only calculating an average score."],
                ["Review risks", "Consider privacy, bias, unsupported claims, misuse and whether human oversight is needed."],
                ["Make a deployment decision", "State what evidence supports deployment, what limitations remain and what monitoring would still be required."]
            ],
            exercise: "Design a five-case test set for a student FAQ assistant. Include at least one ambiguous question, one unsupported question and one question involving potentially sensitive information.",
            check: "Can you justify why each test case represents a behavior or risk that matters in the intended use?"
        }
    };
    const workspace = document.getElementById("workshopWorkspace");
    const buttons = document.querySelectorAll("[data-workshop-id]");
    const saveTarget = document.getElementById("workshopSaveTarget");
    if (!workspace || !buttons.length) {
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
    function renderWorkshop(workshop) {
        const username = window.AIClub.getCurrentUser();
        const userData = username ? window.AIClub.getUserData(username) : null;
        const completed = userData?.activities?.some((item) => item.id === workshop.id);
        workspace.innerHTML = `
            <div class="guide-header">
                <div>
                    <div class="event-date">${escapeHtml(workshop.proficiency)} • ${escapeHtml(workshop.time)}</div>
                    <h3>${escapeHtml(workshop.title)}</h3>
                    <p>${escapeHtml(workshop.summary)}</p>
                </div>
                <div class="chips">
                    <span class="pill">+${workshop.xp} XP</span>
                    <span class="pill">${escapeHtml(workshop.skill)}</span>
                </div>
            </div>

            <div class="note-box">
                <strong>Workshop note:</strong> ${escapeHtml(workshop.notes)}
            </div>

            <div class="divider"></div>
            <div class="section-label">STEP-BY-STEP LESSON</div>
            <div class="guide-steps">
                ${workshop.steps.map(([title, text]) => `
                    <div class="guide-step">
                        <h4>${escapeHtml(title)}</h4>
                        <p>${escapeHtml(text)}</p>
                    </div>
                `).join("")}
            </div>

            <div class="grid grid-2" style="margin-top: 18px;">
                <div class="notice info">
                    <strong>Practice task</strong><br>
                    ${escapeHtml(workshop.exercise)}
                </div>
                <div class="notice">
                    <strong>Self-check</strong><br>
                    ${escapeHtml(workshop.check)}
                </div>
            </div>

            <div class="completion-panel">
                <div>
                    <strong>Completed the lesson and practice task?</strong>
                    <p class="mini">Record it once to add ${workshop.xp} XP and increase ${escapeHtml(workshop.skill)}.</p>
                </div>
                <button class="btn btn-primary" id="completeWorkshop" type="button" ${completed ? "disabled" : ""}>
                    ${completed ? "Completed ✓" : "Mark Workshop Complete"}
                </button>
            </div>
            <div class="track-status" id="workshopStatus"></div>
        `;
        document.getElementById("completeWorkshop")?.addEventListener("click", () => completeWorkshop(workshop));
    }
    function completeWorkshop(workshop) {
        const username = window.AIClub.getCurrentUser();
        const status = document.getElementById("workshopStatus");
        if (!username) {
            if (status) {
                status.className = "track-status error";
                status.textContent = "Login through Profile before recording a workshop.";
            }
            return;
        }
        const added = window.AIClub.addActivity(username, {
            id: workshop.id,
            type: "Workshop",
            title: workshop.title,
            date: new Date().toISOString(),
            detail: `Completed the guided ${workshop.title} lesson and practice task.`,
            proficiency: workshop.proficiency,
            skill: workshop.skill,
            skillGain: workshop.skillGain,
            xp: workshop.xp
        });
        if (added) {
            renderWorkshop(workshop);
            const updatedStatus = document.getElementById("workshopStatus");
            if (updatedStatus) {
                updatedStatus.className = "track-status success";
                updatedStatus.textContent = `Workshop saved to @${username}. +${workshop.xp} XP awarded.`;
            }
        }
        else if (status) {
            status.textContent = "This workshop is already recorded in your profile.";
        }
    }
    function selectWorkshop(workshopId) {
        const workshop = workshops[workshopId];
        if (!workshop) {
            return;
        }
        buttons.forEach((button) => {
            button.classList.toggle("active", button.dataset.workshopId === workshopId);
        });
        renderWorkshop(workshop);
    }
    buttons.forEach((button) => {
        button.addEventListener("click", () => selectWorkshop(button.dataset.workshopId));
    });
    const username = window.AIClub.getCurrentUser();
    if (saveTarget) {
        saveTarget.textContent = username
            ? `Workshop completions will be saved to @${username}.`
            : "Login through Profile to save workshop completions and XP.";
    }
    selectWorkshop("prompt-foundations");
})();
