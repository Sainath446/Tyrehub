document.addEventListener("DOMContentLoaded", function () {
    loadCartItems();
});

function loadCartItems() {
    const cartItemsContainer = document.getElementById("cart-items");
    const totalAmount = document.getElementById("total-amount");

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    cartItemsContainer.innerHTML = "";

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<tr><td colspan="4">Your cart is empty.</td></tr>';
        totalAmount.textContent = "0";
        return;
    }

    let total = 0;
    cart.forEach((item, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${item.name}</td>
            <td>${item.size}</td>
            <td>${item.quantity}</td>
            <td>₹${item.price * item.quantity}</td>
            <td><button class="remove-btn" onclick="removeCartItem(${index})">Remove</button></td>
        `;
        cartItemsContainer.appendChild(row);
        total += item.price * item.quantity;
    });

    totalAmount.textContent = total;
}

function removeCartItem(index) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    loadCartItems();
}

function checkout() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    window.location.href = "./shipping.html";
}

window.onload = loadCartItems;
cart.forEach((item, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
        <td>${item.name || "N/A"}</td>
        <td>${item.size || "N/A"}</td>
        <td>${item.quantity}</td>
        <td>₹${item.price * item.quantity}</td>
        <td><button class="remove-btn" onclick="removeCartItem(${index})">Remove</button></td>
    `;
    cartItemsContainer.appendChild(row);
    total += item.price * item.quantity;
});
document.addEventListener("DOMContentLoaded", () => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const cartItemsContainer = document.getElementById("cart-items");
    const totalPriceElement = document.getElementById("total-price");

    function updateCartDisplay() {
        cartItemsContainer.innerHTML = "";
        let total = 0;

        cart.forEach((item, index) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${item.name || "Unknown Tyre"}</td>
                <td>${item.size || "N/A"}</td>
                <td>
                    <button onclick="updateQuantity(${index}, -1)">-</button>
                    ${item.quantity}
                    <button onclick="updateQuantity(${index}, 1)">+</button>
                </td>
                <td>₹${(item.price * item.quantity).toLocaleString()}</td>
                <td><button class="remove-btn" onclick="removeCartItem(${index})">Remove</button></td>
            `;
            cartItemsContainer.appendChild(row);
            total += item.price * item.quantity;
        });

        totalPriceElement.textContent = `₹${total.toLocaleString()}`;
        localStorage.setItem("cart", JSON.stringify(cart));
    }

    window.updateQuantity = (index, change) => {
        if (cart[index].quantity + change > 0) {
            cart[index].quantity += change;
            updateCartDisplay();
        }
    };

    window.removeCartItem = (index) => {
        cart.splice(index, 1);
        updateCartDisplay();
    };

    document.getElementById("checkout-btn").addEventListener("click", () => {
        alert("Proceeding to checkout...");
    });

    updateCartDisplay();
});
