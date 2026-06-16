
const filterBtns = document.querySelectorAll('.filter-btn');
const foodCards = document.querySelectorAll('.food-card');
const emptyState = document.getElementById('emptyState');
const emptyQuery = document.getElementById('emptyQuery');
const searchInput = document.getElementById('searchInput');

let activeCategory = 'all';

function applyFilters() {
  const query = searchInput.value.trim().toLowerCase();
  let visibleCount = 0;

  foodCards.forEach(card => {
    const cat = card.dataset.cat;
    const name = card.querySelector('h3')?.textContent.toLowerCase() || '';
    const desc = card.querySelector('p')?.textContent.toLowerCase() || '';

    const matchesCat = activeCategory === 'all' || cat === activeCategory;
    const matchesSearch = query === '' || name.includes(query) || desc.includes(query);

    if (matchesCat && matchesSearch) {
      card.classList.remove('hidden');
      visibleCount++;
    } else {
      card.classList.add('hidden');
    }
  });

  if (visibleCount === 0) {
    emptyState.style.display = 'block';
    emptyQuery.textContent = query || activeCategory;
  } else {
    emptyState.style.display = 'none';
  }
}

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    activeCategory = btn.dataset.cat;
    applyFilters();
  });
});

searchInput.addEventListener('input', applyFilters);

function resetSearch() {
  searchInput.value = '';
  activeCategory = 'all';
  filterBtns.forEach(b => b.classList.remove('active'));
  document.querySelector('.filter-btn[data-cat="all"]').classList.add('active');
  applyFilters();
}


document.querySelectorAll('.food-order-btn').forEach(btn => {
  btn.addEventListener('click', function() {
    const originalText = this.textContent;
    this.textContent = '✓ Added!';
    this.style.background = '#43a047';
    setTimeout(() => {
      this.textContent = originalText;
      this.style.background = '';
    }, 1800);
  });
});
