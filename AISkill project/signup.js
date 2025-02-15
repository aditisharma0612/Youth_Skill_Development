// document.addEventListener("DOMContentLoaded", function () {
//     console.log("✅ signup.js is running!"); // Debugging message

//     const signupForm = document.getElementById("signupForm");

//     if (!signupForm) {
//         console.error("❌ signupForm not found!");
//         return;
//     }

//     signupForm.addEventListener("submit", async function (event) {
//         event.preventDefault(); // Stop page from reloading

//         console.log("✅ Signup button clicked!"); // Debugging message

//         const nameInput = document.getElementById("signup-name");
//         const emailInput = document.getElementById("signup-email");
//         const passwordInput = document.getElementById("signup-password");
//         const confirmPasswordInput = document.getElementById("signup-confirm-password");
//         const skillsInput = document.getElementById("signup-skills");

//         if (!nameInput || !emailInput || !passwordInput || !confirmPasswordInput || !skillsInput) {
//             console.error("❌ One or more input fields were not found!");
//             return;
//         }

//         const name = nameInput.value.trim();
//         const email = emailInput.value.trim();
//         const password = passwordInput.value.trim();
//         const confirmPassword = confirmPasswordInput.value.trim();
//         const skills = skillsInput.value.trim().split(",");

//         if (password !== confirmPassword) {
//             alert("❌ Passwords do not match!");
//             return;
//         }

//         try {
//             const response = await fetch("http://localhost:5000/api/register", {
//                 method: "POST",
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify({ name, email, password, skills }),
//             });

//             const data = await response.json();

//             if (response.ok) {
//                 alert("✅ Signup successful! Redirecting...");
//                 signupForm.reset();
//                 window.location.href = "login.html";
//             } else {
//                 alert("❌ Signup failed: " + data.message);
//             }
//         } catch (error) {
//             alert("❌ Error connecting to the server.");
//             console.error("Error:", error);
//         }
//     });
// });


document.addEventListener("DOMContentLoaded", function () { 
    console.log("✅ signup.js is running!"); // Debugging message

    const signupForm = document.getElementById("signupForm");

    if (!signupForm) {
        console.error("❌ signupForm not found! Make sure the form ID in signup.html is correct.");
        return;
    }

    signupForm.addEventListener("submit", async function (event) {
        event.preventDefault(); // Stop page from reloading

        console.log("✅ Signup button clicked!"); // Debugging message

        // Fetching form inputs
        const nameInput = document.getElementById("signup-name");
        const emailInput = document.getElementById("signup-email");
        const passwordInput = document.getElementById("signup-password");
        const confirmPasswordInput = document.getElementById("signup-confirm-password");
       
        

        if (!nameInput || !emailInput || !passwordInput || !confirmPasswordInput) {
            console.error("❌ One or more input fields were not found!");
            alert("❌ Error: Some fields are missing. Please refresh and try again.");
            return;
        }

        // Getting input values
        const name = nameInput.value.trim();
        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();
        const confirmPassword = confirmPasswordInput.value.trim();
        
        
        // Debugging input values
        console.log("📌 Name:", name);
        console.log("📌 Email:", email);
        console.log("📌 Password:", password);
        console.log("📌 Confirm Password:", confirmPassword);
       
        
        // Form validation
        if (!name || name.length < 3) {
            alert("❌ Full name must be at least 3 characters long.");
            return;
        }

        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        if (!emailPattern.test(email)) {
            alert("❌ Please enter a valid email address.");
            return;
        }

        if (password.length < 6) {
            alert("❌ Password must be at least 6 characters long.");
            return;
        }

        if (password !== confirmPassword) {
            alert("❌ Passwords do not match!");
            return;
        }

        
       
        // ✅ Sending data to backend
        try {
            const response = await fetch("http://127.0.0.1:5000/api/register", {

            
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                alert("✅ Signup successful! Redirecting to login...");
                signupForm.reset();
                window.location.href = "login.html";
            } else {
                alert("❌ Signup failed: " + data.message);
            }
        } catch (error) {
            alert("❌ Error connecting to the server.");
            console.error("Error:", error);
        }
    });
});
