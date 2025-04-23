// Firebase Configuration - replace with your actual Firebase credentials
const firebaseConfig = {
    apiKey: "AIzaSyB0yG8sGI47Zdncr21avyeJauW4Z6qJU8E",
    authDomain: "cookie-cmp-sys.firebaseapp.com",
    databaseURL: "https://cookie-cmp-sys-default-rtdb.firebaseio.com",
    projectId: "cookie-cmp-sys",
    storageBucket: "cookie-cmp-sys.appspot.com",
    messagingSenderId: "252822009652",
    appId: "1:252822009652:web:6bfbdf28d98953ccb89761",
    measurementId: "G-DLGR6XFPP5"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.database();

// Input elements (make sure your HTML uses these IDs!)
const bgInput = document.querySelector('#bgColor');
const textInput = document.querySelector('#textColor');
const btnInput = document.querySelector('#btnColor');

// Save button (ensure your button uses this class)
const saveBtn = document.querySelector('.cmp-save-button');

// Firebase reference path (adjust this if needed)
const themeRef = db.ref('themeSettings/current');

// Function to load theme settings from Firebase
function getThemeSettings() {
    themeRef.once('value').then((snapshot) => {
        const data = snapshot.val();
        if (data) {
            // Set input fields
            bgInput.value = data.backgroundColor || '#ffffff';
            textInput.value = data.textColor || '#000000';
            btnInput.value = data.buttonColor || '#ff5733';

            // Apply to CSS variables
            document.documentElement.style.setProperty('--cmp-background-color', data.backgroundColor);
            document.documentElement.style.setProperty('--cmp-text-color', data.textColor);
            document.documentElement.style.setProperty('--cmp-button-color', data.buttonColor);
        }
    }).catch((error) => {
        console.error("Error loading theme settings:", error);
    });
}

// Save button click handler
saveBtn.addEventListener("click", () => {
    const newTheme = {
        backgroundColor: bgInput.value,
        textColor: textInput.value,
        buttonColor: btnInput.value
    };

    // Save to Firebase
    themeRef.set(newTheme)
        .then(() => {
            alert("🎉 Theme settings saved!");

            // Apply new theme immediately
            document.documentElement.style.setProperty('--cmp-background-color', newTheme.backgroundColor);
            document.documentElement.style.setProperty('--cmp-text-color', newTheme.textColor);
            document.documentElement.style.setProperty('--cmp-button-color', newTheme.buttonColor);
        })
        .catch((error) => {
            console.error("Error saving theme settings:", error);
        });
});

// Load theme settings on page load
window.addEventListener("load", () => {
    getThemeSettings();
});

// CMP Sidebar Loader (modular, namespaced)
document.addEventListener("DOMContentLoaded", function () {
    const sidebarContainer = document.getElementById("cmp-sidebar");
    if (sidebarContainer) {
        fetch("../cmp-assets/cmp-components/sidebar.html")
            .then((res) => res.text())
            .then((html) => {
                sidebarContainer.innerHTML = html;

                // Set active state based on current page
                const current = window.location.pathname.split("/").pop();
                const links = sidebarContainer.querySelectorAll("a[data-page]");
                links.forEach((link) => {
                    if (link.getAttribute("data-page") === current) {
                        link.classList.add("cmp-active");
                    }
                });
            })
            .catch((err) => {
                console.error("Sidebar load failed:", err);
            });
    }
});

document.addEventListener('DOMContentLoaded', function () {
    const saveBtn = document.getElementById('save-cookie-settings');
    
    // Load existing settings (if any) from Firebase
    function loadSettings() {
        firebase.database().ref('cookieSettings').once('value', function(snapshot) {
            const data = snapshot.val();
            if (data) {
                document.getElementById('cookie-domain').value = data.cookieDomain || '';
                document.getElementById('same-site-policy').value = data.sameSitePolicy || 'Lax';
                document.getElementById('secure-cookie-toggle').checked = data.secureCookie || false;
                document.getElementById('http-only-toggle').checked = data.httpOnly || false;
            }
        });
    }
  
