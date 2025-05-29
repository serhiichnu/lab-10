
const BASE_URL = 'https://randomuser.me/api/';

export async function fetchUsers(count = 30) {
  const url = `${BASE_URL}?results=${count}&nat=us,gb,ca,ua&seed=lab10`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('Помилка завантаження');
  const data = await res.json();
  return data.results;
}
