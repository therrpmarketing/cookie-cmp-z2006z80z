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
const cookieDomainInput = document.querySelector('#cookie-domain');
const sameSitePolicyInput = document.querySelector('#same-site-policy');
const secureCookieToggle = document.querySelector('#secure-cookie-toggle');
const httpOnlyToggle = document.querySelector('#http-only-toggle');

// Save button (ensure your button uses this class)
const saveBtn = document.querySelector('.cmp-save-button');
const saveCookieSettingsBtn = document.getElementById('save-cookie-settings');

// Firebase reference path (adjust this if needed)
const themeRef = db.ref('themeSettings/current');
const cookieSettingsRef = db.ref('cookieSettings');

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

// Save button click handler for theme settings
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

// Function to load cookie settings from Firebase
function loadCookieSettings() {
    cookieSettingsRef.once('value', function(snapshot) {
        const data = snapshot.val();
        if (data) {
            // Set input fields
            cookieDomainInput.value = data.cookieDomain || '';
            sameSitePolicyInput.value = data.sameSitePolicy || 'Lax';
            secureCookieToggle.checked = data.secureCookie || false;
            httpOnlyToggle.checked = data.httpOnly || false;
        }
    }).catch((error) => {
        console.error("Error loading cookie settings:", error);
    });
}

// Save button click handler for cookie settings
saveCookieSettingsBtn.addEventListener("click", () => {
    const newCookieSettings = {
        cookieDomain: cookieDomainInput.value,
        sameSitePolicy: sameSitePolicyInput.value,
        secureCookie: secureCookieToggle.checked,
        httpOnly: httpOnlyToggle.checked
    };

    // Save to Firebase
    cookieSettingsRef.set(newCookieSettings)
        .then(() => {
            alert("🎉 Cookie settings saved!");
        })
        .catch((error) => {
            console.error("Error saving cookie settings:", error);
        });
});

// Load cookie settings on page load
window.addEventListener("load", () => {
    loadCookieSettings();
});




// Show/hide the custom expiry date field based on the selection
document.getElementById("expiry-time").addEventListener("change", function() {
  const expiryOption = document.getElementById("expiry-time").value;
  const customExpiryDiv = document.getElementById("custom-expiry");

  if (expiryOption === "custom") {
    customExpiryDiv.classList.remove("hidden");
  } else {
    customExpiryDiv.classList.add("hidden");
  }
});

// Function to save cookie expiry setting along with other settings
function saveCookieExpirySettings() {
  const expiryOption = document.getElementById("expiry-time").value;
  let expiryDate = null;

  if (expiryOption === "custom") {
    expiryDate = document.getElementById("expiry-date").value;
  }

  const settingsData = {
    expiryOption,
    expiryDate
  };

  const db = getDatabase();
  set(ref(db, "cookieSettings/expiry"), settingsData)
    .then(() => {
      alert("Cookie expiry settings saved successfully.");
    })
    .catch((error) => {
      console.error("Error saving cookie expiry settings:", error);
      alert("Failed to save settings.");
    });
}

document.getElementById("save-cookie-settings").addEventListener("click", saveCookieExpirySettings);



