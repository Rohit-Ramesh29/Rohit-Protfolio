document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector(".contact-form");

  form.addEventListener("submit", function (e) {
    e.preventDefault(); // Prevent default reload

    const formData = new FormData(form);

    fetch(form.action, {
      method: "POST",
      body: formData,
      headers: {
        Accept: "application/json",
      },
    }).then(response => {
      if (response.ok) {
        alert("✅ Message Sent Successfully!");
        form.reset();
      } else {
        alert("❌ Something went wrong. Please try again.");
      }
    }).catch(() => {
      alert("❌ Network error. Please try again.");
    });
  });
});



// Disable right-click
document.addEventListener("contextmenu", function (e) {
  e.preventDefault();
});

// Disable Ctrl+U and F12
document.addEventListener("keydown", function (e) {
  if (
    (e.ctrlKey && e.key === "u") || // Ctrl+U
    (e.ctrlKey && e.shiftKey && e.key === "I") || // Ctrl+Shift+I
    (e.ctrlKey && e.shiftKey && e.key === "J") || // Ctrl+Shift+J
    (e.ctrlKey && e.key === "s") || // Ctrl+S
    (e.key === "F12") // F12
  ) {
    e.preventDefault();
  }
});



// Show fade overlay function
function showOverlay(message) {
  const overlay = document.getElementById("no-right-click-overlay");
  overlay.querySelector("p").textContent = message;
  overlay.style.display = "flex";

  setTimeout(() => {
    overlay.style.display = "none";
  }, 2500);
}

// Block right-click
document.addEventListener("contextmenu", function (e) {
  e.preventDefault();
  showOverlay("🚫 Right-click is disabled on this site!");
});

// Block view source, inspect, etc.
document.addEventListener("keydown", function (e) {
  if (
    (e.ctrlKey && e.key.toLowerCase() === "u") ||         // Ctrl+U
    (e.ctrlKey && e.key.toLowerCase() === "s") ||         // Ctrl+S
    (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === "i") || // Ctrl+Shift+I
    (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === "j") || // Ctrl+Shift+J
    (e.key === "F12")
  ) {
    e.preventDefault();
    showOverlay("🚫 Inspect and view source are disabled!");
  }
});
