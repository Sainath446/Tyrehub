document.addEventListener("DOMContentLoaded", function () {
    loadOrderSummary();

    document.getElementById("pay-now").addEventListener("click", function () {
        const selectedPaymentMethod = document.querySelector('input[name="payment-method"]:checked').value;

        if (selectedPaymentMethod === "razorpay") {
            processOnlinePayment();
        } else if (selectedPaymentMethod === "cod") {
            processCOD();
        }
    });
});

// Load Cart Data and Display Order Summary
function loadOrderSummary() {
    const orderItemsContainer = document.getElementById("order-items");
    const totalAmountDisplay = document.getElementById("total-amount");

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    orderItemsContainer.innerHTML = "";
    let total = 0;

    if (cart.length === 0) {
        orderItemsContainer.innerHTML = `<tr><td colspan="4">No items in cart.</td></tr>`;
        totalAmountDisplay.textContent = "0";
        return;
    }

    cart.forEach(item => {
        let row = document.createElement("tr");
        row.innerHTML = `
            <td>${item.name}</td>
            <td>${item.size}</td>
            <td>${item.quantity}</td>
            <td>₹${item.price * item.quantity}</td>
        `;
        orderItemsContainer.appendChild(row);
        total += item.price * item.quantity;
    });

    totalAmountDisplay.textContent = total;
}

// Process Online Payment with Razorpay
function processOnlinePayment() {
    let totalAmount = document.getElementById("total-amount").textContent;

    let options = {
        "key": "rzp_test_9nJqXRqcepLC8g", // Replace with your Razorpay API Key
        "amount": totalAmount * 100,  // Convert to paise (INR)
        "currency": "INR",
        "name": "TyreHub",
        "description": "Tyre Purchase",
        "image": "https://your-logo-url.com/logo.png", // Optional
        "handler": function (response) {
            alert("Payment Successful! Order ID: " + response.razorpay_payment_id);
            localStorage.removeItem("cart"); // Clear cart after payment
            window.location.href = "order_confirmation.html"; // Redirect to order confirmation
        },
        "prefill": {
            "name": localStorage.getItem("currentUser") || "Customer",
            "email": "customer@example.com",
            "contact": "9876543210"
        },
        "theme": {
            "color": "#007bff"
        },
        "method": {
            "upi": true,  // ✅ Enables UPI Payments
            "card": true, // ✅ Enables Card Payments
            "netbanking": true // ✅ Enables Net Banking
        }
    };

    let rzp = new Razorpay(options);
    rzp.open();
}

// Process Cash on Delivery (COD)
function processCOD() {
    alert("Order placed successfully! You will pay in cash upon delivery.");
    
    // Store order details in localStorage
    localStorage.setItem("codOrder", JSON.stringify({
        orderItems: JSON.parse(localStorage.getItem("cart")),
        totalAmount: document.getElementById("total-amount").textContent,
        paymentMethod: "Cash on Delivery"
    }));

    localStorage.removeItem("cart"); // Clear cart after order
    window.location.href = "./order_conform.html"; // Redirect to confirmation page
}