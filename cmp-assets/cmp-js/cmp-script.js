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
