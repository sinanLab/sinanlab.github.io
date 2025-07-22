// Fetch stats from researcher.json and update research-stats
fetch('researcher.json')
  .then(response => response.json())
  .then(data => {
    const publicationsEl = document.querySelector('.stat-number.publications');
    const citationsEl = document.querySelector('.stat-number.citations');
    const hIndexEl = document.querySelector('.stat-number.h-index');

    publicationsEl.textContent = data.publications_count;
    citationsEl.textContent = data.citations;
    hIndexEl.textContent = data.h_index;

    // Trigger counter animation after stats are set
    if (typeof animateCounter === 'function') {
      const pubNum = parseInt(data.publications_count.replace(/\D/g, '')) || 0;
      const citNum = parseInt(data.citations.replace(/\D/g, '')) || 0;
      const hNum = parseInt(data.h_index.replace(/\D/g, '')) || 0;

      animateCounter(publicationsEl, pubNum);
      animateCounter(citationsEl, citNum);
      animateCounter(hIndexEl, hNum);
    }
  });
