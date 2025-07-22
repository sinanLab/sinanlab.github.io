// Fetch stats from researcher.json and update research-stats
fetch('researcher.json')
  .then(response => response.json())
  .then(data => {
    document.querySelector('.stat-number.publications').textContent = data.publications_count;
    document.querySelector('.stat-number.citations').textContent = data.citations;
    document.querySelector('.stat-number.h-index').textContent = data.h_index;
  });
