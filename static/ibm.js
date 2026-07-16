document.addEventListener("DOMContentLoaded", () => {

    const form = document.querySelector("form");
    const textarea = document.querySelector("#news");

    form.addEventListener("submit", (event) => {

        const newsText = textarea.value.trim();

        if(newsText.length < 20){
            alert("Please enter a valid news article.");
            event.preventDefault();
            return;
        }

        const submitButton = document.querySelector("button[type='submit']");

        submitButton.innerText = "Analyzing...";
        submitButton.disabled = true;
    });

});