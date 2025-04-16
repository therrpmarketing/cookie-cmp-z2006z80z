document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("advancedSettingsForm");
  const settingsStatus = document.getElementById("settingsStatus");

  // Load saved settings from localStorage
  let settings = JSON.parse(localStorage.getItem("advancedSettings")) || {
    enableBanner: true,
    enableLogging: true,
    enableAnalyticsTracking: false,
    enableAdvertisementTracking: false
  };

  // Update UI based on saved settings
  document.getElementById("enableBanner").checked = settings.enableBanner;
  document.getElementById("enableLogging").checked = settings.enableLogging;
  document.getElementById("enableAnalyticsTracking").checked = settings.enableAnalyticsTracking;
  document.getElementById("enableAdvertisementTracking").checked = settings.enableAdvertisementTracking;

  // Handle form submission
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    settings.enableBanner = document.getElementById("enableBanner").checked;
    settings.enableLogging = document.getElementById("enableLogging").checked;
    settings.enableAnalyticsTracking = document.getElementById("enableAnalyticsTracking").checked;
    settings.enableAdvertisementTracking = document.getElementById("enableAdvertisementTracking").checked;

    // Save settings to localStorage
    localStorage.setItem("advancedSettings", JSON.stringify(settings));

    // Display status message
    settingsStatus.innerHTML = "<p>Settings saved successfully!</p>";
  });
});

