import signin from "./controllers/signin.js";
const freaze = document.getElementById("freaze");
const alertPlaceholder = document.getElementById("liveAlertPlaceholder");
const validateSignInForm = () => {
  const email = document.getElementById("floatingInput");
  const emailerr = document.getElementById("emailerr");
  const password = document.getElementById("floatingPassword");
  const passworderr = document.getElementById("Passworderr");

  let isValid = true;

  // Email validation
  if (!email.value) {
    emailerr.innerText = "Email is required.";
    isValid = false;
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
    emailerr.innerText = "Invalid email address.";
    isValid = false;
  } else {
    emailerr.innerText = "";
  }

  // Password validation
  if (!password.value) {
    passworderr.innerText = "Password is required.";
    isValid = false;
  } else if (password.value.length < 8) {
    passworderr.innerText = "Password must be at least 8 characters.";
    isValid = false;
  } else {
    passworderr.innerText = "";
  }

  return isValid;
};

document.getElementById("signin").addEventListener("click", async () => {
  if (!validateSignInForm()) return;
  freaze.style.display = "flex";
  const email = document.getElementById("floatingInput").value;
  const password = document.getElementById("floatingPassword").value;
  
  const signinForm = document.getElementById("signin-form");

  // Hide the form and show the spinner
  signinForm.style.display = "none";
 

  try {
    const response = await signin(email, password);

    if (response.status === 200) {
      const data = await response.json();
      console.log(data);

      localStorage.setItem("token", data.token);
      window.location.href = "./index.html";
    } else {
      const error = await response.json();

      alertPlaceholder.innerHTML = `
        <div class="alert alert-danger">${error.message}</div>
      `;
    }
  } catch (error) {

    alertPlaceholder.innerHTML = `
      <div class="alert alert-danger">Something went wrong. Please try again later.</div>
    `;
    console.error("Error during login:", error);

    
  } finally {
    signinForm.style.display = "block";
    freaze.style.display = "none";
  }
});
