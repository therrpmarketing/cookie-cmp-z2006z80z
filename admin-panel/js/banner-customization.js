document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("bannerForm");
  const statusMsg = document.getElementById("statusMsg");

  // Load saved settings
  const saved = JSON.parse(localStorage.getItem("bannerSettings")) || {};
  document.getElementById("bannerText").value = saved.bannerText || "";
  document.getElementById("backgroundColor").value = saved.backgroundColor || "#000000";
  document.getElementById("textColor").value = saved.textColor || "#ffffff";
  document.getElementById("buttonColor").value = saved.buttonColor || "#ff0000";
  document.getElementById("bannerPosition").value = saved.bannerPosition || "bottom";

  // Save settings
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const settings = {
      bannerText: document.getElementById("bannerText").value,
      backgroundColor: document.getElementById("backgroundColor").value,
      textColor: document.getElementById("textColor").value,
      buttonColor: document.getElementById("buttonColor").value,
      bannerPosition: document.getElementById("bannerPosition").value
    };

    localStorage.setItem("bannerSettings", JSON.stringify(settings));
    statusMsg.textContent = "Banner settings saved successfully!";
  });
});

