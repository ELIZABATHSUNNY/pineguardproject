document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const loginData = {
        username: formData.get("username"),
        password: formData.get("password")
    };
    
    fetch("http://localhost:8000/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(loginData)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        console.log("Response data:", data);
        if (data.redirect) {
            // Redirect to the specified URL
            window.location.href = data.redirect;
        } else {
            // Display a success message
            document.getElementById("message").innerText = "Login successful";
        }
    })
    .catch(error => {
        console.error("Error:", error);
        document.getElementById("message").innerText = "An error occurred. Please try again.";
    });
});
