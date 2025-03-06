document.addEventListener("DOMContentLoaded", function () {
    // Set Customer Name from Local Storage
    const customerName = localStorage.getItem("currentUser") || "Customer";
    const customerNameElement = document.getElementById("customerName");
    if (customerNameElement) {
        customerNameElement.textContent = customerName;
    }

    // Load Cart Count
    updateCartCount();

    // Load Recent Orders
    loadRecentOrders();

    // Handle Logout
    const logoutBtn = document.getElementById("logoutBtn");
    if (logoutBtn) {
        logoutBtn.addEventListener("click", function () {
            localStorage.clear();
            window.location.href = "login.html";
        });
    }

    // Category Change Event
    document.getElementById("category-select").addEventListener("change", function () {
        loadVehicleBrands(this.value);
    });

    // Brand Change Event (Now refers to Vehicle Brand)
    document.getElementById("brand-select").addEventListener("change", function () {
        loadVehicles(this.value);
    });

    // Front/Rear Button Toggle
    document.getElementById("front-btn").addEventListener("click", function () {
        selectTyrePosition("front");
    });

    document.getElementById("rear-btn").addEventListener("click", function () {
        selectTyrePosition("rear");
    });
});

// ✅ Update Cart Count
function updateCartCount() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    document.getElementById("cart-count").textContent = cart.length;
}

// ✅ Load Recent Orders
function loadRecentOrders() {
    const orders = JSON.parse(localStorage.getItem("recentOrders")) || ["No recent orders."];
    const orderList = document.getElementById("orderList");

    if (orderList) {
        orderList.innerHTML = "";
        orders.forEach(order => {
            let listItem = document.createElement("li");
            listItem.textContent = order;
            orderList.appendChild(listItem);
        });
    }
}

// ✅ Load Vehicle Brands Based on Category
function loadVehicleBrands(category) {
    const brandSelect = document.getElementById("brand-select");
    brandSelect.innerHTML = `<option value="">Select Vehicle Brand</option>`;

    if (category) {
        brandSelect.disabled = false;
        const vehicleBrands = {
            "2-wheeler": ["Honda", "Yamaha", "Bajaj", "Royal Enfield"],
            "4-wheeler": ["Toyota", "Hyundai", "Maruti Suzuki", "Honda"],
            "truck": ["Tata", "Ashok Leyland", "Eicher", "Mahindra"],
            "farm": ["John Deere", "Mahindra", "New Holland", "Sonalika"]
        };

        vehicleBrands[category].forEach(brand => {
            let option = document.createElement("option");
            option.value = brand;
            option.textContent = brand;
            brandSelect.appendChild(option);
        });
    } else {
        brandSelect.disabled = true;
    }

    document.getElementById("vehicle-select").disabled = true;
}

// ✅ Load Vehicles Based on Vehicle Brand
function loadVehicles(brand) {
    const vehicleSelect = document.getElementById("vehicle-select");
    vehicleSelect.innerHTML = `<option value="">Select Vehicle</option>`;

    if (brand) {
        vehicleSelect.disabled = false;
        const vehicles = {
            "Honda": ["Activa", "CBR 650R", "Unicorn"],
            "Yamaha": ["FZ", "R15", "MT-15"],
            "Bajaj": ["Pulsar 150", "Avenger 220"],
            "Royal Enfield": ["Classic 350", "Himalayan"],
            "Toyota": ["Fortuner", "Innova Crysta"],
            "Hyundai": ["Creta", "Venue"],
            "Maruti Suzuki": ["Swift", "Baleno"],
            "Tata": ["Prima", "Signa"],
            "Ashok Leyland": ["Dost", "Boss"],
            "Eicher": ["Pro 3015", "Pro 2095"],
            "John Deere": ["5050D", "5310"],
            "Mahindra": ["Arjun Novo", "Jivo 245"],
            "New Holland": ["Excel 4710", "5630 TX"],
            "Sonalika": ["DI 750 III", "RX 745"]
        };

        if (vehicles[brand]) {
            vehicles[brand].forEach(vehicle => {
                let option = document.createElement("option");
                option.value = vehicle;
                option.textContent = vehicle;
                vehicleSelect.appendChild(option);
            });
        }
    } else {
        vehicleSelect.disabled = true;
    }
}

// ✅ Handle Tyre Position Selection
function selectTyrePosition(position) {
    document.getElementById("front-btn").classList.remove("active");
    document.getElementById("rear-btn").classList.remove("active");

    document.getElementById(`${position}-btn`).classList.add("active");
    loadTyres(position);
}

// ✅ Load Tyres Based on Selected Options
function loadTyres(position) {
    const category = document.getElementById("category-select").value;
    const brand = document.getElementById("brand-select").value;
    const vehicle = document.getElementById("vehicle-select").value;
    const tyreDisplay = document.getElementById("tyre-display");

    tyreDisplay.innerHTML = "";

    if (category && brand && vehicle) {
        let tyreList = [
            { name: `${brand} ${vehicle} Tyre 1`, price: 3500 },
            { name: `${brand} ${vehicle} Tyre 2`, price: 4000 }
        ];

        tyreList.forEach(tyre => {
            let tyreDiv = document.createElement("div");
            tyreDiv.classList.add("tyre-item");
            tyreDiv.innerHTML = `
                <p><strong>${tyre.name} (${position})</strong></p>
                <p>Price: ₹${tyre.price}</p>
                <button onclick="addToCart('${tyre.name}', ${tyre.price})">Add to Cart</button>
            `;
            tyreDisplay.appendChild(tyreDiv);
        });
    } else {
        tyreDisplay.innerHTML = `<p style="color:red;">Please select all options!</p>`;
    }
}

// ✅ Add Item to Cart
function addToCart(tyreName, price) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push({ tyreName, price });
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
    alert(`${tyreName} added to cart!`);
}
document.addEventListener("DOMContentLoaded", function () {
    // Handle Logout
    const logoutBtn = document.getElementById("logoutBtn");
    if (logoutBtn) {
        logoutBtn.addEventListener("click", function () {
            localStorage.clear();
            window.location.href = "login.html";
        });
    }
});
document.addEventListener("DOMContentLoaded", function () {
    // Set Customer Name
    const customerName = localStorage.getItem("currentUser") || "Customer";
    document.getElementById("customerName").textContent = customerName;

    // Load Cart Count
    updateCartCount();

    // Logout Button
    document.getElementById("logoutBtn").addEventListener("click", function () {
        localStorage.clear();
        window.location.href = "login.html";
    });

    // Category Selection
    document.getElementById("category-select").addEventListener("change", function () {
        loadVehicleBrands(this.value);
    });

    // Brand Selection
    document.getElementById("brand-select").addEventListener("change", function () {
        loadVehicles(this.value);
    });

    // Front/Rear Tyre Selection
    document.getElementById("front-btn").addEventListener("click", function () {
        selectTyrePosition("front");
    });

    document.getElementById("rear-btn").addEventListener("click", function () {
        selectTyrePosition("rear");
    });
});



// ✅ Change Quantity
function changeQuantity(button, amount) {
    let quantityDisplay = button.parentElement.querySelector(".quantity-display");
    let currentQuantity = parseInt(quantityDisplay.textContent);
    let newQuantity = currentQuantity + amount;

    if (newQuantity >= 1) {
        quantityDisplay.textContent = newQuantity;
    }
}

// ✅ Load Tyres Based on Selected Options (Now Includes Quantity)
function loadTyres(position) {
    const category = document.getElementById("category-select").value;
    const brand = document.getElementById("brand-select").value;
    const vehicle = document.getElementById("vehicle-select").value;
    const tyreDisplay = document.getElementById("tyre-display");

    tyreDisplay.innerHTML = "";

    if (category && brand && vehicle) {
        let tyreList = [
            { name: `${brand} ${vehicle} Tyre 1`, price: 3500 },
            { name: `${brand} ${vehicle} Tyre 2`, price: 4000 }
        ];

        tyreList.forEach((tyre, index) => {
            let tyreDiv = document.createElement("div");
            tyreDiv.classList.add("tyre-item");
            tyreDiv.innerHTML = `
                <p><strong>${tyre.name} (${position})</strong></p>
                <p>Price: ₹${tyre.price}</p>
                <div class="quantity-container">
                    <button class="quantity-btn" onclick="updateQuantity(${index}, -1)">-</button>
                    <input type="text" id="quantity-${index}" class="quantity-input" value="1" readonly>
                    <button class="quantity-btn" onclick="updateQuantity(${index}, 1)">+</button>
                </div>
                <button onclick="addToCart('${tyre.name}', ${tyre.price}, ${index})">Add to Cart</button>
            `;
            tyreDisplay.appendChild(tyreDiv);
        });
    } else {
        tyreDisplay.innerHTML = `<p style="color:red;">Please select all options!</p>`;
    }
}

// ✅ Update Quantity
function updateQuantity(index, change) {
    let quantityInput = document.getElementById(`quantity-${index}`);
    let currentQuantity = parseInt(quantityInput.value);
    let newQuantity = currentQuantity + change;

    if (newQuantity >= 1) {
        quantityInput.value = newQuantity;
    }
}

// ✅ Add Item to Cart with Selected Quantity
function addToCart(tyreName, price, index) {
    let quantity = parseInt(document.getElementById(`quantity-${index}`).value);
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    cart.push({ tyreName, price, quantity });
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
    alert(`${quantity} x ${tyreName} added to cart!`);
}
