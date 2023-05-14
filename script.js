const form = document.getElementById('solar-form');
const nameInput = document.getElementById('name');
const phoneInput = document.getElementById('phone');
const emailInput = document.getElementById('email');
const submitForm = document.getElementById('submit-button');

// Phone mask for US format
phoneInput.addEventListener("input", (e) => {
  const input = e.target.value.replace(/\D/g, "").substring(0, 10); 
  const areaCode = input.substring(0, 3);
  const middle = input.substring(3, 6);
  const last = input.substring(6, 10);

  if (input.length > 6) {
    e.target.value = `(${areaCode}) ${middle}-${last}`;
  }
  else if (input.length > 3) {
    e.target.value = `(${areaCode}) ${middle}`;
  }
  else if (input.length > 0) {
    e.target.value = `(${areaCode}`;
  }
});