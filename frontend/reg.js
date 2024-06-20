document.getElementById("registrationForm").addEventListener("submit", function(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const userData = {
        username: formData.get("username"),
        email: formData.get("email"),
        password: formData.get("password")
    };

    fetch("http://localhost:8000/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userData)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        if (data.message) {
            document.getElementById("message").innerText = data.message;
        } else {
            document.getElementById("message").innerText = "Registration failed. Please try again.";
        }
    })
    .catch(error => {
        console.error("Error:", error);
        document.getElementById("message").innerText = "An error occurred. Please try again.";
    });
});
