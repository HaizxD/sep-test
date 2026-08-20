(function () {
    const searchInput = document.getElementById("resourceSearch");
    const categorySelect = document.getElementById("resourceFilter");
    const items = Array.from(document.querySelectorAll(".resource-item"));
    const emptyMessage = document.getElementById("resourceEmpty");

    if (searchInput && categorySelect && items.length) {
        function applyFilters() {
            const query = searchInput.value.trim().toLowerCase();
            const category = categorySelect.value;
            let visibleCount = 0;

            items.forEach((item) => {
                const searchText = `${item.dataset.search || ""} ${item.textContent}`.toLowerCase();
                const categories = (item.dataset.category || "").split(/\s+/);
                const matchesQuery = !query || searchText.includes(query);
                const matchesCategory = category === "all" || categories.includes(category);
                const visible = matchesQuery && matchesCategory;
                item.hidden = !visible;
                if (visible) {
                    visibleCount += 1;
                }
            });

            if (emptyMessage) {
                emptyMessage.style.display = visibleCount ? "none" : "block";
            }
        }

        searchInput.addEventListener("input", applyFilters);
        categorySelect.addEventListener("change", applyFilters);
    }

    const statusElement = document.getElementById("apiProjectStatus");
    const gridElement = document.getElementById("apiProjectGrid");
    const refreshButton = document.getElementById("refreshApiProjects");
    const projectSearchInput = document.getElementById("apiProjectSearch");
    const projectSortSelect = document.getElementById("apiProjectSort");
    const projectSearchButton = document.getElementById("searchApiProjects");
    const randomButton = document.getElementById("randomApiProjects");
    const suggestionsElement = document.getElementById("apiSearchSuggestions");

    if (!statusElement || !gridElement || !refreshButton || !projectSearchInput || !projectSortSelect || !projectSearchButton || !randomButton || !suggestionsElement) {
        return;
    }

    if (!window.jQuery) {
        statusElement.className = "notice error api-project-status reveal visible";
        statusElement.textContent = "Live projects are temporarily unavailable. Please refresh the page and try again.";
        refreshButton.disabled = true;
        projectSearchButton.disabled = true;
        randomButton.disabled = true;
        return;
    }

    const $ = window.jQuery;
    const $status = $(statusElement);
    const $grid = $(gridElement);
    const $refresh = $(refreshButton);
    const $projectSearch = $(projectSearchInput);
    const $projectSort = $(projectSortSelect);
    const $projectSearchButton = $(projectSearchButton);
    const $randomButton = $(randomButton);
    const $suggestions = $(suggestionsElement);
    let activeRequest = null;
    let currentTopic = "";
    let currentSort = "stars";
    let randomizeCurrentResults = false;

    const topicSuggestions = [
        { term: "large language model", aliases: ["large", "llm", "language model"] },
        { term: "generative ai", aliases: ["gen ai", "generative", "generation"] },
        { term: "computer vision", aliases: ["vision", "image recognition", "object detection"] },
        { term: "natural language processing", aliases: ["nlp", "language processing", "text ai"] },
        { term: "machine learning", aliases: ["ml", "machine", "predictive model"] },
        { term: "deep learning", aliases: ["deep", "neural network", "neural nets"] },
        { term: "reinforcement learning", aliases: ["reinforcement", "rl", "reward learning"] },
        { term: "retrieval augmented generation", aliases: ["rag", "retrieval", "grounded generation"] },
        { term: "ai agents", aliases: ["agent", "agentic ai", "autonomous agent"] },
        { term: "multimodal ai", aliases: ["multimodal", "vision language", "vlm"] },
        { term: "robotics", aliases: ["robot", "robotics ai", "autonomous robot"] },
        { term: "recommendation systems", aliases: ["recommendation", "recommender", "personalization"] },
        { term: "speech recognition", aliases: ["speech", "voice ai", "automatic speech recognition"] },
        { term: "federated learning", aliases: ["federated", "privacy learning", "distributed learning"] },
        { term: "time series forecasting", aliases: ["forecast", "forecasting", "time series"] },
        { term: "anomaly detection", aliases: ["anomaly", "fraud detection", "outlier detection"] },
        { term: "transformers", aliases: ["transformer", "attention model", "attention"] },
        { term: "prompt engineering", aliases: ["prompt", "prompting", "prompt design"] },
        { term: "data science", aliases: ["data", "analytics", "data analysis"] },
        { term: "ai safety", aliases: ["safety", "responsible ai", "ai alignment"] }
    ];

    function formatNumber(value) {
        const number = Number(value);
        return Number.isFinite(number) ? new Intl.NumberFormat("en-US").format(number) : "0";
    }

    function setStatus(message, type) {
        $status.removeClass("info success error").addClass(type).text(message).show();
    }

    function formatTopic(topic) {
        return topic.replace(/\b\w/g, function (letter) {
            return letter.toUpperCase();
        });
    }

    function shuffle(values) {
        const result = values.slice();
        for (let i = result.length - 1; i > 0; i -= 1) {
            const j = Math.floor(Math.random() * (i + 1));
            const temp = result[i];
            result[i] = result[j];
            result[j] = temp;
        }
        return result;
    }

    function limitDescription(value, maxLength) {
        const text = String(value || "").replace(/\s+/g, " ").trim();
        if (!text) {
            return "No repository description is available.";
        }
        if (text.length <= maxLength) {
            return text;
        }
        return `${text.slice(0, maxLength).trimEnd()}…`;
    }

    function createProjectCard(repository) {
        const repositoryUrl = typeof repository.html_url === "string" ? repository.html_url : "https://github.com/";
        const repositoryName = repository.name || "Untitled repository";
        const ownerName = repository.owner && repository.owner.login ? repository.owner.login : "GitHub";
        const fullDescription = repository.description || "No repository description is available.";
        const description = limitDescription(fullDescription, 220);
        const language = repository.language || "Language not specified";
        const stars = formatNumber(repository.stargazers_count);
        const forks = formatNumber(repository.forks_count);

        const $card = $("<article>", { class: "card api-project-card" });
        const $mini = $("<div>", { class: "mini" }).text(`${ownerName} · LIVE GITHUB PROJECT`);
        const $title = $("<h3>");
        const $titleLink = $("<a>", {
            href: repositoryUrl,
            target: "_blank",
            rel: "noopener noreferrer"
        }).text(repositoryName);
        const $description = $("<p>", {
            class: "api-project-description",
            title: fullDescription
        }).text(description);
        const $meta = $("<div>", { class: "api-project-meta" });
        const $stars = $("<span>", { class: "pill" }).text(`★ ${stars} stars`);
        const $forks = $("<span>", { class: "pill" }).text(`${forks} forks`);
        const $language = $("<span>", { class: "pill" }).text(language);
        const $actions = $("<div>", { class: "resource-actions" });
        const $link = $("<a>", {
            class: "btn btn-secondary",
            href: repositoryUrl,
            target: "_blank",
            rel: "noopener noreferrer"
        }).text("View Repository ↗");

        $title.append($titleLink);
        $meta.append($stars, $forks, $language);
        $actions.append($link);
        $card.append($mini, $title, $description, $meta, $actions);
        return $card;
    }

    function setControlsBusy(isBusy) {
        $refresh.prop("disabled", isBusy);
        $projectSearchButton.prop("disabled", isBusy);
        $randomButton.prop("disabled", isBusy);
        $projectSearch.prop("disabled", isBusy);
        $projectSort.prop("disabled", isBusy);
        if (isBusy) {
            $refresh.attr("aria-busy", "true");
        } else {
            $refresh.removeAttr("aria-busy");
        }
    }

    function getSortLabel(sort) {
        if (sort === "forks") {
            return "most forked";
        }
        if (sort === "updated") {
            return "recently updated";
        }
        return "highest starred";
    }

    function loadProjects(topic, sort, randomizeResults) {
        const cleanTopic = String(topic || "").trim();
        if (!cleanTopic) {
            setStatus("Enter an AI topic or use Random Topic to discover something new.", "info");
            $projectSearch.trigger("focus");
            return;
        }

        if (activeRequest && activeRequest.readyState !== 4) {
            activeRequest.abort();
        }

        currentTopic = cleanTopic;
        currentSort = sort || "stars";
        randomizeCurrentResults = Boolean(randomizeResults);
        $projectSearch.val(cleanTopic);
        $projectSort.val(currentSort);
        $grid.empty();
        setControlsBusy(true);
        hideSuggestions();

        const topicLabel = formatTopic(cleanTopic);
        if (randomizeCurrentResults) {
            setStatus(`Finding highly starred ${topicLabel} projects and choosing a random set...`, "info");
        } else {
            setStatus(`Searching GitHub for ${topicLabel} projects...`, "info");
        }

        activeRequest = $.ajax({
            url: "https://api.github.com/search/repositories",
            method: "GET",
            dataType: "json",
            timeout: 12000,
            headers: {
                Accept: "application/vnd.github+json"
            },
            data: {
                q: cleanTopic,
                sort: currentSort,
                order: "desc",
                per_page: randomizeCurrentResults ? 30 : 12
            }
        })
            .done(function (data) {
                const repositories = data && Array.isArray(data.items) ? data.items : [];

                if (!repositories.length) {
                    setStatus(`No GitHub repositories matched “${cleanTopic}”. Try a broader topic or choose a suggestion.`, "info");
                    return;
                }

                const displayRepositories = randomizeCurrentResults ? shuffle(repositories).slice(0, 6) : repositories.slice(0, 6);
                displayRepositories.forEach(function (repository) {
                    $grid.append(createProjectCard(repository));
                });

                if (randomizeCurrentResults) {
                    setStatus(`Showing ${displayRepositories.length} randomly selected projects from the top highly starred results for ${topicLabel}.`, "success");
                } else {
                    setStatus(`Showing ${displayRepositories.length} ${getSortLabel(currentSort)} GitHub projects for ${topicLabel}.`, "success");
                }
            })
            .fail(function (xhr, textStatus) {
                if (textStatus === "abort") {
                    return;
                }

                if (xhr && xhr.status === 403) {
                    setStatus("The GitHub API rate limit has been reached. Wait briefly and try again.", "error");
                    return;
                }

                setStatus("Unable to load GitHub projects. Check the internet connection and try again.", "error");
            })
            .always(function () {
                setControlsBusy(false);
            });
    }

    function chooseRandomTopic() {
        let availableTopics = topicSuggestions;
        if (topicSuggestions.length > 1 && currentTopic) {
            availableTopics = topicSuggestions.filter(function (item) {
                return item.term !== currentTopic.toLowerCase();
            });
        }
        const choice = availableTopics[Math.floor(Math.random() * availableTopics.length)];
        $projectSort.val("stars");
        loadProjects(choice.term, "stars", true);
    }

    function matchingSuggestions(query) {
        const normalized = query.trim().toLowerCase();
        if (normalized.length < 2) {
            return [];
        }
        return topicSuggestions.filter(function (item) {
            const searchable = [item.term].concat(item.aliases).join(" ").toLowerCase();
            return searchable.includes(normalized);
        }).slice(0, 6);
    }

    function hideSuggestions() {
        $suggestions.empty().prop("hidden", true);
        $projectSearch.attr("aria-expanded", "false");
    }

    function showSuggestions(query) {
        const matches = matchingSuggestions(query);
        if (!matches.length) {
            hideSuggestions();
            return;
        }

        $suggestions.empty();
        matches.forEach(function (item) {
            const $option = $("<button>", {
                class: "api-search-suggestion",
                type: "button",
                role: "option"
            });
            const $term = $("<span>", { class: "api-search-suggestion-term" }).text(item.term);
            const $hint = $("<span>", { class: "api-search-suggestion-hint" }).text(item.aliases.slice(0, 2).join(" · "));
            $option.append($term, $hint);
            $option.on("mousedown", function (event) {
                event.preventDefault();
            });
            $option.on("click", function () {
                $projectSearch.val(item.term);
                hideSuggestions();
                $projectSearch.trigger("focus");
            });
            $suggestions.append($option);
        });

        $suggestions.prop("hidden", false);
        $projectSearch.attr("aria-expanded", "true");
    }

    $projectSearch.on("input", function () {
        showSuggestions(this.value);
    });

    $projectSearch.on("focus", function () {
        showSuggestions(this.value);
    });

    $projectSearch.on("keydown", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            loadProjects(this.value, $projectSort.val(), false);
        }
        if (event.key === "Escape") {
            hideSuggestions();
        }
    });

    $(document).on("click", function (event) {
        if (!$(event.target).closest(".api-search-shell").length) {
            hideSuggestions();
        }
    });

    $projectSearchButton.on("click", function () {
        loadProjects($projectSearch.val(), $projectSort.val(), false);
    });

    $projectSort.on("change", function () {
        if (currentTopic) {
            loadProjects(currentTopic, this.value, false);
        }
    });

    $randomButton.on("click", chooseRandomTopic);

    $refresh.on("click", function () {
        if (currentTopic) {
            loadProjects(currentTopic, currentSort, randomizeCurrentResults);
        } else {
            chooseRandomTopic();
        }
    });

    chooseRandomTopic();
})();
