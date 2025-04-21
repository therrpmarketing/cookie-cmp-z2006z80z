const logsData = [
    { userId: 'user123', consentType: 'Marketing', status: 'Accepted', date: '2025-04-01' },
    { userId: 'user124', consentType: 'Analytics', status: 'Rejected', date: '2025-04-02' },
    // More sample logs
];

let currentPage = 1;
let rowsPerPage = 20;

document.getElementById('filter-logs').addEventListener('click', function() {
    const startDate = document.getElementById('start-date').value;
    const endDate = document.getElementById('end-date').value;
    const selectedRows = document.getElementById('rows-per-page').value;
    rowsPerPage = parseInt(selectedRows);

    filterLogs(startDate, endDate);
});

document.getElementById('clear-logs').addEventListener('click', function() {
    if (confirm('Are you sure you want to clear all logs?')) {
        localStorage.clear();
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

// Initial render
renderLogs(logsData);
