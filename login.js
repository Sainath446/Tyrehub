document.addEventListener("DOMContentLoaded", function () {
    let isLoggedIn = localStorage.getItem("isLoggedIn");
    let userType = localStorage.getItem("userType");

    // ✅ Prevent auto-redirect if user is on login page
    if (isLoggedIn === "true" && userType && !window.location.pathname.includes("index.html")) {
        window.location.href = userType === "admin" ? "./admin/dashboard.html" : "./customer_dashboard.html";
    }

    // Load saved username if available
    let savedUsername = localStorage.getItem("savedUsername");
    if (savedUsername) {
        document.getElementById("username").value = savedUsername;
    }

    // Show/Hide Password Toggle
    const togglePassword = document.getElementById("togglePassword");
    const passwordField = document.getElementById("password");

    if (togglePassword && passwordField) {
        togglePassword.addEventListener("click", function () {
            passwordField.type = passwordField.type === "password" ? "text" : "password";
            this.classList.toggle("visible");
        });
    }

    // Handle Login Form Submission
    document.getElementById("loginForm").addEventListener("submit", function (event) {
        event.preventDefault(); // Prevent form submission

        let username = document.getElementById("username").value.trim();
        let password = document.getElementById("password").value.trim();
        let stayLoggedIn = document.getElementById("stayLoggedIn").checked;
        let errorMessage = document.getElementById("errorMessage");

        // Validate inputs
        if (!username || !password) {
            errorMessage.textContent = "Please fill in both fields.";
            return;
        }

        // Admin Login
        if (username === "admin" && password === "admin123") {
            alert("Admin login successful!");
            setLoginData(username, "admin", stayLoggedIn);
            window.location.href = "./admin/Dashboard.html"; // Corrected path
            return;
        }

        // Check if customers exist in localStorage
        let storedCustomers = JSON.parse(localStorage.getItem("customers")) || {};
        if (typeof storedCustomers !== "object") storedCustomers = {}; // Ensure object format

        if (storedCustomers[username] && storedCustomers[username] === password) {
            alert("Customer login successful!");
            setLoginData(username, "customer", stayLoggedIn);
            window.location.href = "./customer_dashboard.html";
            return;
        }

        // No match found
        errorMessage.textContent = "Invalid username or password.";
    });

    // Save login data
    function setLoginData(username, userType, stayLoggedIn) {
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("userType", userType);
        localStorage.setItem("currentUser", username);

        if (stayLoggedIn) {
            localStorage.setItem("savedUsername", username);
        } else {
            localStorage.removeItem("savedUsername");
        }
    }
});
