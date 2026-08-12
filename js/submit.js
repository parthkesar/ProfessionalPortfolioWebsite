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
            alert("I recieved your message and I will connect you soon.\nThank You");
            form.reset();
        } else {
            alert(result.message);
        }

    } catch (error) {
        console.error("Error:", error);
        alert("Unable to send message.");
    }
});