// public/script.js
document.addEventListener("DOMContentLoaded", function () {
  // Fetch updated data from the server
  fetch("http://your-ngrok-url/webhook")
    .then((response) => response.json())
    .then((data) => {
      // Update the DOM with the received data
      document.getElementById("dealName").textContent = data.dealName;
      document.getElementById("managerName").textContent = data.managerName;
      document.getElementById("dealAmount").textContent = data.dealAmount;
    })
    .catch((error) => console.error("Error fetching data:", error));
});
