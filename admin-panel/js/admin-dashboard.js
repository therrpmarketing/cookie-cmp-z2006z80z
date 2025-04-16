document.addEventListener("DOMContentLoaded", () => {
  // Mock data — replace this later with fetch from localStorage / backend
  const mockConsentData = {
    total: 136,
    accepted: 88,
    rejected: 27,
    customized: 21,
  };

  // Update the DOM
  document.getElementById("total-consents").querySelector("p").textContent =
    mockConsentData.total;
  document.getElementById("accepted-consents").querySelector("p").textContent =
    mockConsentData.accepted;
  document.getElementById("rejected-consents").querySelector("p").textContent =
    mockConsentData.rejected;
  document.getElementById("customized-consents").querySelector("p").textContent =
    mockConsentData.customized;
});

