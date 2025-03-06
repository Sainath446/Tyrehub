document.addEventListener("DOMContentLoaded", function() {
    function generateSalesData() {
        return Array.from({ length: 6 }, () => Math.floor(Math.random() * 100));
    }

    function createChart(ctx, label) {
        new Chart(ctx, {
            type: "line",
            data: {
                labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
                datasets: [{
                    label: label,
                    data: generateSalesData(),
                    borderColor: "rgba(255, 165, 0, 1)",
                    backgroundColor: "rgba(255, 165, 0, 0.3)",
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                scales: {
                    y: { beginAtZero: true }
                }
            }
        });
    }

    createChart(document.getElementById("chartTwoWheeler"), "Two-Wheeler Sales");
    createChart(document.getElementById("chartThreeWheeler"), "Three-Wheeler Sales");
    createChart(document.getElementById("chartFourWheeler"), "Four-Wheeler Sales");
    createChart(document.getElementById("chartTruck"), "Truck Sales");
    createChart(document.getElementById("chartFarm"), "Farm Sales");
});
