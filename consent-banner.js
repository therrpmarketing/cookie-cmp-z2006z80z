(function () {
  const password = prompt("Enter password to test CMP:");
  if (password !== "cmpSecret2024") {
    alert("Access Denied");
    return;
  }

  // Load CSS
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = "https://yourusername.github.io/cookie-cmp-z2006z80z/style.css";
  document.head.appendChild(link);

  // Inject CMP Banner
  const banner = document.createElement("div");
  banner.id = "cmp-banner";
  banner.innerHTML = `
    <div class="cmp-overlay">
      <div class="cmp-modal">
        <h3>We respect your privacy</h3>
        <p>This website uses cookies to enhance user experience and analyze traffic.</p>

        <div class="cmp-buttons">
          <button id="cmp-accept-all">Accept All</button>
          <button id="cmp-reject-all">Reject All</button>
          <button id="cmp-customize">Customize</button>
        </div>

        <div id="cmp-preferences" style="display:none;">
          <h4>Manage Preferences</h4>
          <label><input type="checkbox" checked disabled> Necessary (Always Active)</label><br>
          <label><input type="checkbox" id="cmp-functional"> Functional</label><br>
          <label><input type="checkbox" id="cmp-analytics"> Analytics</label><br>
          <label><input type="checkbox" id="cmp-ads"> Advertisement</label><br>

          <div class="cmp-buttons">
            <button id="cmp-save">Save Preferences</button>
            <button id="cmp-accept-custom">Accept All</button>
            <button id="cmp-reject-custom">Reject All</button>
          </div>
        </div>
      </div>
    </div>
  `;

  document.body.appendChild(banner);

  // Consent Mode function
  function updateConsent(ad, analytics) {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: "default_consent",
      "default_consent": {
        ad_storage: ad,
        analytics_storage: analytics
      }
    });
  }

  // Button Events
  document.getElementById("cmp-accept-all").onclick = () => {
    updateConsent("granted", "granted");
    banner.remove();
  };

  document.getElementById("cmp-reject-all").onclick = () => {
    updateConsent("denied", "denied");
    banner.remove();
  };

  document.getElementById("cmp-customize").onclick = () => {
    document.getElementById("cmp-preferences").style.display = "block";
  };

  document.getElementById("cmp-save").onclick = () => {
    const ad = document.getElementById("cmp-ads").checked ? "granted" : "denied";
    const analytics = document.getElementById("cmp-analytics").checked ? "granted" : "denied";
    updateConsent(ad, analytics);
    banner.remove();
  };

  document.getElementById("cmp-accept-custom").onclick = () => {
    document.getElementById("cmp-functional").checked = true;
    document.getElementById("cmp-analytics").checked = true;
    document.getElementById("cmp-ads").checked = true;
  };

  document.getElementById("cmp-reject-custom").onclick = () => {
    document.getElementById("cmp-functional").checked = false;
    document.getElementById("cmp-analytics").checked = false;
    document.getElementById("cmp-ads").checked = false;
  };
})();
