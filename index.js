document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("form");
  const email_input = document.getElementById("email-input");
  const firstname_input = document.getElementById("firstname-input");
  const password_input = document.getElementById("password-input");
  const repeat_password_input = document.getElementById("repeat-password-input");
  const error_message = document.getElementById("error-message");
  const logoutBtn = document.getElementById("logoutBtn");

  // Logout logic
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      localStorage.removeItem("userLoggedIn");
      window.location.href = "login.html";
    });
  }

  // Protect home page
  if (
    window.location.pathname.endsWith("home.html") &&
    !localStorage.getItem("userLoggedIn")
  ) {
    window.location.href = "login.html";
  }
  // ✅ Listen for logout from another tab
  window.addEventListener("storage", (event) => {
    if (event.key === "userLoggedIn" && event.newValue === null) {
      window.location.href = "login.html";
    }
  });

  // Handle main auth forms
  if (form) {
    form.addEventListener("submit", (e) => {
      let errors = [];

      const isSignup = firstname_input && password_input && repeat_password_input;
      const isLogin = email_input && password_input && !firstname_input;
      const isForgotPassword = email_input && !password_input && !firstname_input;

      if (isSignup) {
        errors = getSignupFormErrors(
          firstname_input.value,
          email_input.value,
          password_input.value,
          repeat_password_input.value
        );
      } else if (isLogin) {
        errors = getLoginFormErrors(email_input.value, password_input.value);
      } else if (isForgotPassword) {
        errors = getForgotPasswordErrors(email_input.value);
      }

      if (errors.length > 0) {
        e.preventDefault();
        error_message.innerText = errors.join(". ");
      } else {
        e.preventDefault();
        if (isForgotPassword) {
          localStorage.setItem("resetEmail", email_input.value);
          window.location.href = "reset-password.html";
        } else {
          localStorage.setItem("userLoggedIn", "true");
          window.location.href = "home.html";
        }
      }
    });

    // Clear error styles when user types
    const allInputs = [
      firstname_input,
      email_input,
      password_input,
      repeat_password_input,
    ].filter(Boolean);
    allInputs.forEach((input) => {
      input.addEventListener("input", () => {
        input.parentElement.classList.remove("incorrect");
        error_message.innerText = "";
      });
    });
  }

  // Validation functions
  function getSignupFormErrors(firstname, email, password, repeatPassword) {
    const errors = [];
    if (!firstname.trim()) {
      errors.push("Firstname is required");
      firstname_input?.parentElement.classList.add("incorrect");
    }
    if (!email.trim()) {
      errors.push("Email is required");
      email_input?.parentElement.classList.add("incorrect");
    }
    if (!password.trim()) {
      errors.push("Password is required");
      password_input?.parentElement.classList.add("incorrect");
    }
    if (password.length < 8) {
      errors.push("Password must be at least 8 characters");
      password_input?.parentElement.classList.add("incorrect");
    }
    if (password !== repeatPassword) {
      errors.push("Passwords do not match");
      password_input?.parentElement.classList.add("incorrect");
      repeat_password_input?.parentElement.classList.add("incorrect");
    }
    return errors;
  }

  function getLoginFormErrors(email, password) {
    const errors = [];
    if (!email.trim()) {
      errors.push("Email is required");
      email_input?.parentElement.classList.add("incorrect");
    }
    if (!password.trim()) {
      errors.push("Password is required");
      password_input?.parentElement.classList.add("incorrect");
    }
    if (password.length < 8) {
        errors.push("Password must be at least 8 characters");
        password_input?.parentElement.classList.add("incorrect");
    }
    return errors;
  }

  function getForgotPasswordErrors(email) {
    const errors = [];
    const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    if (!email.trim()) {
      errors.push("Email is required");
      email_input?.parentElement.classList.add("incorrect");
    } else if (!emailPattern.test(email)) {
      errors.push("Invalid email format");
      email_input?.parentElement.classList.add("incorrect");
    }
    return errors;
  }

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
