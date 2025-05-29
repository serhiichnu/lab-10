
export function renderUsers(users) {
  const container = document.getElementById('user-list');
  container.innerHTML = '';
  if (users.length === 0) {
    container.innerHTML = '<p>Нічого не знайдено.</p>';
    return;
  }

  for (const user of users) {
    const card = document.createElement('div');
    card.className = 'user-card';
    card.innerHTML = `
      <img src="${user.picture.medium}" alt="${user.name.first}" />
      <h3>${user.name.first} ${user.name.last}</h3>
      <p>Вік: ${user.dob.age}</p>
      <p>Телефон: ${user.phone}</p>
      <p>Email: ${user.email}</p>
      <p>Локація: ${user.location.city}, ${user.location.country}</p>
    `;
    container.appendChild(card);
  }
}

export function renderPagination(totalPages, currentPage, onPageChange) {
  const container = document.getElementById('pagination');
  container.innerHTML = '';
  for (let i = 1; i <= totalPages; i++) {
    const btn = document.createElement('button');
    btn.textContent = i;
    btn.className = i === currentPage ? 'active' : '';
    btn.addEventListener('click', () => onPageChange(i));
    container.appendChild(btn);
  }
}

export function showError(msg) {
  const container = document.getElementById('error');
  container.textContent = msg;
  container.classList.add('visible');
}
