// public/js/script.js

const quoteText = document.getElementById('quoteText');
const quoteAuthor = document.getElementById('quoteAuthor');
const newQuoteBtn = document.getElementById('newQuoteBtn');
const copyBtn = document.getElementById('copyBtn');
const tweetBtn = document.getElementById('tweetBtn');
const themeSelect = document.getElementById('themeSelect');
const categorySelect = document.getElementById('categorySelect');
const searchInput = document.getElementById('searchInput');
const loader = document.getElementById('loader');

let currentQuote = null;

// --- Helpers ---
function showLoader(on = true) {
  loader.style.display = on ? 'block' : 'none';
  quoteText.style.opacity = on ? 0.3 : 1;
  quoteAuthor.style.opacity = on ? 0.3 : 1;
}

function displayQuote(q) {
  currentQuote = q;
  quoteText.style.opacity = 0;
  quoteAuthor.style.opacity = 0;
  setTimeout(() => {
    // some quotes from API may include newlines — normalize
    const text = (q.content || q.text || q.q || q.quote || '').trim();
    const author = (q.author || q.a || q.creator || '').trim();
    quoteText.textContent = text ? `"${text}"` : '—';
    quoteAuthor.textContent = author ? `— ${author}` : '— Unknown';
    quoteText.style.opacity = 1;
    quoteAuthor.style.opacity = 1;
  }, 160);
}

// --- Quotable API endpoints ---
const QUOTABLE_RANDOM = (tag) => tag ? `https://api.quotable.io/random?tags=${encodeURIComponent(tag)}` : 'https://api.quotable.io/random';
const QUOTABLE_TAGS = 'https://api.quotable.io/tags';
const QUOTABLE_SEARCH = (query, limit = 1) => `https://api.quotable.io/quotes?query=${encodeURIComponent(query)}&limit=${limit}`;

// fetch tags (categories)
async function loadTags() {
  try {
    const res = await fetch(QUOTABLE_TAGS);
    const tags = await res.json();
    // tags is array of objects { _id, name, slug, ... } - we'll use 'name' or 'slug'
    // sort by name
    tags.sort((a,b) => a.name.localeCompare(b.name));
    tags.forEach(t => {
      const opt = document.createElement('option');
      // use slug as tag param (preferred by API)
      opt.value = t.slug || t.name;
      opt.textContent = t.name.charAt(0).toUpperCase() + t.name.slice(1);
      categorySelect.appendChild(opt);
    });
  } catch (err) {
    console.error('Failed to load tags', err);
  }
}

// fetch random quote (respect tag)
async function fetchRandom(tag = '') {
  try {
    showLoader(true);
    const url = QUOTABLE_RANDOM(tag);
    const res = await fetch(url);
    if (!res.ok) throw new Error('No quote');
    const data = await res.json(); // object with content, author, tags...
    showLoader(false);
    displayQuote(data);
  } catch (err) {
    console.error(err);
    showLoader(false);
    displayQuote({ content: 'Failed to fetch quote. Try again.', author: '' });
  }
}

// search quotes by query using Quotable search endpoint
async function searchQuote(query) {
  try {
    showLoader(true);
    const url = QUOTABLE_SEARCH(query, 1);
    const res = await fetch(url);
    if (!res.ok) throw new Error('Search failed');
    const data = await res.json(); // { count, results: [] }
    showLoader(false);
    if (data.count && data.results && data.results.length > 0) {
      displayQuote(data.results[0]);
    } else {
      displayQuote({ content: 'No quotes found for your search.', author: '' });
    }
  } catch (err) {
    console.error(err);
    showLoader(false);
    displayQuote({ content: 'Search failed. Try again.', author: '' });
  }
}

// --- Button handlers ---
newQuoteBtn.addEventListener('click', async () => {
  const query = searchInput.value.trim();
  const tag = categorySelect.value;
  if (query.length > 0) {
    await searchQuote(query);
  } else {
    await fetchRandom(tag);
  }
});

copyBtn.addEventListener('click', async () => {
  if (!currentQuote) return;
  const text = `"${currentQuote.content || currentQuote.text || currentQuote.q || ''}" — ${currentQuote.author || currentQuote.a || ''}`;
  try {
    await navigator.clipboard.writeText(text);
    copyBtn.innerHTML = '<i class="fa fa-check"></i> Copied';
    setTimeout(() => copyBtn.innerHTML = '<i class="fa fa-copy"></i> Copy', 1400);
  } catch (err) {
    console.error('Copy failed', err);
  }
});

tweetBtn.addEventListener('click', () => {
  if (!currentQuote) return;
  const text = `"${currentQuote.content || currentQuote.text || currentQuote.q || ''}" — ${currentQuote.author || currentQuote.a || ''}`;
  const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`;
  window.open(url, '_blank');
});

// theme select
themeSelect.addEventListener('change', (e) => {
  const val = e.target.value || 'light';
  document.body.className = `theme-${val}`;
  localStorage.setItem('quoteTheme', val);
});

// allow Enter to trigger search/new quote
searchInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    newQuoteBtn.click();
  }
});

// initial load
(async function init() {
  const saved = localStorage.getItem('quoteTheme') || 'light';
  themeSelect.value = saved;
  document.body.className = `theme-${saved}`;

  await loadTags();          // populate categories
  await fetchRandom();       // initial random quote
})();
