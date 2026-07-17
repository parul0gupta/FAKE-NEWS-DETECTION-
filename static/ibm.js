document.addEventListener("DOMContentLoaded", () => {

    const form = document.querySelector("form");
    const textarea = document.querySelector("#news");
    const submitButton = document.querySelector("button[type='submit']");

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

    textarea.addEventListener("input", () => {

        const count = textarea.value.length;

        if(count > 0){
            textarea.style.border = "2px solid #F97316";
        }else{
            textarea.style.border = "none";
        }

    });

});