document.addEventListener("DOMContentLoaded", () => {

if (window.location.pathname.endsWith("reset-password.html")) {
    const form = document.getElementById("form");
    const passwordInput = document.getElementById("password-input");
    const repeatInput = document.getElementById("repeat-password-input");
    const errorMessage = document.getElementById("error-message");

    form?.addEventListener("submit", (e) => {
      e.preventDefault();

      const password = passwordInput.value.trim();
      const repeat = repeatInput.value.trim();
      let errors = [];

      // Reset previous styles and error messages
      passwordInput.parentElement.classList.remove("incorrect");
      repeatInput.parentElement.classList.remove("incorrect");
      errorMessage.innerText = "";

      console.log("Reset password attempt:", { password, repeat });

      if (!password) {
        errors.push("Password is required");
        passwordInput.parentElement.classList.add("incorrect");
      } else if (password.length < 8) {
        errors.push("Password must be at least 8 characters");
        passwordInput.parentElement.classList.add("incorrect");
      }

      if (!repeat) {
        errors.push("Confirmation password is required");
        repeatInput.parentElement.classList.add("incorrect");
      } else if (password !== repeat) {
        errors.push("Passwords do not match");
        passwordInput.parentElement.classList.add("incorrect");
        repeatInput.parentElement.classList.add("incorrect");
      }

      if (errors.length > 0) {
        console.log("Reset password errors:", errors);
        errorMessage.innerText = errors.join(". ");
        return errors;
      }

      // Simulate success
      console.log("Password reset successful");
      alert("Password reset successful (simulated).");
      localStorage.removeItem("resetEmail");
      window.location.href = "login.html";
    });
  }
});