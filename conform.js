document.addEventListener("DOMContentLoaded", function () {
    const userDetails = JSON.parse(localStorage.getItem("userDetails")) || {};
    const paymentMethod = localStorage.getItem("paymentMethod") || "Not Selected";

    document.getElementById("order-id").textContent = "TYRE-" + Math.floor(Math.random() * 1000000);
    document.getElementById("user-name").textContent = userDetails.name || "N/A";
    document.getElementById("user-mobile").textContent = userDetails.mobile || "N/A";
    document.getElementById("user-address").textContent = `${userDetails.address}, ${userDetails.area}, ${userDetails.city}, ${userDetails.state} - ${userDetails.pincode}`;
    document.getElementById("payment-method").textContent = paymentMethod;
});

function goToHome() {
    window.location.href = "./order.html";
}
