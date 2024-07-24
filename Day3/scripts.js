document
  .getElementById("signupForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    var firstname = document.getElementById("firstname").value;
    var lastname = document.getElementById("lastname").value;
    var emailId = document.getElementById("emailId").value;
    var password = document.getElementById("password").value;
    var confirmpassword = document.getElementById("confirmpassword").value;

    if (password !== confirmpassword) {
      document.getElementById("message").textContent =
        "Passwords do not match.";
      return;
    }
    if (password.length <= 8) {
      document.getElementById("message").textContent =
        "Password must be at least 8 characters long.";
      return;
    }
    localStorage.setItem("emailId", emailId);
    localStorage.setItem("password", password);

    if (firstname && lastname && emailId && password && phoneno && gendertype) {
      alert("Signup successful!");
      window.location.href = "login.html";
    } else {
      document.getElementById("message").textContent =
        "Please fill out all fields.";
    }
  });
