"""AIS guided project: TF-IDF resource retrieval baseline."""

from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

resources = [
    {"title": "Prompt Basics", "text": "prompt goals constraints examples output format"},
    {"title": "ML Evaluation", "text": "train validation test metrics baseline confusion matrix"},
    {"title": "RAG Foundations", "text": "retrieval chunks grounding sources question answering"},
]

vectorizer = TfidfVectorizer()
matrix = vectorizer.fit_transform([item["text"] for item in resources])

query = "how do I evaluate a classifier"
query_vector = vectorizer.transform([query])
scores = cosine_similarity(query_vector, matrix)[0]

ranked = sorted(zip(resources, scores), key=lambda pair: pair[1], reverse=True)

for resource, score in ranked:
    print(resource["title"], round(float(score), 3))
