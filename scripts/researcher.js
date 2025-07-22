// Fetch stats from researcher.json and update research-stats
// Manually set statistics for research-stats
// Manually set statistics for research-stats
document.querySelector('.stat-number.publications').textContent = '15+';
document.querySelector('.stat-number.citations').textContent = '250+';
document.querySelector('.stat-number.h-index').textContent = '8';

// Dynamically render publications from researcher.json
fetch('researcher.json')
	.then(response => response.json())
	.then(data => {
		const publicationsList = document.querySelector('.publications-list');
		if (publicationsList && Array.isArray(data.publications)) {
			publicationsList.innerHTML = '';
							data.publications.forEach(pub => {
								const item = document.createElement('div');
								item.className = 'publication-item';
								item.innerHTML = `
									<div class="pub-header">
										<h3>${pub.title}</h3>
										<span class="pub-year">${pub.year || ''}</span>
									</div>
									${pub.author ? `<p class=\"pub-authors\">${pub.author}</p>` : (pub.authors ? `<p class=\"pub-authors\">${pub.authors}</p>` : '')}
									<p class="pub-journal">${pub.journal || ''}</p>
								`;
								publicationsList.appendChild(item);
							});
		}
	});
