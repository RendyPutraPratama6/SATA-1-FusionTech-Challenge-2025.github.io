// Simulasi data akun yang terdaftar
const registeredUsers = JSON.parse(localStorage.getItem("registeredUsers")) || [
  { username: "admin", password: "123456" },
  { username: "user1", password: "password" },
];

// Fungsi untuk menangani proses login
function handleLogin(event) {
  event.preventDefault();

  const usernameInput = document.getElementById("username").value;
  const passwordInput = document.getElementById("password").value;
  const errorMessage = document.getElementById("error-message");

  // Periksa apakah username dan password cocok dengan data terdaftar
  const user = registeredUsers.find(
    (user) => user.username === usernameInput && user.password === passwordInput
  );

  if (user) {
    alert("Login berhasil! Anda akan diarahkan ke halaman utama.");
    window.location.href = "../beranda/index.html"; // klik login
  } else {
    errorMessage.textContent = "Username atau password salah!";
    errorMessage.style.color = "red";
  }
}

// Fungsi untuk menangani proses pendaftaran
function handleRegister(event) {
  event.preventDefault();

  const username = document.getElementById("register-username").value;
  const email = document.getElementById("register-email").value;
  const password = document.getElementById("register-password").value;
  const confirmPassword = document.getElementById(
    "register-confirm-password"
  ).value;

  if (password !== confirmPassword) {
    alert("Password dan konfirmasi password tidak cocok!");
    return;
  }

  const newUser = { username, email, password };
  registeredUsers.push(newUser);
  localStorage.setItem("registeredUsers", JSON.stringify(registeredUsers));

  alert("Pendaftaran berhasil! Anda akan diarahkan ke halaman login.");
  window.location.href = "login.html";
}

// Fungsi untuk menangani proses lupa password
function handleForgotPassword(event) {
  event.preventDefault();

  const emailInput = document.getElementById("forgot-password-email").value;
  const message = document.getElementById("forgot-password-message");

  const user = registeredUsers.find((user) => user.email === emailInput);

  if (user) {
    message.textContent = `Password Anda adalah: ${user.password}`;
    message.style.color = "green";
  } else {
    message.textContent = "Email tidak ditemukan!";
    message.style.color = "red";
  }
}

// Tambahkan event listener ke form login, register, dan forgot password
document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("login-form");
  if (loginForm) {
    loginForm.addEventListener("submit", handleLogin);
  }

  const registerForm = document.getElementById("register-form");
  if (registerForm) {
    registerForm.addEventListener("submit", handleRegister);
  }

  const forgotPasswordForm = document.getElementById("forgot-password-form");
  if (forgotPasswordForm) {
    forgotPasswordForm.addEventListener("submit", handleForgotPassword);
  }
});
