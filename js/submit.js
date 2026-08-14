const form = document.getElementById("contact-form");

if (form) {
    form.addEventListener("submit", async (event) => {
        event.preventDefault();

        const formData = new FormData(form);
        const submitBtn = form.querySelector("button[type='submit']");

        const data = {
            name: formData.get("name"),
            number: formData.get("number"),
            email: formData.get("email"),
            message: formData.get("message")
        };

        try {
            // Disable button to prevent double submission
            submitBtn.disabled = true;
            submitBtn.textContent = "Sending...";

            const response = await fetch("https://professionalportfoliowebsitebackend.onrender.com/api/contact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data),
                timeout: 10000
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();

            if (result.success) {
                // Show thank you message and hide form inputs
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
                    submitBtn.textContent = "Send Message";
                }, 5000);
            } else {
                throw new Error(result.message || "Failed to send message");
            }

        } catch (error) {
            console.error("Form submission error:", error);
            
            // Show user-friendly error message
            const errorMsg = error.message.includes("HTTP") 
                ? "Server error. Please try again later." 
                : "Unable to send message. Please check your connection and try again.";
            
            alert(errorMsg);
            
            // Restore button state
            submitBtn.disabled = false;
            submitBtn.textContent = "Send Message";
            
            // Ensure form is visible
            const formInputs = form.querySelectorAll("label, input, textarea, button");
            formInputs.forEach(input => {
                input.style.visibility = "visible";
                input.style.pointerEvents = "auto";
            });
        }
    });
} else {
    console.error("Contact form not found");
}