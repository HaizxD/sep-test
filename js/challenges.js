(function () {
    const questionBank = [
        {
            id: "prompt-precision",
            title: "Prompt Precision",
            level: "Beginner",
            question: "Which prompt change is most likely to make an LLM response easier to evaluate?",
            options: [
                {
                    text: "Add a clear output format and acceptance criteria",
                    correct: true,
                    feedback: "Explicit format and acceptance criteria make the output more testable and consistent."
                },
                {
                    text: "Make the prompt longer without changing the instructions",
                    correct: false,
                    feedback: "Length alone does not make the expected output or evaluation criteria clearer."
                },
                {
                    text: "Remove all constraints",
                    correct: false,
                    feedback: "Removing constraints usually makes outputs less controlled and harder to compare."
                },
                {
                    text: "Ask only for maximum creativity",
                    correct: false,
                    feedback: "A creativity-only instruction does not provide measurable acceptance criteria."
                }
            ],
            explanation: "A prompt is easier to evaluate when it states what the output should look like and what conditions a successful answer must satisfy."
        },
        {
            id: "train-test",
            title: "Train / Test Split",
            level: "Beginner",
            question: "What is the main purpose of keeping a test set separate from training data?",
            options: [
                {
                    text: "To measure performance on unseen data",
                    correct: true,
                    feedback: "A held-out test set estimates performance on examples the model did not train on."
                },
                {
                    text: "To make the model train faster",
                    correct: false,
                    feedback: "Separating a test set is primarily about evaluation, not training speed."
                },
                {
                    text: "To increase the number of labels",
                    correct: false,
                    feedback: "A test split does not create additional labels."
                },
                {
                    text: "To remove the need for validation",
                    correct: false,
                    feedback: "A separate test set does not eliminate the role of validation during model development."
                }
            ],
            explanation: "The test set is kept separate so final performance can be estimated on data that did not influence training."
        },
        {
            id: "hallucination-guard",
            title: "Hallucination Guard",
            level: "Intermediate",
            question: "For a club FAQ chatbot, which design best reduces unsupported answers?",
            options: [
                {
                    text: "Use retrieval from approved club documents and require citations",
                    correct: true,
                    feedback: "Grounding answers in approved documents gives the model relevant evidence and makes claims easier to verify."
                },
                {
                    text: "Increase the model temperature",
                    correct: false,
                    feedback: "Higher temperature generally increases sampling randomness rather than grounding answers in evidence."
                },
                {
                    text: "Remove the system instructions",
                    correct: false,
                    feedback: "Removing instructions does not provide reliable source grounding."
                },
                {
                    text: "Always request very long answers",
                    correct: false,
                    feedback: "Longer responses can still contain unsupported claims if they are not grounded in reliable sources."
                }
            ],
            explanation: "Retrieval-augmented generation can supply approved source material before generation, helping reduce unsupported answers."
        },
        {
            id: "embedding-match",
            title: "Embedding Match",
            level: "Intermediate",
            question: "What are embeddings commonly used for in semantic search?",
            options: [
                {
                    text: "Representing items as vectors so similar meaning can be compared",
                    correct: true,
                    feedback: "Embeddings encode semantic information numerically so similarity can be measured."
                },
                {
                    text: "Encrypting passwords",
                    correct: false,
                    feedback: "Embeddings are not a password-encryption mechanism."
                },
                {
                    text: "Rendering CSS animations",
                    correct: false,
                    feedback: "CSS animation rendering is unrelated to semantic vector representations."
                },
                {
                    text: "Compressing video files",
                    correct: false,
                    feedback: "Video compression uses codecs rather than semantic embeddings for search."
                }
            ],
            explanation: "Semantic-search systems often compare vector embeddings to find items that are close in meaning."
        },
        {
            id: "evaluation-design",
            title: "Evaluation Design",
            level: "Advanced",
            question: "You changed an AI assistant prompt. What is the strongest way to compare the new version with the old one?",
            options: [
                {
                    text: "Evaluate both on the same representative test set using defined metrics",
                    correct: true,
                    feedback: "Using the same cases and metrics creates a controlled comparison between prompt versions."
                },
                {
                    text: "Try one example and choose the answer you prefer",
                    correct: false,
                    feedback: "One example is too narrow to support a reliable comparison."
                },
                {
                    text: "Compare the prompt length only",
                    correct: false,
                    feedback: "Prompt length alone does not measure answer quality or reliability."
                },
                {
                    text: "Use different questions for each version",
                    correct: false,
                    feedback: "Different test cases make it harder to attribute performance differences to the prompt change."
                }
            ],
            explanation: "A controlled evaluation keeps test cases and scoring criteria consistent so the prompt change is the main variable."
        },
        {
            id: "data-leakage",
            title: "Data Leakage",
            level: "Advanced",
            question: "Which situation is an example of data leakage?",
            options: [
                {
                    text: "Information from the test set influences model training or feature creation",
                    correct: true,
                    feedback: "Test information should remain unavailable during training and feature design."
                },
                {
                    text: "The model is trained for multiple epochs",
                    correct: false,
                    feedback: "Multiple training epochs are not automatically data leakage."
                },
                {
                    text: "The training dataset is shuffled before training",
                    correct: false,
                    feedback: "Shuffling training examples does not by itself expose test information."
                },
                {
                    text: "The interface displays a progress bar",
                    correct: false,
                    feedback: "A user-interface progress bar is unrelated to information leakage between datasets."
                }
            ],
            explanation: "Data leakage occurs when information that should be unavailable at training or model-selection time influences the model."
        },
        {
            id: "rag-pipeline",
            title: "RAG Pipeline",
            level: "Intermediate",
            question: "In a basic retrieval-augmented generation pipeline, what typically happens before generation?",
            options: [
                {
                    text: "Relevant source chunks are retrieved for the query",
                    correct: true,
                    feedback: "The retrieval stage finds relevant context before the generator produces an answer."
                },
                {
                    text: "The browser clears localStorage",
                    correct: false,
                    feedback: "Browser storage is unrelated to the core retrieval step in a RAG pipeline."
                },
                {
                    text: "The model is converted into CSS",
                    correct: false,
                    feedback: "CSS is a presentation technology and is not part of the RAG generation pipeline."
                },
                {
                    text: "The user password is embedded in the prompt",
                    correct: false,
                    feedback: "Passwords should not be inserted into prompts, and doing so is not the retrieval step."
                }
            ],
            explanation: "RAG retrieves relevant context first and then provides that context to the generator."
        },
        {
            id: "classification-metric",
            title: "Classification Metric",
            level: "Intermediate",
            question: "For a highly imbalanced binary classifier, which metric pair often gives more insight than accuracy alone?",
            options: [
                {
                    text: "Precision and recall",
                    correct: true,
                    feedback: "Precision and recall separately expose false-positive and false-negative behavior."
                },
                {
                    text: "File size and latency",
                    correct: false,
                    feedback: "File size and latency measure system properties, not classification error trade-offs."
                },
                {
                    text: "Epoch and batch size",
                    correct: false,
                    feedback: "Epoch count and batch size are training settings rather than classification evaluation metrics."
                },
                {
                    text: "HTML and CSS coverage",
                    correct: false,
                    feedback: "HTML and CSS coverage are unrelated to classifier performance."
                }
            ],
            explanation: "On imbalanced data, accuracy can hide poor minority-class behavior, while precision and recall expose different types of classification errors."
        },
        {
            id: "temperature",
            title: "Generation Control",
            level: "Beginner",
            question: "What does temperature mainly influence in common LLM text-generation settings?",
            options: [
                {
                    text: "The randomness of token selection",
                    correct: true,
                    feedback: "Temperature changes the sampling distribution used when choosing the next token."
                },
                {
                    text: "The amount of training data",
                    correct: false,
                    feedback: "Temperature is an inference-time generation setting and does not change how much training data the model had."
                },
                {
                    text: "The number of CSS files",
                    correct: false,
                    feedback: "CSS files are unrelated to language-model token sampling."
                },
                {
                    text: "The user's network bandwidth",
                    correct: false,
                    feedback: "Network bandwidth does not determine token sampling randomness."
                }
            ],
            explanation: "Temperature adjusts how peaked or spread out the token-sampling distribution is during generation."
        },
        {
            id: "validation-set",
            title: "Validation Logic",
            level: "Intermediate",
            question: "Why is a validation set useful during model development?",
            options: [
                {
                    text: "It helps tune choices without using the final test set",
                    correct: true,
                    feedback: "Validation data supports model and hyperparameter selection while preserving the test set for final evaluation."
                },
                {
                    text: "It guarantees perfect real-world performance",
                    correct: false,
                    feedback: "Validation cannot guarantee perfect performance outside the evaluated data."
                },
                {
                    text: "It replaces all training data",
                    correct: false,
                    feedback: "Validation data complements rather than replaces the training set."
                },
                {
                    text: "It removes the need to define metrics",
                    correct: false,
                    feedback: "A validation set still requires meaningful evaluation metrics."
                }
            ],
            explanation: "Validation data supports development decisions without repeatedly consulting the final test set."
        },
        {
            id: "responsible-evaluation",
            title: "Responsible Evaluation",
            level: "Advanced",
            question: "What is the main goal of responsible AI evaluation before deployment?",
            options: [
                {
                    text: "Check performance, limitations and relevant risks in the intended context",
                    correct: true,
                    feedback: "Responsible evaluation considers capability together with limitations and risks that matter for the intended use."
                },
                {
                    text: "Maximize output length for every user",
                    correct: false,
                    feedback: "Output length is not a substitute for evaluating performance and risk."
                },
                {
                    text: "Remove all human review from the process",
                    correct: false,
                    feedback: "Responsible deployment may require human oversight rather than automatically removing it."
                },
                {
                    text: "Evaluate only the visual appearance of the interface",
                    correct: false,
                    feedback: "Interface appearance does not capture model performance, limitations or relevant risks."
                }
            ],
            explanation: "Responsible evaluation examines whether the system works as intended and what limitations or risks remain in its expected context of use."
        },
        {
            id: "few-shot",
            title: "Few-Shot Prompting",
            level: "Intermediate",
            question: "What is a few-shot prompt?",
            options: [
                {
                    text: "A prompt that includes a small number of examples demonstrating the desired task",
                    correct: true,
                    feedback: "Few-shot prompting gives the model a small set of input-output or behavior examples before the new task."
                },
                {
                    text: "A prompt that contains no task instructions",
                    correct: false,
                    feedback: "Few-shot prompting is defined by including examples, not by removing instructions."
                },
                {
                    text: "A prompt used only to train a model from scratch",
                    correct: false,
                    feedback: "Few-shot prompting is commonly used at inference time and does not mean training a model from scratch."
                },
                {
                    text: "A prompt that must contain exactly five words",
                    correct: false,
                    feedback: "The term few-shot refers to example count, not a fixed number of words."
                }
            ],
            explanation: "Few-shot prompting supplies a small number of demonstrations so the model can infer the desired pattern or format."
        }
    ];
    const questionElement = document.getElementById("question");
    const optionsElement = document.getElementById("options");
    const metaElement = document.getElementById("challengeMeta");
    const feedbackElement = document.getElementById("feedback");
    const nextButton = document.getElementById("nextQuestion");
    const progressBar = document.getElementById("testProgress");
    const newTestButton = document.getElementById("newTest");
    const historyElement = document.getElementById("history");
    const saveTargetElement = document.getElementById("saveTarget");
    if (!questionElement || !optionsElement || !nextButton) {
        return;
    }
    let test = [];
    let currentIndex = 0;
    let score = 0;
    let answered = false;
    let completed = false;
    let reviewAnswers = [];
    function randomIndex(max) {
        if (window.crypto?.getRandomValues) {
            const values = new Uint32Array(1);
            window.crypto.getRandomValues(values);
            return values[0] % max;
        }
        return Math.floor(Math.random() * max);
    }
    function shuffle(items) {
        const copy = [...items];
        for (let index = copy.length - 1; index > 0; index -= 1) {
            const swapIndex = randomIndex(index + 1);
            [copy[index], copy[swapIndex]] = [copy[swapIndex], copy[index]];
        }
        return copy;
    }
    function createTestQuestion(item) {
        return {
            ...item,
            options: shuffle(item.options.map((option) => ({ ...option })))
        };
    }
    function newTest() {
        test = shuffle(questionBank).slice(0, 5).map(createTestQuestion);
        currentIndex = 0;
        score = 0;
        answered = false;
        completed = false;
        reviewAnswers = [];
        nextButton.textContent = "Next Question";
        renderQuestion();
    }
    function renderQuestion() {
        const item = test[currentIndex];
        if (!item) {
            finishTest();
            return;
        }
        metaElement.textContent = `Question ${currentIndex + 1} of ${test.length} • ${item.level} • ${item.title}`;
        questionElement.textContent = item.question;
        optionsElement.innerHTML = "";
        feedbackElement.textContent = "";
        feedbackElement.className = "notice";
        nextButton.style.display = "none";
        answered = false;
        progressBar.style.width = `${(currentIndex / test.length) * 100}%`;
        item.options.forEach((option, optionIndex) => {
            const button = document.createElement("button");
            const label = String.fromCharCode(65 + optionIndex);
            button.className = "challenge-option";
            button.type = "button";
            button.textContent = `${label}. ${option.text}`;
            button.addEventListener("click", () => chooseAnswer(optionIndex, button));
            optionsElement.appendChild(button);
        });
    }
    function chooseAnswer(optionIndex, selectedButton) {
        if (answered) {
            return;
        }
        answered = true;
        const item = test[currentIndex];
        const selectedOption = item.options[optionIndex];
        const correctOption = item.options.find((option) => option.correct);
        const optionButtons = optionsElement.querySelectorAll(".challenge-option");
        optionButtons.forEach((button, index) => {
            button.disabled = true;
            if (item.options[index].correct) {
                button.classList.add("correct-option");
            }
        });
        if (selectedOption.correct) {
            score += 1;
            feedbackElement.className = "notice success";
            feedbackElement.textContent = `Correct. ${item.explanation}`;
        }
        else {
            selectedButton.classList.add("wrong-option");
            feedbackElement.className = "notice error";
            feedbackElement.textContent = `${selectedOption.feedback} ${item.explanation}`;
        }
        reviewAnswers.push({
            questionId: item.id,
            title: item.title,
            level: item.level,
            question: item.question,
            selectedText: selectedOption.text,
            correctText: correctOption.text,
            correct: selectedOption.correct,
            selectedFeedback: selectedOption.feedback,
            explanation: item.explanation,
            xp: xpForAnswer(item.level, selectedOption.correct)
        });
        nextButton.style.display = "inline-flex";
        progressBar.style.width = `${((currentIndex + 1) / test.length) * 100}%`;
    }
    function xpForAnswer(level, correct) {
        if (!correct) {
            return 1;
        }
        const normalized = String(level || "").toLowerCase();
        if (normalized.includes("advanced")) {
            return 10;
        }
        if (normalized.includes("intermediate")) {
            return 7;
        }
        return 4;
    }
    function createAttemptId() {
        if (window.crypto?.randomUUID) {
            return window.crypto.randomUUID();
        }
        return `attempt-${Date.now()}-${Math.floor(Math.random() * 100000)}`;
    }
    function readGuestHistory() {
        try {
            return JSON.parse(localStorage.getItem("aiChallengeGuestHistoryV2") || "[]");
        }
        catch (error) {
            return [];
        }
    }
    function saveAttempt(attempt) {
        const currentUser = window.AIClub?.getCurrentUser() || "";
        if (currentUser && window.AIClub) {
            window.AIClub.addChallengeAttempt(currentUser, attempt);
            return;
        }
        const history = readGuestHistory();
        history.unshift(attempt);
        localStorage.setItem("aiChallengeGuestHistoryV2", JSON.stringify(history.slice(0, 20)));
    }
    function getHistory() {
        const currentUser = window.AIClub?.getCurrentUser() || "";
        if (currentUser && window.AIClub) {
            return window.AIClub.getUserData(currentUser).challenges;
        }
        return readGuestHistory();
    }
    function renderReviewQuestions(answers) {
        return answers
            .map((answer, index) => {
            const answerClass = answer.correct ? "answer-good" : "answer-bad";
            const answerStatus = answer.correct ? "Correct" : "Needs review";
            return `
                    <div class="review-question">
                        <h4>${index + 1}. ${escapeHtml(answer.question)}</h4>
                        <p class="${answerClass}">${answerStatus}: ${escapeHtml(answer.selectedText)}</p>
                        ${answer.correct
                ? ""
                : `<p><strong>Correct answer:</strong> ${escapeHtml(answer.correctText)}</p>`}
                        <p><strong>Explanation:</strong> ${escapeHtml(answer.explanation)}</p>
                    </div>
                `;
        })
            .join("");
    }
    function renderHistory() {
        if (!historyElement) {
            return;
        }
        const history = getHistory();
        const currentUser = window.AIClub?.getCurrentUser() || "";
        if (saveTargetElement) {
            saveTargetElement.textContent = currentUser
                ? `Practice attempts are being saved to @${currentUser}.`
                : "You are practicing as a guest. Login before a new test to attach future attempts to a member profile.";
        }
        if (!history.length) {
            historyElement.innerHTML = '<p class="mini">No completed tests yet.</p>';
            return;
        }
        historyElement.innerHTML = history
            .slice(0, 5)
            .map((attempt) => {
            const date = new Date(attempt.date).toLocaleString();
            const percentage = attempt.total ? Math.round((attempt.score / attempt.total) * 100) : 0;
            return `
                    <div class="history-item">
                        <div class="history-item-top">
                            <div>
                                <div class="mini">${escapeHtml(attempt.label || "Random practice test")}</div>
                                <strong>${escapeHtml(date)}</strong>
                            </div>
                            <div class="history-score">
                                ${attempt.score}/${attempt.total} · ${percentage}%
                                ${attempt.xpEarned ? `<span class="mini">+${attempt.xpEarned} XP</span>` : ""}
                            </div>
                        </div>
                        <details class="review-accordion">
                            <summary>Review questions and explanations</summary>
                            <div class="review-content">
                                ${renderReviewQuestions(attempt.answers || [])}
                            </div>
                        </details>
                    </div>
                `;
        })
            .join("");
    }
    function finishTest() {
        if (completed) {
            return;
        }
        completed = true;
        const potentialXp = reviewAnswers.reduce((sum, answer) => sum + Number(answer.xp || 0), 0);
        const currentUser = window.AIClub?.getCurrentUser() || "";
        const xpEarned = currentUser ? potentialXp : 0;
        const attempt = {
            id: createAttemptId(),
            score,
            total: test.length,
            date: new Date().toISOString(),
            label: "Random 5-question practice test",
            xpEarned,
            answers: reviewAnswers
        };
        saveAttempt(attempt);
        questionElement.innerHTML = `<span class="result-badge">${score}/${test.length}</span><br>Challenge complete`;
        metaElement.textContent = "Random practice test completed";
        optionsElement.innerHTML = "";
        feedbackElement.className = "notice info";
        const xpMessage = currentUser ? ` +${xpEarned} XP was added to your profile.` : " Login before a future test to earn profile XP.";
        feedbackElement.textContent = score >= 4
            ? `Result saved. Review every question below, then generate another randomized test when ready.${xpMessage}`
            : `Result saved. Review the explanations below before trying another randomized test.${xpMessage}`;
        nextButton.textContent = "New Random Test";
        nextButton.style.display = "inline-flex";
        progressBar.style.width = "100%";
        renderHistory();
    }
    function goNext() {
        if (completed) {
            newTest();
            return;
        }
        currentIndex += 1;
        renderQuestion();
    }
    function escapeHtml(value) {
        return String(value ?? "")
            .replaceAll("&", "&amp;")
            .replaceAll("<", "&lt;")
            .replaceAll(">", "&gt;")
            .replaceAll('"', "&quot;")
            .replaceAll("'", "&#039;");
    }
    const faqAnswers = {
        random: "Every new test shuffles the question bank and selects five questions. A new test can therefore contain a different mix of topics and difficulty levels.",
        answers: "No. You can take the random test as a guest and review completed attempts on the Challenges page. Log in before starting a new test if you want the attempt linked to your member profile and want to earn XP.",
        history: "Your completed attempts stay available on this device. If you are signed in, they are linked to your member profile; guest attempts are kept separately.",
        review: "Yes. Completed attempts store the question, your selected answer, the correct answer and an explanation. You can expand previous attempts here or on the Profile page.",
        xp: "Logged-in members earn XP from practice. A correct Beginner question gives 4 XP, Intermediate gives 7 XP and Advanced gives 10 XP. An incorrect answer gives 1 practice XP."
    };
    function setupFaqAssistant() {
        const answerElement = document.getElementById("faqAnswer");
        const faqButtons = document.querySelectorAll("[data-faq]");
        const feedbackToggle = document.getElementById("feedbackToggle");
        const feedbackForm = document.getElementById("challengeFeedbackForm");
        const feedbackStatus = document.getElementById("feedbackFormStatus");
        faqButtons.forEach((button) => {
            button.addEventListener("click", () => {
                const answer = faqAnswers[button.dataset.faq];
                if (answerElement && answer) {
                    answerElement.textContent = answer;
                }
            });
        });
        feedbackToggle?.addEventListener("click", () => {
            feedbackForm?.classList.toggle("open");
            if (feedbackForm?.classList.contains("open")) {
                document.getElementById("feedbackText")?.focus();
            }
        });
        feedbackForm?.addEventListener("submit", (event) => {
            event.preventDefault();
            const category = document.getElementById("feedbackCategory")?.value || "Other";
            const text = document.getElementById("feedbackText")?.value.trim() || "";
            if (!text) {
                return;
            }
            let entries = [];
            try {
                entries = JSON.parse(localStorage.getItem("aisChallengeFeedback") || "[]");
            }
            catch (error) {
                entries = [];
            }
            entries.unshift({
                id: window.crypto?.randomUUID?.() || `feedback-${Date.now()}`,
                category,
                text,
                username: window.AIClub?.getCurrentUser() || "guest",
                date: new Date().toISOString()
            });
            localStorage.setItem("aisChallengeFeedback", JSON.stringify(entries.slice(0, 30)));
            feedbackForm.reset();
            if (feedbackStatus) {
                feedbackStatus.className = "form-message success";
                feedbackStatus.textContent = "Thanks for your feedback. It has been saved on this device.";
            }
        });
    }
    nextButton.addEventListener("click", goNext);
    newTestButton?.addEventListener("click", newTest);
    setupFaqAssistant();
    newTest();
    renderHistory();
})();
