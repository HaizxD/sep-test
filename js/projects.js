(function () {
    var projects = {
        "iris-classifier": {
            id: "iris-classifier",
            title: "Iris Flower Classifier",
            proficiency: "Beginner",
            xp: 20,
            skill: "Machine Learning",
            skillGain: 3,
            time: "45–60 min",
            starter: "projects/iris_classifier.py",
            objective: "Train a classifier that predicts an Iris flower species from four numeric measurements using scikit-learn's built-in Iris dataset.",
            prerequisites: ["Basic Python syntax", "A Python environment or Google Colab", "scikit-learn installed"],
            notes: "The Iris dataset is intentionally small and clean. Use it to learn the workflow rather than to demonstrate production-level performance.",
            steps: [
                ["Load the dataset", "Use load_iris() and inspect the feature names, target labels and array shapes."],
                ["Create a train/test split", "Keep a portion of the data unseen during training using train_test_split with stratification."],
                ["Build a baseline model", "Train a simple LogisticRegression classifier before trying more complex models."],
                ["Evaluate", "Calculate accuracy and inspect a confusion matrix on the held-out test set."],
                ["Inspect mistakes", "Print misclassified examples and look for measurements that overlap between species."],
                ["Iterate", "Try a decision tree or k-nearest-neighbours model and compare results on the same split."]
            ],
            code: "from sklearn.datasets import load_iris\nfrom sklearn.model_selection import train_test_split\nfrom sklearn.linear_model import LogisticRegression\nfrom sklearn.metrics import accuracy_score, confusion_matrix\n\niris = load_iris()\nX_train, X_test, y_train, y_test = train_test_split(\n    iris.data,\n    iris.target,\n    test_size=0.25,\n    random_state=42,\n    stratify=iris.target\n)\n\nmodel = LogisticRegression(max_iter=500)\nmodel.fit(X_train, y_train)\n\npredictions = model.predict(X_test)\nprint(\"Accuracy:\", accuracy_score(y_test, predictions))\nprint(\"Confusion matrix:\\n\", confusion_matrix(y_test, predictions))",
            links: [
                ["scikit-learn Getting Started", "https://scikit-learn.org/stable/getting_started.html"],
                ["scikit-learn Example Gallery", "https://scikit-learn.org/stable/auto_examples/index.html"]
            ]
        },
        "note-classifier": {
            id: "note-classifier",
            title: "Study Note Topic Classifier",
            proficiency: "Intermediate",
            xp: 35,
            skill: "Machine Learning",
            skillGain: 5,
            time: "75–90 min",
            starter: "projects/study_note_classifier.py",
            objective: "Build a small text classifier that labels study notes as AI, databases or web development using TF-IDF features and logistic regression.",
            prerequisites: ["Python lists and functions", "Basic classification concepts", "scikit-learn installed"],
            notes: "The sample data below is only a toy dataset. Expand it with many more labelled examples before interpreting evaluation scores as meaningful.",
            steps: [
                ["Create labelled examples", "Write short study-note sentences and assign each one a topic label."],
                ["Split the text data", "Keep test examples separate so the classifier is evaluated on unseen sentences."],
                ["Convert text to features", "Use TfidfVectorizer to transform words and phrases into numeric features."],
                ["Train the classifier", "Fit LogisticRegression through a Pipeline so preprocessing and prediction stay together."],
                ["Review predictions", "Print the predicted label beside each test sentence and inspect errors manually."],
                ["Improve the dataset", "Add varied phrasing, remove duplicates and keep the topic labels balanced enough for useful practice."]
            ],
            code: "from sklearn.model_selection import train_test_split\nfrom sklearn.pipeline import Pipeline\nfrom sklearn.feature_extraction.text import TfidfVectorizer\nfrom sklearn.linear_model import LogisticRegression\nfrom sklearn.metrics import classification_report\n\ntexts = [\n    \"transformers use attention for language modelling\",\n    \"training data is separated from test data\",\n    \"SQL joins combine rows from related tables\",\n    \"a primary key uniquely identifies a record\",\n    \"CSS grid creates two dimensional layouts\",\n    \"JavaScript handles browser interactions\",\n    \"embeddings represent meaning as vectors\",\n    \"database indexes can speed up lookup\",\n    \"responsive design adapts to screen size\"\n]\nlabels = [\"AI\", \"AI\", \"Database\", \"Database\", \"Web\", \"Web\", \"AI\", \"Database\", \"Web\"]\n\nX_train, X_test, y_train, y_test = train_test_split(\n    texts, labels, test_size=0.33, random_state=7, stratify=labels\n)\n\nmodel = Pipeline([\n    (\"tfidf\", TfidfVectorizer(ngram_range=(1, 2))),\n    (\"classifier\", LogisticRegression(max_iter=500))\n])\n\nmodel.fit(X_train, y_train)\npredictions = model.predict(X_test)\nprint(classification_report(y_test, predictions, zero_division=0))",
            links: [
                ["scikit-learn Text Feature Extraction", "https://scikit-learn.org/stable/modules/feature_extraction.html#text-feature-extraction"],
                ["pandas Getting Started", "https://pandas.pydata.org/docs/getting_started/intro_tutorials/index.html"]
            ]
        },
        "resource-search": {
            id: "resource-search",
            title: "Semantic-Style Resource Search",
            proficiency: "Intermediate",
            xp: 35,
            skill: "LLM & RAG",
            skillGain: 5,
            time: "60–90 min",
            starter: "projects/resource_search.py",
            objective: "Build a lightweight retrieval prototype that ranks AIS learning resources by text similarity to a user's query.",
            prerequisites: ["Python dictionaries", "Basic vector similarity idea", "scikit-learn installed"],
            notes: "TF-IDF is lexical rather than a neural embedding model, so it is a useful transparent baseline before trying embedding-based semantic retrieval.",
            steps: [
                ["Create a resource collection", "Store a title and description for each learning resource."],
                ["Vectorize the descriptions", "Fit TfidfVectorizer on the descriptions and transform the user query with the same vocabulary."],
                ["Calculate similarity", "Use cosine_similarity between the query vector and every resource vector."],
                ["Rank results", "Sort resource indices by similarity score from highest to lowest."],
                ["Inspect weak queries", "Try synonyms or vague queries and note where lexical matching fails."],
                ["Plan the upgrade", "Replace TF-IDF with sentence embeddings later and compare both systems on the same test queries."]
            ],
            code: "from sklearn.feature_extraction.text import TfidfVectorizer\nfrom sklearn.metrics.pairwise import cosine_similarity\n\nresources = [\n    {\"title\": \"Prompt Basics\", \"text\": \"prompt goals constraints examples output format\"},\n    {\"title\": \"ML Evaluation\", \"text\": \"train validation test metrics baseline confusion matrix\"},\n    {\"title\": \"RAG Foundations\", \"text\": \"retrieval chunks grounding sources question answering\"}\n]\n\nvectorizer = TfidfVectorizer()\nmatrix = vectorizer.fit_transform([item[\"text\"] for item in resources])\n\nquery = \"how do I evaluate a classifier\"\nquery_vector = vectorizer.transform([query])\nscores = cosine_similarity(query_vector, matrix)[0]\n\nranked = sorted(\n    zip(resources, scores),\n    key=lambda pair: pair[1],\n    reverse=True\n)\n\nfor resource, score in ranked:\n    print(resource[\"title\"], round(float(score), 3))",
            links: [
                ["scikit-learn Text Features", "https://scikit-learn.org/stable/modules/feature_extraction.html#text-feature-extraction"],
                ["Google ML Crash Course", "https://developers.google.com/machine-learning/crash-course"]
            ]
        },
        "feedback-clusters": {
            id: "feedback-clusters",
            title: "Feedback Theme Clustering",
            proficiency: "Advanced",
            xp: 50,
            skill: "Innovation",
            skillGain: 7,
            time: "90–120 min",
            starter: "projects/feedback_clusters.py",
            objective: "Group short anonymized feedback comments into rough themes using text features and K-means, then evaluate the clusters manually.",
            prerequisites: ["Comfort with Python", "Basic unsupervised learning concepts", "Understanding that clusters require interpretation"],
            notes: "K-means always produces the requested number of clusters, even when the data does not contain meaningful groups. Manual inspection is essential.",
            steps: [
                ["Prepare anonymized comments", "Remove names, student IDs and unnecessary personal details before analysis."],
                ["Create TF-IDF features", "Convert comments into numeric vectors while removing common English stop words."],
                ["Choose a trial cluster count", "Start with a small value such as three and document that it is a modelling choice."],
                ["Fit K-means", "Train the clustering model and assign each comment a cluster label."],
                ["Inspect the groups", "Print comments by cluster and give each cluster a human-readable theme only if the grouping is coherent."],
                ["Evaluate limitations", "Try different cluster counts and note unstable or mixed themes instead of forcing a confident interpretation."]
            ],
            code: "from sklearn.feature_extraction.text import TfidfVectorizer\nfrom sklearn.cluster import KMeans\n\ncomments = [\n    \"more beginner coding examples would help\",\n    \"the Python section moved too quickly\",\n    \"I liked the hands on project activity\",\n    \"more project time would be useful\",\n    \"the room was difficult to hear in\",\n    \"audio quality during the talk was unclear\"\n]\n\nvectorizer = TfidfVectorizer(stop_words=\"english\")\nX = vectorizer.fit_transform(comments)\n\nmodel = KMeans(n_clusters=3, random_state=42, n_init=\"auto\")\nlabels = model.fit_predict(X)\n\nfor cluster_id in range(3):\n    print(f\"\\nCluster {cluster_id}\")\n    for comment, label in zip(comments, labels):\n        if label == cluster_id:\n            print(\"-\", comment)",
            links: [
                ["scikit-learn Clustering Guide", "https://scikit-learn.org/stable/modules/clustering.html"],
                ["scikit-learn Examples", "https://scikit-learn.org/stable/auto_examples/index.html"]
            ]
        }
    };
    var showcaseData = [
        {
            id: 'iris',
            level: 'beginner',
            category: 'CLASSIFICATION',
            title: 'IRIS FLOWER<br>CLASSIFICATION',
            desc: 'Learn supervised learning by classifying flowers into different species.',
            tags: ['Python', 'Scikit-learn', 'Pandas'],
            img: 'https://images.unsplash.com/photo-1497250681960-ef046c08a56e?auto=format&fit=crop&w=800&q=80',
            number: '01'
        },
        {
            id: 'note',
            level: 'intermediate',
            category: 'NLP',
            title: 'STUDY NOTE<br>CLASSIFIER',
            desc: 'Label study notes as AI, databases or web development using TF-IDF.',
            tags: ['Python', 'NLP', 'Scikit-learn'],
            img: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=800&q=80',
            number: '02'
        },
        {
            id: 'resource',
            level: 'intermediate',
            category: 'RETRIEVAL',
            title: 'SEMANTIC<br>RESOURCE SEARCH',
            desc: 'Rank learning resources by text similarity to a user query.',
            tags: ['Python', 'TF-IDF', 'Cosine Similarity'],
            img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
            number: '03'
        },
        {
            id: 'feedback',
            level: 'advanced',
            category: 'UNSUPERVISED ML',
            title: 'FEEDBACK THEME<br>CLUSTERING',
            desc: 'Group anonymized comments into themes using K-means.',
            tags: ['Python', 'K-means', 'TF-IDF'],
            img: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=800&q=80',
            number: '04'
        }
    ];
    var modalData = {
        iris: {
            icon: '🌸',
            title: 'Iris Flower Classification',
            description: 'Learn the fundamentals of supervised machine learning using the classic Iris dataset.',
            overview: 'A simple classification project where the model learns to identify different flower species from their measurements.',
            technologies: ['Python', 'Pandas', 'Scikit-learn', 'Classification'],
            learning: 'Dataset exploration, train-test splitting, classification algorithms, prediction and accuracy evaluation.'
        },
        note: {
            icon: '📝',
            title: 'Study Note Topic Classifier',
            description: 'Build a small text classifier that labels study notes as AI, databases or web development.',
            overview: 'Use TF-IDF features and logistic regression to classify short study-note sentences.',
            technologies: ['Python', 'NLP', 'Scikit-learn', 'TF-IDF'],
            learning: 'Text preprocessing, feature extraction, pipeline building, classification and evaluation.'
        },
        resource: {
            icon: '🔍',
            title: 'Semantic-Style Resource Search',
            description: 'Build a lightweight retrieval prototype that ranks AIS learning resources by text similarity.',
            overview: 'TF-IDF vectorization and cosine similarity for ranking resources.',
            technologies: ['Python', 'Scikit-learn', 'TF-IDF', 'Cosine Similarity'],
            learning: 'Vectorization, similarity metrics, ranking, and baseline retrieval systems.'
        },
        feedback: {
            icon: '📊',
            title: 'Feedback Theme Clustering',
            description: 'Group short anonymized feedback comments into rough themes using K-means clustering.',
            overview: 'Unsupervised learning to discover themes in text data, with manual cluster evaluation.',
            technologies: ['Python', 'Scikit-learn', 'K-means', 'TF-IDF'],
            learning: 'Unsupervised learning, clustering evaluation, text feature extraction, and interpretation.'
        }
    };
    function renderShowcase() {
        var grid = document.getElementById('showcaseGrid');
        if (!grid)
            return;
        grid.innerHTML = showcaseData.map(function (p) {
            return '<article class="project-card" data-level="' + p.level + '">' +
                '<img class="project-image" src="' + p.img + '" alt="' + p.title + '" loading="lazy" />' +
                '<div class="project-overlay"></div>' +
                '<div class="project-top">' +
                '<span class="project-number">' + p.number + '</span>' +
                '<span class="project-level ' + p.level + '">' + p.level.toUpperCase() + '</span>' +
                '</div>' +
                '<div class="project-content">' +
                '<span class="project-category">' + p.category + '</span>' +
                '<h3>' + p.title + '</h3>' +
                '<p>' + p.desc + '</p>' +
                '<div class="badges">' +
                p.tags.map(function (t) { return '<span class="badge">' + t + '</span>'; }).join('') +
                '</div>' +
                '<button class="details-btn" data-id="' + p.id + '">VIEW DETAILS <span>→</span></button>' +
                '</div>' +
                '</article>';
        }).join('');
    }
    function setupModal() {
        var overlay = document.getElementById('modalOverlay');
        var closeBtn = document.getElementById('modalCloseBtn');
        function openModal(id) {
            var data = modalData[id];
            if (!data)
                return;
            document.getElementById('modalIcon').textContent = data.icon;
            document.getElementById('modalTitle').textContent = data.title;
            document.getElementById('modalDesc').textContent = data.description;
            document.getElementById('modalOverview').textContent = data.overview;
            document.getElementById('modalLearning').textContent = data.learning;
            document.getElementById('modalTechs').innerHTML = data.technologies.map(function (t) {
                return '<span class="modal-tech">' + t + '</span>';
            }).join('');
            overlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
        function closeModal() {
            overlay.classList.remove('active');
            document.body.style.overflow = '';
        }
        document.addEventListener('click', function (e) {
            var btn = e.target.closest('.details-btn');
            if (btn) {
                e.preventDefault();
                var id = btn.dataset.id;
                if (id && modalData[id])
                    openModal(id);
            }
        });
        closeBtn.addEventListener('click', closeModal);
        overlay.addEventListener('click', function (e) {
            if (e.target === overlay)
                closeModal();
        });
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && overlay.classList.contains('active'))
                closeModal();
        });
    }
    function setupWorkspace() {
        var workspace = document.getElementById("projectWorkspace");
        var buttons = document.querySelectorAll("[data-project-id]");
        var saveTarget = document.getElementById("projectSaveTarget");
        if (!workspace || !buttons.length)
            return;
        function escapeHtml(v) {
            return String(v || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#039;');
        }
        function renderList(items) {
            return items.map(function (i) { return '<li>' + escapeHtml(i) + '</li>'; }).join('');
        }
        function renderProject(project) {
            var username = window.AIClub ? window.AIClub.getCurrentUser() : null;
            var userData = username && window.AIClub ? window.AIClub.getUserData(username) : null;
            var completed = userData && userData.projects ? userData.projects.some(function (p) { return p.id === project.id; }) : false;
            workspace.innerHTML =
                '<div class="guide-header">' +
                    '<div>' +
                    '<div class="event-date">' + escapeHtml(project.proficiency) + ' • ' + escapeHtml(project.time) + '</div>' +
                    '<h3>' + escapeHtml(project.title) + '</h3>' +
                    '<p>' + escapeHtml(project.objective) + '</p>' +
                    '</div>' +
                    '<div class="chips">' +
                    '<span class="pill">+' + project.xp + ' XP</span>' +
                    '<span class="pill">' + escapeHtml(project.skill) + '</span>' +
                    '</div>' +
                    '</div>' +
                    '<div class="grid grid-2">' +
                    '<div>' +
                    '<div class="mini">PREREQUISITES</div>' +
                    '<ul style="margin:10px 0 0 20px;color:var(--muted);">' + renderList(project.prerequisites) + '</ul>' +
                    '</div>' +
                    '<div class="note-box" style="margin-top:0;"><strong>Project note:</strong> ' + escapeHtml(project.notes) + '</div>' +
                    '</div>' +
                    '<div class="divider"></div>' +
                    '<div class="section-label">STEP-BY-STEP GUIDE</div>' +
                    '<div class="guide-steps">' + project.steps.map(function (s) {
                    return '<div class="guide-step"><h4>' + escapeHtml(s[0]) + '</h4><p>' + escapeHtml(s[1]) + '</p></div>';
                }).join('') + '</div>' +
                    '<div class="divider"></div>' +
                    '<div class="section-label">STARTER CODE</div>' +
                    '<pre class="code-block"><code>' + escapeHtml(project.code) + '</code></pre>' +
                    '<div class="learning-links">' +
                    '<a class="btn btn-primary" href="' + escapeHtml(project.starter) + '" download>Download Starter .py ↓</a>' +
                    project.links.map(function (l) {
                        return '<a class="btn btn-secondary" href="' + escapeHtml(l[1]) + '" target="_blank" rel="noopener noreferrer">' + escapeHtml(l[0]) + ' ↗</a>';
                    }).join('') +
                    '</div>' +
                    '<div class="completion-panel">' +
                    '<div><strong>Finished the project?</strong><p class="mini">Record it once to add ' + project.xp + ' XP and increase ' + escapeHtml(project.skill) + ' skill progress.</p></div>' +
                    '<button class="btn btn-primary" id="completeProject" type="button" ' + (completed ? 'disabled' : '') + '>' + (completed ? 'Completed ✓' : 'Mark Project Complete') + '</button>' +
                    '</div>' +
                    '<div class="track-status" id="projectStatus"></div>';
            var completeBtn = document.getElementById("completeProject");
            if (completeBtn) {
                completeBtn.addEventListener("click", function () { completeProject(project); });
            }
        }
        function completeProject(project) {
            if (!window.AIClub) {
                var status = document.getElementById("projectStatus");
                if (status) {
                    status.className = 'track-status error';
                    status.textContent = 'AIClub is not available. Please make sure js/main.js is loaded.';
                }
                return;
            }
            var username = window.AIClub.getCurrentUser();
            var status = document.getElementById("projectStatus");
            if (!username) {
                if (status) {
                    status.className = 'track-status error';
                    status.textContent = 'Login through Profile before recording a project.';
                }
                return;
            }
            var added = window.AIClub.completeProject(username, {
                id: project.id,
                title: project.title,
                proficiency: project.proficiency,
                xp: project.xp,
                skill: project.skill,
                skillGain: project.skillGain,
                detail: 'Completed the guided ' + project.title + ' project.'
            });
            if (added) {
                renderProject(project);
                var s = document.getElementById("projectStatus");
                if (s) {
                    s.className = 'track-status success';
                    s.textContent = 'Project saved to @' + username + '. +' + project.xp + ' XP awarded.';
                }
            }
            else if (status) {
                status.textContent = 'This project is already recorded in your profile.';
            }
        }
        function selectProject(id) {
            var p = projects[id];
            if (!p)
                return;
            buttons.forEach(function (b) {
                b.classList.toggle('active', b.dataset.projectId === id);
            });
            renderProject(p);
        }
        buttons.forEach(function (b) {
            b.addEventListener('click', function () { selectProject(b.dataset.projectId); });
        });
        var username = window.AIClub ? window.AIClub.getCurrentUser() : null;
        if (saveTarget) {
            saveTarget.textContent = username ? 'Project completion will be saved to @' + username + '.' : 'Login through Profile to record project completion and XP.';
        }
        selectProject('iris-classifier');
    }
    function setupTheme() {
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
            else if (stored === 'dark') {
                document.body.classList.remove('light-mode');
            }
            else {
                document.body.classList.remove('light-mode');
                localStorage.setItem('aiClubTheme', 'dark');
            }
            syncButton();
        }
        function toggleTheme() {
            document.body.classList.toggle('light-mode');
            var isLight = document.body.classList.contains('light-mode');
            localStorage.setItem('aiClubTheme', isLight ? 'light' : 'dark');
            syncButton();
        }
        var observer = new MutationObserver(function () {
            syncButton();
        });
        observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });
        loadTheme();
        toggle.addEventListener('click', toggleTheme);
        console.log('[Theme] Theme toggle initialized. Current:', document.body.classList.contains('light-mode') ? 'light' : 'dark');
    }
    document.addEventListener('DOMContentLoaded', function () {
        renderShowcase();
        setupModal();
        setupWorkspace();
        setupTheme();
    });
})();
