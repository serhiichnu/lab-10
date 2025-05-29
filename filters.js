
let filters = {
  query: '',
  sort: 'name-asc'
};

export function setupFilterListeners(callback) {
  document.getElementById('search-input').addEventListener('input', (e) => {
    filters.query = e.target.value.toLowerCase();
    callback();
  });

  document.getElementById('sort-select').addEventListener('change', (e) => {
    filters.sort = e.target.value;
    callback();
  });
}

export function applyFilters(users) {
  let result = [...users];

  if (filters.query) {
    result = result.filter(user =>
      user.name.first.toLowerCase().includes(filters.query) ||
      user.name.last.toLowerCase().includes(filters.query)
    );
  }

  result.sort(getSortFunction(filters.sort));
  return result;
}

function getSortFunction(type) {
  switch (type) {
    case 'name-asc': return (a, b) => a.name.first.localeCompare(b.name.first);
    case 'name-desc': return (a, b) => b.name.first.localeCompare(a.name.first);
    case 'age-asc': return (a, b) => a.dob.age - b.dob.age;
    case 'age-desc': return (a, b) => b.dob.age - a.dob.age;
    case 'date-asc': return (a, b) => new Date(a.registered.date) - new Date(b.registered.date);
    case 'date-desc': return (a, b) => new Date(b.registered.date) - new Date(a.registered.date);
    default: return () => 0;
  }
}
