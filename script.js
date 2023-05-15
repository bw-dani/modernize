const url = "https://formsws-hilstaging-com-0adj9wt8gzyq.runscope.net/solar";

const form = document.getElementById("solar-form");
const nameInput = document.getElementById("name");
const phoneInput = document.getElementById("phone");
const emailInput = document.getElementById("email");
const submitForm = document.getElementById("submit-button");
const error = document.getElementById("error-message");

// Phone mask for US format
phoneInput.addEventListener("input", (e) => {
  const input = e.target.value.replace(/\D/g, "").substring(0, 10);
  const areaCode = input.substring(0, 3);
  const middle = input.substring(3, 6);
  const last = input.substring(6, 10);

  if (input.length > 6) {
    e.target.value = `(${areaCode}) ${middle}-${last}`;
  } else if (input.length > 3) {
    e.target.value = `(${areaCode}) ${middle}`;
  } else if (input.length > 0) {
    e.target.value = `(${areaCode}`;
  }
});

function setInvalidInput(input, message) {
  input.style.borderColor = "#D50303";
  error.textContent = message;
}

function clearErrors() {
  nameInput.style.borderColor = "";
  phoneInput.style.borderColor = "";
  emailInput.style.borderColor = "";
  error.textContent = "";
}

function validateForm() {
  clearErrors();

  if (nameInput.value === "" || nameInput.value.length < 2) {
    setInvalidInput(
      nameInput,
      "Please enter a name with at least 2 characters"
    );
  }

  if (phoneInput.value === "") {
    setInvalidInput(phoneInput, "Please enter a phone number");
  } else if (phoneInput.validity.valid === false) {
    setInvalidInput(phoneInput, "Please enter a valid phone number");
  }

  if (emailInput.value === "") {
    setInvalidInput(emailInput, "Please enter an email address");
  } else if (emailInput.validity.valid === false) {
    setInvalidInput(
      emailInput,
      "Please enter a valid email address (e.g. name@example.com)"
    );
  }
  if (
    nameInput.validity.valid &&
    phoneInput.validity.valid &&
    emailInput.validity.valid
  ) {
    // Disable submit button and change text
    submitForm.disabled = true;
    submitForm.textContent = "Submitted";

    // Submit data via AJAX
    const formData = new FormData(form);
    const data = {};
    for (const [key, value] of formData.entries()) {
      data[key] = value;
    }

    const xhr = new XMLHttpRequest();
    xhr.open("POST", url);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(JSON.stringify(data));
    xhr.onload = () => {
      if (xhr.status === 200) {
        submitForm.innerHTML = "Submitted";
        submitForm.disabled = true;
      } else {
        alert("Something went wrong. Please try again later.");
      }
    };
  }
}

submitForm.addEventListener("click", (e) => {
  e.preventDefault();
  validateForm();
});
