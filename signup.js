document.getElementById("signupForm").addEventListener("submit", function(event) {
    event.preventDefault();

    let newUsername = document.getElementById("newUsername").value.trim();
    let newPassword = document.getElementById("newPassword").value.trim();
    let signupError = document.getElementById("signupError");

    if (newUsername === "" || newPassword === "") {
        signupError.textContent = "Please enter a username and password.";
        return;
    }

    let storedCustomers = JSON.parse(localStorage.getItem("customers")) || {};

    if (storedCustomers[newUsername]) {
        signupError.textContent = "Username already exists. Choose a different one.";
        return;
    }

    storedCustomers[newUsername] = newPassword;
    localStorage.setItem("customers", JSON.stringify(storedCustomers));

    alert("Sign-up successful! You can now log in.");
    window.location.href = "./index.html";
});
