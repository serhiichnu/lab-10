import { initAuth, isLoggedIn, logout } from './auth.js';
import { fetchUsers } from './api.js';
import { setupFilterListeners, applyFilters } from './filters.js';
import { renderUsers, renderPagination, showError } from './ui.js';

let allUsers = [];
let currentPage = 1;
const USERS_PER_PAGE = 10;

function displayPage(page) {
  const filtered = applyFilters(allUsers);
  const totalPages = Math.ceil(filtered.length / USERS_PER_PAGE);
  currentPage = Math.max(1, Math.min(page, totalPages));
  const start = (currentPage - 1) * USERS_PER_PAGE;
  const pageUsers = filtered.slice(start, start + USERS_PER_PAGE);

  renderUsers(pageUsers);
  renderPagination(totalPages, currentPage, displayPage);
}

function showMain() {
  document.getElementById('auth').style.display = 'none';
  document.getElementById('main-container').style.display = 'block';
}

function showAuth() {
  document.getElementById('auth').style.display = 'block';
  document.getElementById('main-container').style.display = 'none';
}

async function startApp() {
  try {
    allUsers = await fetchUsers(50);
    displayPage(1);
  } catch (err) {
    showError(err.message || "Помилка при завантаженні користувачів.");
  }
}

document.getElementById('logout-btn').addEventListener('click', () => {
  logout();
  showAuth();
});

setupFilterListeners(() => displayPage(1));

// Таб-перемикач для авторизації / реєстрації
document.querySelectorAll(".tab").forEach((tab) => {
  tab.addEventListener("click", () => {
    document.querySelectorAll(".tab").forEach((t) => t.classList.remove("active"));
    document.querySelectorAll(".form").forEach((f) => f.classList.remove("active"));
    tab.classList.add("active");
    document.getElementById(`${tab.dataset.tab}-form`).classList.add("active");
  });
});

if (isLoggedIn()) {
  showMain();
  startApp();
} else {
  initAuth(() => {
    showMain();
    startApp();
  });
}
