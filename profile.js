document.addEventListener("DOMContentLoaded", function () {
    const profileForm = document.getElementById("profile-form");

    // Load username from login session (localStorage)
    function loadUsername() {
        const loggedInUser = localStorage.getItem("currentUser"); // Get the correct key
        if (loggedInUser) {
            document.getElementById("full-name").value = loggedInUser; // Set Full Name field
        } else {
            alert("No user is logged in. Redirecting to login page.");
            window.location.href = "./chuddam login.html"; // Redirect if no user is logged in
        }
    }

    // Load stored profile data (except Full Name)
    function loadProfile() {
        const profile = JSON.parse(localStorage.getItem("userProfile")) || {};

        document.getElementById("email").value = profile.email || "";
        document.getElementById("phone").value = profile.phone || "";
        document.getElementById("address").value = profile.address || "";
    }

    // Save profile data (without changing Full Name)
    profileForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const userProfile = {
            email: document.getElementById("email").value,
            phone: document.getElementById("phone").value,
            address: document.getElementById("address").value,
        };

        localStorage.setItem("userProfile", JSON.stringify(userProfile));
        alert("Profile Updated Successfully!");
    });

    loadUsername();
    loadProfile();
});
document.addEventListener("DOMContentLoaded", function () {
    const logo = document.querySelector(".logo");
    
    if (logo) {
        logo.addEventListener("click", function () {
            window.location.href = "customer_dashboard.html";
        });
    }
});
