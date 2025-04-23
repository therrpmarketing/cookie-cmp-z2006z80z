// Firebase Configuration
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
firebase.initializeApp(firebaseConfig);
const database = firebase.database();
const firestore = firebase.firestore();

// Input Elements
const bgInput = document.querySelector('#bgColor');
const textInput = document.querySelector('#textColor');
const btnInput = document.querySelector('#btnColor');
const cookieDomainInput = document.querySelector('#cookie-domain');
const sameSitePolicyInput = document.querySelector('#same-site-policy');
const secureCookieToggle = document.querySelector('#secure-cookie-toggle');
const httpOnlyToggle = document.querySelector('#http-only-toggle');

// Buttons
const saveBtn = document.querySelector('.cmp-save-button');
const saveCookieSettingsBtn = document.getElementById('save-cookie-settings');

// Firebase References
const themeRef = database.ref('themeSettings/current');
const cookieSettingsRef = database.ref('cookieSettings');

// Load Theme Settings
function getThemeSettings() {
    themeRef.once('value').then((snapshot) => {
        const data = snapshot.val();
        if (data) {
            bgInput.value = data.backgroundColor || '#ffffff';
            textInput.value = data.textColor || '#000000';
            btnInput.value = data.buttonColor || '#ff5733';

            document.documentElement.style.setProperty('--cmp-background-color', data.backgroundColor);
            document.documentElement.style.setProperty('--cmp-text-color', data.textColor);
            document.documentElement.style.setProperty('--cmp-button-color', data.buttonColor);
        }
    }).catch((error) => {
        console.error("Error loading theme settings:", error);
    });
}

// Save Theme Settings
saveBtn.addEventListener("click", () => {
    const newTheme = {
        backgroundColor: bgInput.value,
        textColor: textInput.value,
        buttonColor: btnInput.value
    };

    themeRef.set(newTheme)
        .then(() => {
            alert("🎉 Theme settings saved!");
            document.documentElement.style.setProperty('--cmp-background-color', newTheme.backgroundColor);
            document.documentElement.style.setProperty('--cmp-text-color', newTheme.textColor);
            document.documentElement.style.setProperty('--cmp-button-color', newTheme.buttonColor);
        })
        .catch((error) => {
            console.error("Error saving theme settings:", error);
        });
});

// Load Cookie Settings
function loadCookieSettings() {
    cookieSettingsRef.once('value').then(snapshot => {
        const data = snapshot.val();
        if (data) {
            cookieDomainInput.value = data.cookieDomain || '';
            sameSitePolicyInput.value = data.sameSitePolicy || 'Lax';
            secureCookieToggle.checked = data.secureCookie || false;
            httpOnlyToggle.checked = data.httpOnly || false;
        }
    }).catch((error) => {
        console.error("Error loading cookie settings:", error);
    });
}

// Save Cookie Settings
saveCookieSettingsBtn.addEventListener("click", () => {
    const newSettings = {
        cookieDomain: cookieDomainInput.value,
        sameSitePolicy: sameSitePolicyInput.value,
        secureCookie: secureCookieToggle.checked,
        httpOnly: httpOnlyToggle.checked
    };

    cookieSettingsRef.set(newSettings)
        .then(() => {
            alert("🎉 Cookie settings saved!");
        })
        .catch((error) => {
            console.error("Error saving cookie settings:", error);
        });
});

// Sidebar Loader
document.addEventListener("DOMContentLoaded", () => {
    const sidebarContainer = document.getElementById("cmp-sidebar");
    if (sidebarContainer) {
        fetch("../cmp-assets/cmp-components/sidebar.html")
            .then(res => res.text())
            .then(html => {
                sidebarContainer.innerHTML = html;

                const current = window.location.pathname.split("/").pop();
                const links = sidebarContainer.querySelectorAll("a[data-page]");
                links.forEach(link => {
                    if (link.getAttribute("data-page") === current) {
                        link.classList.add("cmp-active");
                    }
                });
            })
            .catch(err => console.error("Sidebar load failed:", err));
    }
});

// Fetch Consent Data by User ID
function fetchConsentData(userId) {
    const consentRef = firestore.collection('user_consents').doc(userId);
    consentRef.get()
        .then(doc => {
            if (doc.exists) {
                const data = doc.data();
                updateConsentUI(data);
            } else {
                console.log("No consent data found for user");
            }
        })
        .catch(error => console.error("Error fetching consent data:", error));
}

// Dummy Function - Replace with your actual user ID fetch logic
function getUserId() {
    return 'demo-user-id'; // Replace this with actual logic to fetch user ID
}

// Update Consent UI
function updateConsentUI(data) {
    document.getElementById('analytics-consent').textContent = data.analytics ? "Allowed" : "Not Allowed";
    document.getElementById('ad-consent').textContent = data.advertising ? "Allowed" : "Not Allowed";
    document.getElementById('functional-consent').textContent = data.functional ? "Allowed" : "Not Allowed";
    document.getElementById('personalization-consent').textContent = data.personalization ? "Allowed" : "Not Allowed";
}

// Real-time Consent Logs Listener
function fetchConsentLogs() {
    const logRef = database.ref('consentLogs');
    const logList = document.getElementById('consent-log-list');

    logRef.orderByChild('timestamp').on('value', snapshot => {
        const logs = snapshot.val();
        logList.innerHTML = ''; // Clear existing logs

        if (logs) {
            Object.entries(logs).forEach(([key, log]) => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${log.sessionId}</td>
                    <td>${log.action}</td>
                    <td>${new Date(log.timestamp).toLocaleString()}</td>
                `;
                logList.appendChild(row);
            });
        }
    });
}

// Initial Load Events
window.addEventListener("load", () => {
    getThemeSettings();
    loadCookieSettings();
});

document.addEventListener('DOMContentLoaded', () => {
    const userId = getUserId();
    fetchConsentData(userId);
    fetchConsentLogs();
});
