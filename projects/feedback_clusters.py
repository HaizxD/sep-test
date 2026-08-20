"""AIS guided project: Feedback Theme Clustering."""

from sklearn.cluster import KMeans
from sklearn.feature_extraction.text import TfidfVectorizer

comments = [
    "more beginner coding examples would help",
    "the Python section moved too quickly",
    "I liked the hands on project activity",
    "more project time would be useful",
    "the room was difficult to hear in",
    "audio quality during the talk was unclear",
]

vectorizer = TfidfVectorizer(stop_words="english")
X = vectorizer.fit_transform(comments)

model = KMeans(n_clusters=3, random_state=42, n_init="auto")
labels = model.fit_predict(X)

for cluster_id in range(3):
    print(f"\nCluster {cluster_id}")
    for comment, label in zip(comments, labels):
        if label == cluster_id:
            print("-", comment)
