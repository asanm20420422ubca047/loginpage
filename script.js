(function () {
  const card = document.getElementById("card");
  const form = document.getElementById("loginForm");
  const userInput = document.getElementById("username");
  const passInput = document.getElementById("password");
  const message = document.getElementById("message");
  const toggle = document.getElementById("toggle");

  // ---------- 3D tilt following the mouse ----------
  const MAX_TILT = 14; // degrees

  document.addEventListener("mousemove", (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 2;  // -1 .. 1
    const y = (e.clientY / window.innerHeight - 0.5) * 2; // -1 .. 1
    card.style.transform =
      "rotateY(" + x * MAX_TILT + "deg) rotateX(" + -y * MAX_TILT + "deg)";
  });

  document.addEventListener("mouseleave", () => {
    card.style.transform = "rotateY(0deg) rotateX(0deg)";
  });

  // ---------- Show / hide password ----------
  toggle.addEventListener("click", () => {
    const show = passInput.type === "password";
    passInput.type = show ? "text" : "password";
    toggle.textContent = show ? "Hide" : "Show";
    toggle.setAttribute("aria-label", show ? "Hide password" : "Show password");
  });

  // ---------- Login (demo only, front-end check) ----------
  function setMessage(text, type) {
    message.textContent = text;
    message.className = "message " + (type || "");
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const user = userInput.value.trim();
    const pass = passInput.value;

    if (!user || !pass) {
      setMessage("Please enter username and password.", "error");
      return;
    }

    // DEMO ONLY: real apps must check credentials on a server.
    if (user === "admin" && pass === "admin123") {
      setMessage("Login successful! Welcome, " + user + ".", "success");
    } else {
      setMessage("Invalid username or password.", "error");
      card.classList.remove("shake");
      void card.offsetWidth; // restart animation
      card.classList.add("shake");
    }
  });
})();
