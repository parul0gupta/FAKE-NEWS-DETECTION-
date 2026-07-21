from flask import Flask, render_template, request
import pickle

app = Flask(__name__)

# Load Model and Vectorizer
model = pickle.load(open("model.pkl", "rb"))
vectorizer = pickle.load(open("vectorizer.pkl", "rb"))

@app.route("/")
def home():
    return render_template("ibm_index.html")

@app.route("/predict", methods=["POST"])
def predict():

    news = request.form["news"]

    # Convert text to TF-IDF
    news_vector = vectorizer.transform([news])

    # Prediction
    prediction = model.predict(news_vector)

    print("Prediction Value:", prediction[0])

    # Confidence Score
    try:
        confidence = max(model.predict_proba(news_vector)[0]) * 100
    except:
        confidence = 0

    print("Confidence:", confidence)

    # Result
    if prediction[0] == 0:
        result = "🚨 Fake News"
        result_class = "fake-result"
    else:
        result = "✅ Real News"
        result_class = "real-result"

    return render_template(
        "ibm_index.html",
        prediction_text=result,
        confidence=round(confidence, 2),
        result_class=result_class
    )

if __name__ == "__main__":
    app.run(debug=True)