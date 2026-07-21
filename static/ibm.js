document.addEventListener("DOMContentLoaded", () => {

    const form = document.querySelector("form");
    const textarea = document.getElementById("news");
    const submitButton = document.querySelector("button[type='submit']");

    loadDashboard();

    // Restore Draft
    const savedDraft = localStorage.getItem("draftNews");
    if(savedDraft){
        textarea.value = savedDraft;
    }

    updateCounts();

    textarea.addEventListener("input", () => {

        localStorage.setItem("draftNews", textarea.value);

        updateCounts();

        let chars = textarea.value.length;

        if(chars > 0){
            textarea.style.border = "2px solid #3B82F6";
        }else{
            textarea.style.border = "none";
        }

        if(chars > 500){
            textarea.style.border = "2px solid #F59E0B";
        }

        if(chars > 1000){
            textarea.style.border = "2px solid #EF4444";
        }
    });

    form.addEventListener("submit", (event) => {

        const newsText = textarea.value.trim();

        if(newsText.length < 20){

            showMessage(
                "Please enter at least 20 characters of news content.",
                "warning"
            );

            event.preventDefault();
            return;
        }

        submitButton.innerHTML =
            "⏳ Analyzing News...";

        submitButton.disabled = true;

        submitButton.style.opacity = "0.8";
    });

    function updateCounts(){

        let text = textarea.value;

        let words = text.trim() === ""
            ? 0
            : text.trim().split(/\s+/).length;

        let chars = text.length;

        document.getElementById("wordCount").innerText = words;
        document.getElementById("charCount").innerText = chars;

        const readingTime =
            Math.max(1, Math.ceil(words / 200));

        const readingElement =
            document.getElementById("readingTime");

        if(readingElement){
            readingElement.innerText =
                readingTime + " min";
        }
    }

});

function updateDashboard(result){

    let total =
        Number(localStorage.getItem("total")) || 0;

    let fake =
        Number(localStorage.getItem("fake")) || 0;

    let real =
        Number(localStorage.getItem("real")) || 0;

    total++;

    if(result.includes("Fake")){
        fake++;
    }
    else if(result.includes("Real")){
        real++;
    }

    localStorage.setItem("total", total);
    localStorage.setItem("fake", fake);
    localStorage.setItem("real", real);

    saveHistory(result);

    loadDashboard();
}

function loadDashboard(){

    const totalPredictions =
        document.getElementById("totalPredictions");

    const fakeCount =
        document.getElementById("fakeCount");

    const realCount =
        document.getElementById("realCount");

    if(totalPredictions)
        totalPredictions.innerText =
            localStorage.getItem("total") || 0;

    if(fakeCount)
        fakeCount.innerText =
            localStorage.getItem("fake") || 0;

    if(realCount)
        realCount.innerText =
            localStorage.getItem("real") || 0;

    loadHistory();
}

function saveHistory(result){

    let history =
        JSON.parse(
            localStorage.getItem("predictionHistory")
        ) || [];

    history.unshift({
        result: result,
        time: new Date().toLocaleString()
    });

    history = history.slice(0, 10);

    localStorage.setItem(
        "predictionHistory",
        JSON.stringify(history)
    );
}

function loadHistory(){

    const historyList =
        document.getElementById("historyList");

    if(!historyList) return;

    let history =
        JSON.parse(
            localStorage.getItem("predictionHistory")
        ) || [];

    historyList.innerHTML = "";

    history.forEach(item => {

        const li =
            document.createElement("li");

        li.innerHTML =
            `<strong>${item.result}</strong><br>
             <small>${item.time}</small>`;

        historyList.appendChild(li);
    });
}

function showMessage(message,type){

    const old =
        document.querySelector(".custom-alert");

    if(old){
        old.remove();
    }

    const div =
        document.createElement("div");

    div.className =
        "custom-alert";

    div.innerText = message;

    div.style.position = "fixed";
    div.style.top = "20px";
    div.style.right = "20px";
    div.style.padding = "15px 20px";
    div.style.borderRadius = "10px";
    div.style.zIndex = "9999";
    div.style.fontWeight = "bold";

    if(type === "warning"){
        div.style.background = "#F59E0B";
        div.style.color = "#111827";
    }

    document.body.appendChild(div);

    setTimeout(() => {
        div.remove();
    }, 3000);
}
const newsInput = document.getElementById("news");
const wordCount = document.getElementById("wordCount");
const readingTime = document.getElementById("readingTime");

newsInput.addEventListener("input", () => {

    let text = newsInput.value.trim();

    let words = text === "" ? 0 : text.split(/\s+/).length;

    wordCount.textContent = words;

    let minutes = Math.ceil(words / 200);

    readingTime.textContent = minutes + " min";
});