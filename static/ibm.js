document.addEventListener("DOMContentLoaded", () => {

    const form = document.querySelector("form");
    const textarea = document.getElementById("news");
    const submitButton = document.querySelector("button[type='submit']");

    // Dashboard Load
    loadDashboard();

    // Word Count + Character Count
    textarea.addEventListener("input", () => {

        let text = textarea.value;

        let words = text.trim() === ""
            ? 0
            : text.trim().split(/\s+/).length;

        let chars = text.length;

        document.getElementById("wordCount").innerText = words;
        document.getElementById("charCount").innerText = chars;

        if(chars > 0){
            textarea.style.border = "2px solid #F97316";
        }else{
            textarea.style.border = "none";
        }
    });

    // Form Validation
    form.addEventListener("submit", (event) => {

        const newsText = textarea.value.trim();

        if(newsText.length < 20){
            alert("Please enter at least 20 characters of news content.");
            event.preventDefault();
            return;
        }

        submitButton.innerText = "Analyzing...";
        submitButton.disabled = true;
    });

});

function updateDashboard(result){

    let total = Number(localStorage.getItem("total")) || 0;
    let fake = Number(localStorage.getItem("fake")) || 0;
    let real = Number(localStorage.getItem("real")) || 0;

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
}