const form = document.querySelector(".containPassword");
const password1 = document.getElementsByName("password")[0];
const password2 = document.getElementsByName("password2")[0];
const verifyPassword = document.querySelector(".verify-password");

let canSubmit = true;

const handlePassword1 = (e) => {
  if (password1.value === password2.value) {
    verifyPassword.innerText = "";
    canSubmit = true;
  } else if (password2.value !== "" && password1.value !== password2.value) {
    verifyPassword.innerText = "Passwords do not match";
    canSubmit = false;
  } else if (password2.value === "") {
    verifyPassword.innerText = "";
  }
};

const handlePassword2 = (e) => {
  if (password1.value !== "") {
    if (password1.value !== password2.value) {
      verifyPassword.innerText = "Passwords do not match";
      canSubmit = false;
    } else {
      verifyPassword.innerText = "";
      canSubmit = true;
    }
  } else {
    password2.value = "";
    verifyPassword.innerText = "Please fill the boxes by order";
    canSubmit = false;
  }
};

const handleFormSubmit = (e) => {
  e.preventDefault();
  if (canSubmit) {
    form.submit();
  }
};

form.addEventListener("submit", handleFormSubmit); //prevent form submit if the two passwords do not match
password1.addEventListener("input", handlePassword1); //give each password input an event that checks whether two passwords match when input event happens
password2.addEventListener("input", handlePassword2);
