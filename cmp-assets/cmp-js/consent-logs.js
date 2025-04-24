// Import Firebase functions for initializing and using Firebase Realtime Database
import { initializeApp } from "firebase/app";
import { getDatabase, ref, push, set } from "firebase/database";

// Your Firebase configuration details
const firebaseConfig = {
  apiKey: "AIzaSyB0yG8sGI47Zdncr21avyeJauW4Z6qJU8E",
  authDomain: "cookie-cmp-sys.firebaseapp.com",
  databaseURL: "https://cookie-cmp-sys-default-rtdb.firebaseio.com",
  projectId: "cookie-cmp-sys",
  storageBucket: "cookie-cmp-sys.firebasestorage.app",
  messagingSenderId: "252822009652",
  appId: "1:252822009652:web:6bfbdf28d98953ccb89761",
  measurementId: "G-DLGR6XFPP5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app); // Initialize Realtime Database


let logsData = [];
let currentPage = 1;
let rowsPerPage = 20;

document.addEventListener("DOMContentLoaded", function () {
    // Reference to the Firebase database
    const dbRef = firebase.database().ref("consentLogs");

    // Fetch data from Firebase
    dbRef.once("value").then(snapshot => {
        const logs = snapshot.val();
        if (!logs) {
            renderLogs([]);  // If no logs exist, render empty
            return;
        }

        // Process the logs, ensuring correct data format
        logsData = Object.entries(logs)
            .filter(([key]) => key.startsWith("session_"))  // Filter to only session logs
            .map(([key, value]) => ({
                sessionId: value.session_id || "-",
                consentType: value.preferences ? Object.keys(value.preferences).join(", ") : "Unknown",
                status: value.action || "-",
                date: value.timestamp ? new Date(value.timestamp).toISOString().split("T")[0] : "-",
            }))
            .sort((a, b) => new Date(b.date) - new Date(a.date));  // Sort by date, descending

        renderLogs(logsData);  // Render the logs
    }).catch(error => {
        console.error("Error fetching consent logs:", error);
        renderLogs([]);  // In case of an error, render empty
    });
});

// Filter logs based on the date range
document.getElementById('filter-logs').addEventListener('click', function () {
    const startDate = document.getElementById('start-date').value;
    const endDate = document.getElementById('end-date').value;
    const selectedRows = document.getElementById('rows-per-page').value;
    rowsPerPage = parseInt(selectedRows);

    filterLogs(startDate, endDate);
});

// Clear logs from local storage
document.getElementById('clear-logs').addEventListener('click', function () {
    if (confirm('Are you sure you want to clear all logs?')) {
        localStorage.clear();  // Clear localStorage (mocked for now)
        renderLogs([]);  // Empty the logs table
    }
});

// Function to filter logs by date
function filterLogs(startDate, endDate) {
    const filteredLogs = logsData.filter(log => {
        const logDate = new Date(log.date);
        return (!startDate || logDate >= new Date(startDate)) &&
               (!endDate || logDate <= new Date(endDate));
    });
    renderLogs(filteredLogs);  // Render the filtered logs
}

// Function to render the logs in the table
function renderLogs(logs) {
    const tableBody = document.querySelector('#logs-table tbody');
    tableBody.innerHTML = '';  // Clear existing rows

    logs.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage).forEach(log => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${log.sessionId}</td>
            <td>${log.consentType}</td>
            <td>${log.status}</td>
            <td>${log.date}</td>
        `;
        tableBody.appendChild(row);
    });

    generatePagination(logs.length);  // Generate pagination controls
}

// Function to generate pagination buttons
function generatePagination(totalLogs) {
    const paginationContainer = document.getElementById('pagination');
    paginationContainer.innerHTML = '';  // Clear existing pagination

    const totalPages = Math.ceil(totalLogs / rowsPerPage);
    for (let i = 1; i <= totalPages; i++) {
        const button = document.createElement('button');
        button.textContent = i;
        button.onclick = () => {
            currentPage = i;
            renderLogs(logsData);  // Re-render the table for the selected page
        };
        paginationContainer.appendChild(button);
    }
}

