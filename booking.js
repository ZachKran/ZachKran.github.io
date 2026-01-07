// >>> Replace with your real destination email (e.g., "you@example.com")
const RECIPIENT_EMAIL = "rootly.web@gmail.com";

function buildMailto({ name, email, phone, message }) {
  const subject = encodeURIComponent(`Booking request from ${name}`);
  const bodyLines = [
    `Name: ${name}`,
    `Email: ${email}`,
    phone ? `Phone: ${phone}` : ``,
    `Message:`,
    message || `(No message provided)`,
  ].filter(Boolean);
  const body = encodeURIComponent(bodyLines.join("\r\n"));
  return `mailto:${encodeURIComponent(
    RECIPIENT_EMAIL
  )}?subject=${subject}&body=${body}`;
}

function setStatus(text, kind) {
  const el = document.getElementById("booking-status");
  el.textContent = text;
  el.className = `status${kind ? " " + kind : ""}`;
}

function onSubmit(e) {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const message = document.getElementById("message").value.trim();

  if (!name || !email) {
    setStatus("Please fill in your name and email.", "error");
    return;
  }

  setStatus("Opening your email app…", "sending");

  const mailtoLink = buildMailto({ name, email, phone, message });

  // Open mail client in a new tab/window without leaving this page
  const a = document.createElement("a");
  a.href = mailtoLink;
  a.target = "_blank";
  a.rel = "noopener noreferrer";
  document.body.appendChild(a);
  a.click();
  a.remove();

  // Keep the filled form on screen; if you want to reset it, uncomment:
  // document.getElementById("booking-form").reset();

  // Give friendly confirmation that we tried to open the mail app
  setStatus(
    "If a compose window didn’t open, please ensure you have a default mail app configured.",
    "success"
  );
}

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("booking-form").addEventListener("submit", onSubmit);
});
