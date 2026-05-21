const toggle = document.getElementById("togglePassword");
const password = document.getElementById("password");

toggle.addEventListener("click", () => {
  const type = password.getAttribute("type") === "password" ? "text" : "password";
  password.setAttribute("type", type);

  toggle.textContent = type === "password" ? "👁️" : "🙈";
});

let error = document.querySelector('.error-line')
let userName = document.getElementById('userName')
let userPassword = document.getElementById('password')
let logIn = document.querySelector('.login-btn')
let singUp = document.querySelector('.register-btn')

singUp.addEventListener('click', function() {
    window.location.href = './registration.html'
})
        
            
    logIn.addEventListener('click', function() {
    error.innerHTML = '' // Clear previous messages
    if (!userName.value || !userPassword.value) {
        error.innerHTML = '<h4>Please fill in all fields</h4>'
        return
    }

    let userInfo = JSON.parse(localStorage.getItem('user'))
    if (userInfo && userName.value === userInfo.name && userPassword.value === userInfo.password) {
        window.location.href = './index.html'
    } else {
        error.innerHTML = '<h4>Invalid username or password. Please sign up first.</h4> <style>h4{color: #ce5555;}</style>'
    }
})