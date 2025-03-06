document.addEventListener("DOMContentLoaded", function () {
    const shippingForm = document.getElementById("shipping-form");
    const zipInput = document.getElementById("zipcode");
    const cityInput = document.getElementById("city");
    const stateInput = document.getElementById("state");

    // Auto-fill Full Name if user is logged in
    function loadUserData() {
        const loggedInUser = localStorage.getItem("currentUser");
        if (loggedInUser) {
            document.getElementById("full-name").value = loggedInUser;
        }
    }

    // Load stored shipping details
    function loadShippingDetails() {
        const shippingDetails = JSON.parse(localStorage.getItem("shippingDetails")) || {};

        document.getElementById("phone").value = shippingDetails.phone || "";
        document.getElementById("address").value = shippingDetails.address || "";
        cityInput.value = shippingDetails.city || "";
        stateInput.value = shippingDetails.state || "";
        zipInput.value = shippingDetails.zipcode || "";
    }

    // Fetch City & State When Zip Code is Entered
    zipInput.addEventListener("blur", function () {
        const zipCode = zipInput.value.trim();

        if (/^\d{6}$/.test(zipCode)) { // Ensure 6-digit zip code
            fetch(`https://api.postalpincode.in/pincode/${zipCode}`)
                .then(response => response.json())
                .then(data => {
                    if (data[0].Status === "Success") {
                        cityInput.value = data[0].PostOffice[0].District;
                        stateInput.value = data[0].PostOffice[0].State;
                    } else {
                        alert("Invalid Zip Code! Please enter a valid one.");
                        cityInput.value = "";
                        stateInput.value = "";
                    }
                })
                .catch(error => {
                    console.error("Error fetching location:", error);
                    alert("Unable to fetch city and state. Please enter manually.");
                });
        } else {
            alert("Zip code must be exactly 6 digits.");
            cityInput.value = "";
            stateInput.value = "";
        }
    });

    // Save shipping details & proceed to payment
    shippingForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const shippingDetails = {
            fullName: document.getElementById("full-name").value.trim(),
            phone: document.getElementById("phone").value.trim(),
            address: document.getElementById("address").value.trim(),
            city: cityInput.value.trim(),
            state: stateInput.value.trim(),
            zipcode: zipInput.value.trim(),
        };

        // Validate Phone Number (10 Digits)
        if (!/^\d{10}$/.test(shippingDetails.phone)) {
            alert("Phone number must be exactly 10 digits.");
            return;
        }

        // Validate Zip Code (6 Digits)
        if (!/^\d{6}$/.test(shippingDetails.zipcode)) {
            alert("Zip code must be exactly 6 digits.");
            return;
        }

        // Check for Empty Fields
        for (const key in shippingDetails) {
            if (!shippingDetails[key]) {
                alert(`Please fill in ${key.replace(/([A-Z])/g, " $1")}`);
                return;
            }
        }

        // Store Shipping Details & Proceed to Payment
        localStorage.setItem("shippingDetails", JSON.stringify(shippingDetails));
        alert("Shipping details saved! Redirecting to payment...");
        window.location.href = "payment.html";
    });

    loadUserData();
    loadShippingDetails();
});
