const captchaTextBox = document.querySelector(".captcha_box input");
const refreshButton = document.querySelector(".refresh_button");
const captchaInputBox = document.querySelector(".captcha_input input");
const message = document.querySelector(".message");
const submitButton = document.querySelector(".button");

let captchaText = null;

const generateCaptcha = () => {
  const randomString = Math.random().toString(36).substring(2, 7);
  const randomStringArray = randomString.split("");
  const changeString = randomStringArray.map((char) =>
    Math.random() > 0.5 ? char.toUpperCase() : char
  );
  captchaText = changeString.join("    ");
  captchaTextBox.value = captchaText;
};

const refreshBtnClick = () => {
  captchaInputBox.value = "";
  message.classList.remove("active");

  refreshButton.innerHTML = '<div class="loader"></div> ';
  setTimeout(() => {
    refreshButton.innerHTML = "";
  }, 200);
  setTimeout(() => {
    generateCaptcha();
    captchaKeyUpValidate();
  }, 210);
};

const captchaKeyUpValidate = () => {
  submitButton.classList.toggle("disabled", !captchaInputBox.value);
};

const submitBtnClick = () => {
  captchaText = captchaText
    .split("")
    .filter((char) => char !== " ")
    .join("");
  message.classList.add("active");
  if (captchaInputBox.value === captchaText) {
    message.innerText = "Entered captcha is correct";
    message.style.color = "#826afb";
  } else {
    message.innerText = "Entered captcha is not correct";
    message.style.color = "#FF2525";
  }
};

refreshButton.addEventListener("click", refreshBtnClick);
captchaInputBox.addEventListener("keyup", captchaKeyUpValidate);
submitButton.addEventListener("click", submitBtnClick);

generateCaptcha();
