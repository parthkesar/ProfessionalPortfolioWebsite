const form = document.getElementById("contact-form");

form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const formData = new FormData(form);

    const data = {
        name: formData.get("name"),
        number: formData.get("number"),
        email: formData.get("email"),
        message: formData.get("message")
    };

    try {
        const response = await fetch("https://professionalportfoliowebsitebackend.onrender.com/api/contact", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();

        if (result.success) {
            // Disable the submit button
            const submitBtn = form.querySelector("button[type='submit']");
            submitBtn.disabled = true;
            
            // Show thank you message and hide form inputs (keep layout intact)
            const thankYouDiv = document.getElementById("thankyoumessage");
            const formInputs = form.querySelectorAll("label, input, textarea, button");
            
            thankYouDiv.style.display = "flex";
            formInputs.forEach(input => {
                input.style.visibility = "hidden";
                input.style.pointerEvents = "none";
            });
            
            // Reset form after a delay
            setTimeout(() => {
                form.reset();
                thankYouDiv.style.display = "none";
                formInputs.forEach(input => {
                    input.style.visibility = "visible";
                    input.style.pointerEvents = "auto";
                });
                submitBtn.disabled = false;
            }, 5000);
        } else {
            alert(result.message);
        }

    } catch (error) {
        console.error("Error:", error);
        alert("Unable to send message.");
        const submitBtn = form.querySelector("button[type='submit']");
        submitBtn.disabled = false;
        
        // Restore visibility if there was an error
        const formInputs = form.querySelectorAll("label, input, textarea, button");
        formInputs.forEach(input => {
            input.style.visibility = "visible";
            input.style.pointerEvents = "auto";
        });
    }
});