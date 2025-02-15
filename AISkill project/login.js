document.addEventListener('DOMContentLoaded', function () {
  console.log("✅ login.js is running!");

  const loginForm = document.querySelector('form');
  const userEmail = document.getElementById('user-email');
  const userPassword = document.getElementById('user-password');

  loginForm.addEventListener('submit', async function (event) {
      event.preventDefault(); // Prevent default form submission

      const emailValue = userEmail.value.trim();
      const passwordValue = userPassword.value.trim();

      // Basic validation
      if (!emailValue || !passwordValue) {
          alert("❌ Please fill in all fields.");
          return;
      }

      try {
          // ✅ Send login request to backend
          const response = await fetch("http://127.0.0.1:5000/api/login", {

          
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ email: emailValue, password: passwordValue }),
          });

          const data = await response.json();

          if (response.ok) {
              alert("✅ Login Successful!");

              // ✅ Save user's name in localStorage

              
              localStorage.setItem("username", data.user.name);
              console.log("Login Response Data:", data); // Debugging
              if (data.user && data.user.name) {
              localStorage.setItem("username", data.user.name);
              console.log("✅ Username saved:", data.user.name);
            } else {
             console.error("❌ No username found in response!");
}


              // ✅ Redirect to startyourjourney.html instead of dashboard.html
              window.location.href = "start-your-journey.html";
          } else {
              alert("❌ Login Failed: " + data.message);
          }
      } catch (error) {
          console.error("❌ Error:", error);
          alert("❌ Error connecting to the server.");
      }
  });
});
