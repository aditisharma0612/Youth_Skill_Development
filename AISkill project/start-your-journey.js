document.addEventListener("DOMContentLoaded", function () {
    console.log("✅ start-your-journey.js loaded!");

    const username = localStorage.getItem("username");
    console.log("📌 Stored Username:", username);

    if (!username || username === "null") {
        console.warn("⚠️ No username found, setting default to 'Guest'");
        localStorage.setItem("username", "Guest");
    }

    const welcomeMessage = document.getElementById("welcome-message");
    if (welcomeMessage) {
        welcomeMessage.textContent = `Welcome, ${username || "Guest"}!`;
    } else {
        console.error("❌ 'welcome-message' element not found!");
    }
});


