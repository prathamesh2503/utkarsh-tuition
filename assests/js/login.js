document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.querySelector("#login-form");
  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const emailInput = document.querySelector("#email");
    const passwordInput = document.querySelector("#password");
    email = emailInput.value.trim();
    password = passwordInput.value.trim();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    if (email === "") {
      alert("Empty value is not allowed for email!");
      emailInput.focus();
      return;
    }
    if (!emailPattern.test(email)) {
      alert(
        "Empty value is not allowed for email. Input correct format of email id!"
      );
      emailInput.focus();
      return;
    }

    if (password === "") {
      alert("Empty value is not allowed for password!");
      passwordInput.focus();
      return;
    }

    if (!passwordPattern.test(password)) {
      alert(`Input correct format of password!
        At least one lowercase letter
        At least one uppercase letter
        At least one digit
        At least one special character (e.g., !@#$%^&*)
        Minimum 8 characters`);
      passwordInput.focus();
      return;
    }

    const data = JSON.parse(localStorage.getItem("registrationData"));

    if (data.email === email && data.confirmPassword === password) {
      window.location.href = "dashboard.html";
    } else {
      alert("You have entered wrong credentials!");
    }
  });
});
