document.addEventListener("DOMContentLoaded", () => {
  const acceptAllButton = document.getElementById("acceptAll");
  const rejectAllButton = document.getElementById("rejectAll");
  const form = document.getElementById("userPreferencesForm");
  const preferenceStatus = document.getElementById("preferenceStatus");

  // Load saved preferences from localStorage or default to all on
  let userPreferences = JSON.parse(localStorage.getItem("userPreferences")) || {
    necessary: true,
    analytics: false,
    functional: false,
    advertisement: false
  };

  // Update UI based on stored preferences
  document.getElementById("necessary").checked = userPreferences.necessary;
  document.getElementById("analytics").checked = userPreferences.analytics;
  document.getElementById("functional").checked = userPreferences.functional;
  document.getElementById("advertisement").checked = userPreferences.advertisement;

  // Handle Accept All button click
  acceptAllButton.addEventListener("click", () => {
    userPreferences = {
      necessary: true,
      analytics: true,
      functional: true,
      advertisement: true
    };
    updatePreferences();
  });

  // Handle Reject All button click
  rejectAllButton.addEventListener("click", () => {
    userPreferences = {
      necessary: true, // Necessary always on
      analytics: false,
      functional: false,
      advertisement: false
    };
    updatePreferences();
  });

  // Handle form submission (Save preferences)
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    userPreferences.analytics = document.getElementById("analytics").checked;
    userPreferences.functional = document.getElementById("functional").checked;
    userPreferences.advertisement = document.getElementById("advertisement").checked;

    updatePreferences();
  });

  // Function to save and update preferences
  function updatePreferences() {
    localStorage.setItem("userPreferences", JSON.stringify(userPreferences));
    preferenceStatus.innerHTML = "<p>Preferences saved successfully!</p>";
  }
});

