import flask
import pickle

app = flask.Flask(__name__)

model = pickle.load(open("model.pkl", "rb"))
vectorizer = pickle.load(open("vectorizer.pkl", "rb"))

@app.route("/")
def home():
    return flask.render_template("ibm_index.html")

@app.route("/predict", methods=["POST"])
def predict():

    news = flask.request.form["news"]

    news_vector = vectorizer.transform([news])

    prediction = model.predict(news_vector)

    if prediction[0] == 0:
        result = "Fake News"
    else:
        result = "Real News"

    return render_template(
    "ibm_index.html", 

     prediction_text=result,
     news_text=news
    )

    

if __name__ == "__main__":
    app.run(debug=True)