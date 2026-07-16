import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score
import pickle

fake_news = pd.read_csv("Fake.csv")
real_news = pd.read_csv("True.csv")
fake_news["label"] = 0
real_news["label"] = 1
news_data = pd.concat([fake_news, real_news])

news_data = news_data.sample(frac=1, random_state=42).reset_index(drop=True)
X = news_data["text"]
y = news_data["label"]


X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.3, random_state=35
)
vectorizer = TfidfVectorizer(stop_words="english", max_df=0.4)

X_train_tfidf = vectorizer.fit_transform(X_train)
X_test_tfidf = vectorizer.transform(X_test)

model = LogisticRegression(max_iter=1000)
model.fit(X_train_tfidf, y_train)
y_pred = model.predict(X_test_tfidf)

accuracy = accuracy_score(y_test, y_pred)
print("Accuracy:", accuracy)

with open("model.pkl", "wb") as model_file:
    pickle.dump(model, model_file)

with open("vectorizer.pkl", "wb") as vectorizer_file:
    pickle.dump(vectorizer, vectorizer_file)

print("Model Saved Successfully")
from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score

X = news_data["text"]
y = news_data["label"]

X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.3, random_state=42
)

vectorizer = TfidfVectorizer(
    stop_words="english",
    max_features=3000
)

X_train = vectorizer.fit_transform(X_train)
X_test = vectorizer.transform(X_test)

model = LogisticRegression(max_iter=200)

model.fit(X_train, y_train)

y_pred = model.predict(X_test)

accuracy = accuracy_score(y_test, y_pred)

print("\nAccuracy:", accuracy)