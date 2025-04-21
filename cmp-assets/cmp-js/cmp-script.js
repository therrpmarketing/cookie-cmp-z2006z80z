
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
const db = firebase.database();  // We're using Firebase Realtime Database


// CMP Sidebar Loader (Modular)
document.addEventListener("DOMContentLoaded", function () {
  const sidebarContainer = document.getElementById("cmp-sidebar");
  if (sidebarContainer) {
    fetch("../cmp-assets/cmp-components/sidebar.html")
      .then((res) => res.text())
      .then((html) => {
        sidebarContainer.innerHTML = html;

        // Set active state
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
