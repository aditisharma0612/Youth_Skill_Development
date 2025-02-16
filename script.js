document.addEventListener("DOMContentLoaded", function () {
    console.log("✅ script.js is running!"); // Debugging message

    const loginForm = document.getElementById("loginForm");

    if (!loginForm) {
        console.error("❌ loginForm not found!");
        return;
    }

    loginForm.addEventListener("submit", async function (event) {
        event.preventDefault(); // Stop page from reloading

        console.log("✅ Login button clicked!"); // Debugging message

        const email = document.getElementById("user-email").value.trim();
        const password = document.getElementById("user-password").value.trim();

        try {
            const response = await fetch("http://localhost:5000/api/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                alert("✅ Login successful! Redirecting...");
                localStorage.setItem("user", JSON.stringify(data.user)); // Save user data
                window.location.href = "start-your-journey.html"; // Redirect to dashboard
            } else {
                alert("❌ Login failed: " + data.message);
            }
        } catch (error) {
            alert("❌ Error connecting to the server.");
            console.error("Error:", error);
        }
    });
});
