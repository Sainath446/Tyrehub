document.addEventListener("DOMContentLoaded", function () {
    

    

    // Load Recent Orders
    loadRecentOrders();

    // Load Notifications
    loadNotifications();

    // Handle Logout
    const logoutBtn = document.getElementById("logoutBtn");
    if (logoutBtn) {
        logoutBtn.addEventListener("click", function () {
            localStorage.clear();
            window.location.href = "./chuddam login.html";
        });
    }
});

// ✅ Load Recent Orders
function loadRecentOrders() {
    const orderList = document.getElementById("orderList");
    if (orderList) {
        const orders = JSON.parse(localStorage.getItem("recentOrders")) || ["No recent orders."];
        orderList.innerHTML = "";
        orders.forEach(order => {
            let listItem = document.createElement("li");
            listItem.textContent = order;
            orderList.appendChild(listItem);
        });
    }
}

// ✅ Load Notifications
function loadNotifications() {
    const notificationText = document.getElementById("notificationText");
    if (notificationText) {
        const notifications = JSON.parse(localStorage.getItem("notifications")) || ["No new notifications."];
        notificationText.innerText = notifications.join("\n");
    }
}
