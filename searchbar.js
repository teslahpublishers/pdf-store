// ===========================
// TESLAH PUBLISHERS SEARCH LOGIC
// ===========================

// Book title database
const bookTitles = [
  "Production of Groundnut oil from Groundnut using Food Grade Ethanol",
  "Eating Banana: The Key to Healthy Living by Onashile Olumide A.",
  "Play to WIN all Lotto Games by Francesco Copeland",
  "Dr Pawpaw Herbal Miracles by Teslah Publishers",
  "Herbal Secrets for Longevity by Olumide Abimbola O.",
  "Natural Cure Remedies for Common Illnesses",
  "How to Build Wealth from Knowledge Publishing",
  "Understanding Lotto Queue Decoder Guide",
  "Foldback Method for Premier Lotto Numbers"
];

// === Placeholder behavior ===
function clearPlaceholder() {
  const input = document.getElementById('bookSearch');
  input.placeholder = '';
}

function restorePlaceholder() {
  const input = document.getElementById('bookSearch');
  if (input.value.trim() === '') {
    input.placeholder = 'Search book title';
  }
}

// === Main Search Function ===
function searchBooks() {
  const input = document.getElementById('bookSearch');
  const filter = input.value.toLowerCase();
  const list = document.getElementById('suggestionList');
  const rows = document.querySelectorAll('table tr');
  list.innerHTML = '';

  // Filter table rows
  rows.forEach((row, index) => {
    if (index === 0) return; // Skip header
    const cell = row.cells[0];
    if (cell && cell.textContent.toLowerCase().includes(filter)) {
      row.style.display = '';
    } else {
      row.style.display = filter ? 'none' : '';
    }
  });

  // Build suggestions
  if (filter === '') {
    list.style.display = 'none';
    return;
  }

  const suggestions = bookTitles.filter(title =>
    title.toLowerCase().includes(filter)
  );

  if (suggestions.length === 0) {
    list.style.display = 'none';
    return;
  }

  suggestions.forEach(title => {
    const li = document.createElement('li');
    li.textContent = title;
    li.onclick = () => {
      input.value = title;
      list.style.display = 'none';
      scrollToBook(title);
    };
    list.appendChild(li);
  });

  list.style.display = 'block';
}

// === Scroll + Highlight Matching Row ===
function scrollToBook(bookTitle) {
  const rows = document.querySelectorAll('table tr');
  let found = false;

  rows.forEach((row, index) => {
    if (index === 0) return;
    const cell = row.cells[0];
    if (cell && cell.textContent.toLowerCase().includes(bookTitle.toLowerCase())) {
      found = true;
      row.scrollIntoView({ behavior: 'smooth', block: 'center' });
      row.classList.add('highlight-row');
      setTimeout(() => row.classList.remove('highlight-row'), 2500);
    }
  });

  if (!found) {
    alert('No exact match found in the table.');
  }
}

// === Trigger scroll when pressing Enter ===
document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.getElementById('bookSearch');
  searchInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      const title = this.value.trim();
      if (title !== '') scrollToBook(title);
    }
  });

  // Hide suggestion box when clicking outside
  document.addEventListener('click', e => {
    if (!document.querySelector('.search-section').contains(e.target)) {
      document.getElementById('suggestionList').style.display = 'none';
    }
  });
});
