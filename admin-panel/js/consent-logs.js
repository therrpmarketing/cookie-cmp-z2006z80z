document.addEventListener("DOMContentLoaded", () => {
  const logsTableBody = document.getElementById("logs-table-body");

  // Fetch logs from localStorage (you can replace this later with real backend)
  const consentLogs = JSON.parse(localStorage.getItem("consentLogs")) || [];

  function renderLogs() {
    logsTableBody.innerHTML = "";
    if (consentLogs.length === 0) {
      logsTableBody.innerHTML = `<tr><td colspan="3">No logs available.</td></tr>`;
      return;
    }

    consentLogs.forEach(log => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${new Date(log.timestamp).toLocaleString()}</td>
        <td>${log.consentType}</td>
        <td>${log.details || "-"}</td>
      `;
      logsTableBody.appendChild(row);
    });
  }

  renderLogs();
});

