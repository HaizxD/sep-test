"""AIS guided project: Study Note Topic Classifier.

The inline dataset is intentionally tiny and should be expanded before treating
its evaluation results as meaningful.
"""

from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import classification_report
from sklearn.model_selection import train_test_split
from sklearn.pipeline import Pipeline

texts = [
    "transformers use attention for language modelling",
    "training data is separated from test data",
    "SQL joins combine rows from related tables",
    "a primary key uniquely identifies a record",
    "CSS grid creates two dimensional layouts",
    "JavaScript handles browser interactions",
    "embeddings represent meaning as vectors",
    "database indexes can speed up lookup",
    "responsive design adapts to screen size",
]
labels = ["AI", "AI", "Database", "Database", "Web", "Web", "AI", "Database", "Web"]

X_train, X_test, y_train, y_test = train_test_split(
    texts,
    labels,
    test_size=0.33,
    random_state=7,
    stratify=labels,
)

model = Pipeline(
    [
        ("tfidf", TfidfVectorizer(ngram_range=(1, 2))),
        ("classifier", LogisticRegression(max_iter=500)),
    ]
)

model.fit(X_train, y_train)
predictions = model.predict(X_test)
print(classification_report(y_test, predictions, zero_division=0))
