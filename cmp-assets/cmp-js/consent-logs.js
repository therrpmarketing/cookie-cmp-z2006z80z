let logsData = [];
let currentPage = 1;
let rowsPerPage = 20;

// Firebase fetch
document.addEventListener("DOMContentLoaded", function () {
    const dbRef = firebase.database().ref("consentLogs");

    dbRef.once("value").then(snapshot => {
        const logs = snapshot.val();
        if (!logs) {
            renderLogs([]);
            return;
        }

        // Convert and filter only session logs
        logsData = Object.entries(logs)
            .filter(([key]) => key.startsWith("session_"))
            .map(([key, value]) => ({
                userId: value.session_id || "-",
                consentType: value.preferences ? Object.keys(value.preferences).join(", ") : "Unknown",
                status: value.action || "-",
                date: value.timestamp ? new Date(value.timestamp).toISOString().split("T")[0] : "-"
            }))
            .sort((a, b) => new Date(b.date) - new Date(a.date));

        renderLogs(logsData);
    }).catch(error => {
        console.error("Firebase fetch error:", error);
        renderLogs([]);
    });
});

document.getElementById('filter-logs').addEventListener('click', function () {
    const startDate = document.getElementById('start-date').value;
    const endDate = document.getElementById('end-date').value;
    const selectedRows = document.getElementById('rows-per-page').value;
    rowsPerPage = parseInt(selectedRows);

    filterLogs(startDate, endDate);
});

document.getElementById('clear-logs').addEventListener('click', function () {
    if (confirm('Are you sure you want to clear all logs?')) {
        localStorage.clear(); // still clears mock if stored locally
        renderLogs([]);
    }
});

function filterLogs(startDate, endDate) {
    const filteredLogs = logsData.filter(log => {
        const logDate = new Date(log.date);
        return (!startDate || logDate >= new Date(startDate)) &&
               (!endDate || logDate <= new Date(endDate));
    });
    renderLogs(filteredLogs);
}

function renderLogs(logs) {
    const tableBody = document.querySelector('#logs-table tbody');
    tableBody.innerHTML = '';

    logs.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage).forEach(log => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${log.userId}</td>
            <td>${log.consentType}</td>
            <td>${log.status}</td>
            <td>${log.date}</td>
        `;
        tableBody.appendChild(row);
    });

    generatePagination(logs.length);
}

function generatePagination(totalLogs) {
    const paginationContainer = document.getElementById('pagination');
    paginationContainer.innerHTML = '';

    const totalPages = Math.ceil(totalLogs / rowsPerPage);
    for (let i = 1; i <= totalPages; i++) {
        const button = document.createElement('button');
        button.textContent = i;
        button.onclick = () => {
            currentPage = i;
            renderLogs(logsData);
        };
        paginationContainer.appendChild(button);
    }
}
