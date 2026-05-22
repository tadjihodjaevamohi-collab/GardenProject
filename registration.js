// PASSWORD TOGGLE
const toggle = document.getElementById("togglePassword");
const password = document.getElementById("password");

let error = document.querySelector('.error-line')
let userName = document.getElementById('userName')
let userPassword = document.getElementById('password')
let userEmail = document.getElementById('userEmail')
let logIn = document.querySelector('.login-btn')
let singUp = document.querySelector('.register-btn')

singUp.addEventListener('click', function(event) {
    event.preventDefault()

    error.innerHTML = '' // Clear previous messages

    if (!userName.value) {
        error.innerHTML = '<h4>Please enter your username</h4>'
        return
    }

    if (!userPassword.value) {
        error.innerHTML = '<h4>Please enter your password</h4>'
        return
    }

    if (!userEmail.value) {
        error.innerHTML = '<h4>Please enter your email</h4>'
        return
    }

    let userInfo = JSON.parse(localStorage.getItem('user'))
    if (userInfo && userName.value === userInfo.name) {
        error.innerHTML = '<h4>User already exists. Please login instead.</h4> <style>h4{color: #ce5555;}</style>'
        return
    }

    let user = {
        name: userName.value,
        password: userPassword.value,
        email: userEmail.value
    }
    localStorage.setItem('user', JSON.stringify(user))
    
    // Show success message and redirect to login page
    error.innerHTML = '<h4>Регистрация успешна! Перенаправление... 🌿</h4> <style>h4{color: #2e6f40; font-weight: 600;}</style>'
    setTimeout(() => {
        window.location.href = './enter.html'
    }, 1500)
})

logIn.addEventListener('click', (event) => {
  event.preventDefault()
  // Simply redirect to login page
  window.location.href = './enter.html'
})

toggle.addEventListener("click", () => {
  const type = password.type === "password" ? "text" : "password";
  password.type = type;
  toggle.textContent = type === "password" ? "👁️" : "🙈";
});

// SHOW REGISTER FIELDS (now handled in singUp listener)
// const registerBtn = document.getElementById("registerBtn");
// const extra = document.getElementById("registerExtra");

// registerBtn.addEventListener("click", () => {
//   extra.classList.toggle("active");
// });

// FLAG SELECT
const flags = document.querySelectorAll(".flag");

flags.forEach(flag => {
  flag.addEventListener("click", () => {
    flags.forEach(f => f.classList.remove("active"));
    flag.classList.add("active");
  });
});