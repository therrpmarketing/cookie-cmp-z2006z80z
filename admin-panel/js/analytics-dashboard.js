document.addEventListener("DOMContentLoaded", () => {
  const acceptCount = document.getElementById("acceptCount").querySelector("span");
  const rejectCount = document.getElementById("rejectCount").querySelector("span");
  const customCount = document.getElementById("customCount").querySelector("span");
  const userInteractionTable = document.getElementById("userInteractionTable").querySelector("tbody");

  // Fetch stored consent data from localStorage
  const consentData = JSON.parse(localStorage.getItem("consentLogs")) || [];

  // Update the statistics on the dashboard
  let accepted = 0, rejected = 0, customized = 0;

  consentData.forEach(entry => {
    if (entry.status === "Accepted") {
      accepted++;
    } else if (entry.status === "Rejected") {
      rejected++;
    } else {
      customized++;
    }

    // Add user interaction to the table
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${entry.user}</td>
      <td>${entry.preferences}</td>
      <td>${entry.date}</td>
    `;
    userInteractionTable.appendChild(row);
  });

  // Update the statistics count
  acceptCount.textContent = accepted;
  rejectCount.textContent = rejected;
  customCount.textContent = customized;
});

