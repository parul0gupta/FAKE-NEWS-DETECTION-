from flask import Flask, render_template, request
import pickle

# Flask application
app = Flask(__name__)

# Load trained model and vectorizer
with open("model.pkl", "rb") as model_file:
    model = pickle.load(model_file)

with open("vectorizer.pkl", "rb") as vectorizer_file:
    vectorizer = pickle.load(vectorizer_file)


@app.route("/")
def home():
    return render_template("ibm_index.html")


@app.route("/predict", methods=["POST"])
def predict():

    # Get news text from form
    news = request.form["news"]

    # Convert text into numerical format
    transformed_news = vectorizer.transform([news])

    # Predict result
    prediction = model.predict(transformed_news)

    # Check prediction value
    if prediction[0] == 0:
        result = "Fake News"
    else:
        result = "Real News"

    # Return result and keep news text in textarea
    return render_template(
        "ibm_index.html",
        prediction_text=result,
        news_text=news
    )


if __name__ == "__main__":
    app.run(debug=True)