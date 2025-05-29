
const registerForm = document.getElementById("register-form");
const loginForm = document.getElementById("login-form");
const countrySelect = registerForm.country;
const citySelect = registerForm.city;

document.querySelectorAll(".tab").forEach((tab) => {
    tab.addEventListener("click", () => {
      document.querySelectorAll(".tab").forEach((t) => t.classList.remove("active"));
      document.querySelectorAll(".form").forEach((f) => f.classList.remove("active"));
      tab.classList.add("active");
      document.getElementById(`${tab.dataset.tab}-form`).classList.add("active");
    });
  });
  
  document.querySelectorAll(".toggle-eye").forEach((eye) => {
    eye.addEventListener("click", () => {
      const input = eye.previousElementSibling;
      input.type = input.type === "password" ? "text" : "password";
    });
  });
  
  const cities = {
    Україна: ["Київ", "Львів", "Чернівці"],
    Польща: ["Варшава", "Краків"],
    Німеччина: ["Берлін", "Франкфурт", "Мюнхен"]
  };
  
  for (const country in cities) {
    const option = document.createElement("option");
    option.value = country;
    option.textContent = country;
    countrySelect.appendChild(option);
  }
  
  countrySelect.addEventListener("change", () => {
    const selectedCountry = countrySelect.value;
    const cityList = cities[selectedCountry];
  
    citySelect.innerHTML = "";
    citySelect.disabled = !cityList;
  
    if (cityList) {
      cityList.forEach(city => {
        const option = document.createElement("option");
        option.value = city;
        option.textContent = city;
        citySelect.appendChild(option);
      });
    }
  });
  
  
  registerForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const isValid = validateRegistration();
    if (isValid) {
      alert("Реєстрація успішна!");
      registerForm.reset();
      citySelect.disabled = true;
      document.querySelectorAll(".form-group").forEach((group) => group.classList.remove("success"));
    }
  });
  
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const user = loginForm.username;
    const pass = loginForm.loginPassword;
    let valid = true;
  
    if (!user.value.trim()) {
      error(user, "Введіть ім'я користувача");
      valid = false;
    }
  
    if (pass.value.length < 8) {
      error(pass, "Введіть 8 символів");
      valid = false;
    }
  
    if (valid) {
      alert("Вхід успішний!");
      loginForm.reset();
    }
  });
  
  function validateRegistration() {
    const f = registerForm;
    let valid = true;
  
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const phoneRegex = /^\+380\d{9}$/;
    
    if (f.firstName.value.length < 3 || f.firstName.value.length > 15) {
      error(f.firstName, `Імʼя має бути від 3 до 15 символів`);
      valid = false;
    }

    if (f.lastName.value.length < 3 || f.lastName.value.length > 15) {
      error(f.lastName, `Прізвище має бути від 3 до 15 символів`);
      valid = false;
    }
  
    if (!emailRegex.test(f.email.value)) {
      error(f.email, "Некоректний email");
      valid = false;
    }
  
    if (f.password.value.length < 6) {
      error(f.password, "Пароль мінімум 6 символів");
      valid = false;
    }
  
    if (f.confirmPassword.value !== f.password.value) {
      error(f.confirmPassword, "Паролі не збігаються");
      valid = false;
    }
  
    if (!phoneRegex.test(f.phone.value)) {
      error(f.phone, "Телефон повинен починатися з +380 і мати 12 цифр");
      valid = false;
    }
  
    const dob = new Date(f.dob.value);
    const today = new Date();
    const age = today.getFullYear() - dob.getFullYear();
    if (dob > today || age < 12) {
      error(f.dob, "Вам має бути 12+ років і дата не з майбутнього");
      valid = false;
    }
  
    if (!f.sex.value) {
      error(f.sex, "Оберіть стать");
      valid = false;
    }
  
    if (!f.country.value) {
      error(f.country, "Оберіть країну");
      valid = false;
    }
  
    if (!f.city.value) {
      error(f.city, "Оберіть місто");
      valid = false;
    }
  
    return Boolean(valid);
  }
  
  function error(input, message) {
    const group = input.closest(".form-group");
    group.classList.add("error");
    group.classList.remove("success");
    group.querySelector("small").textContent = message;
  }
  