document.getElementById("forgotPasswordForm").addEventListener("submit", function(event) {
    event.preventDefault();

    let resetUsername = document.getElementById("resetUsername").value.trim();
    let newPassword = document.getElementById("newPassword").value.trim();
    let resetError = document.getElementById("resetError");

    if (resetUsername === "" || newPassword === "") {
        resetError.textContent = "Please enter your username and new password.";
        return;
    }

    let storedCustomers = JSON.parse(localStorage.getItem("customers")) || {};

    if (!storedCustomers[resetUsername]) {
        resetError.textContent = "Username not found.";
        return;
    }

    storedCustomers[resetUsername] = newPassword;
    localStorage.setItem("customers", JSON.stringify(storedCustomers));

    alert("Password reset successful! You can now log in.");
    window.location.href = "./chuddam login.html";
});
