// Fetch stats from researcher.json and update research-stats
// Manually set statistics for research-stats
// Manually set statistics for research-stats
document.querySelector('.stat-number.publications').textContent = '17';
document.querySelector('.stat-number.citations').textContent = '327';
document.querySelector('.stat-number.h-index').textContent = '10';

// Dynamically render publications from researcher.json with search and filter
fetch('researcher.json')
	.then(response => {
		if (!response.ok) {
			throw new Error('Could not load researcher.json');
		}
		return response.json();
	})
	.then(data => {
		const publicationsList = document.querySelector('.publications-list');
		if (publicationsList && Array.isArray(data.publications)) {
			publicationsList.innerHTML = '';

			// Create search/filter UI
			const searchContainer = document.createElement('div');
			searchContainer.className = 'publication-search';
			searchContainer.innerHTML = `
				<input type="text" placeholder="Search publications..." class="search-input">
				<div class="search-filters">
					<button class="filter-btn active" data-year="all">All Years</button>
					<button class="filter-btn" data-year="2025">2025</button>
					<button class="filter-btn" data-year="2024">2024</button>
					<button class="filter-btn" data-year="2023">2023</button>
				</div>
			`;
			publicationsList.parentNode.insertBefore(searchContainer, publicationsList);

			// Add search styles
			const searchStyles = document.createElement('style');
			searchStyles.innerHTML = `
				.publication-search { margin-bottom: 2rem; text-align: center; }
				.search-input { width: 100%; max-width: 400px; padding: 1rem; border: 2px solid #e2e8f0; border-radius: 50px; font-size: 1rem; margin-bottom: 1rem; }
				.search-filters { display: flex; justify-content: center; gap: 1rem; flex-wrap: wrap; }
				.filter-btn { padding: 0.5rem 1rem; border: 2px solid #2563eb; background: transparent; color: #2563eb; border-radius: 25px; cursor: pointer; transition: all 0.3s ease; }
				.filter-btn.active, .filter-btn:hover { background: #2563eb; color: white; }
			`;
			document.head.appendChild(searchStyles);

			// Render publications
			let renderedItems = [];
			function renderPublications(publications) {
				publicationsList.innerHTML = '';
				publications.forEach(pub => {
					const item = document.createElement('div');
					item.className = 'publication-item';
					item.innerHTML = `
						<div class="pub-header">
							<h3>${pub.title}</h3>
							<span class="pub-year">${pub.year || ''}</span>
						</div>
						${pub.author ? `<p class=\"pub-authors\">${pub.author}</p>` : (pub.authors ? `<p class=\"pub-authors\">${pub.authors}</p>` : '')}
						${pub.journal ? `<p class=\"pub-journal\"><strong>Journal:</strong> ${pub.journal}</p>` : ''}
						${pub.volume ? `<span class=\"pub-volume\"><strong>Volume:</strong> ${pub.volume}</span>` : ''}
						${pub.number ? `<span class=\"pub-number\"><strong>Number:</strong> ${pub.number}</span>` : ''}
						${pub.pages ? `<span class=\"pub-pages\"><strong>Pages:</strong> ${pub.pages}</span>` : ''}
						${pub.publisher ? `<span class=\"pub-publisher\"><strong>Publisher:</strong> ${pub.publisher}</span>` : ''}
					`;
					publicationsList.appendChild(item);
				});
				renderedItems = Array.from(publicationsList.querySelectorAll('.publication-item'));
				// Add 'View All Publications' button if showing only 5
				if (publications.length === 5 && data.publications.length > 5) {
					const viewAllBtn = document.createElement('a');
					viewAllBtn.href = 'publications.html';
					viewAllBtn.className = 'btn btn-primary';
					viewAllBtn.textContent = 'View All Publications';
					viewAllBtn.style.display = 'block';
					viewAllBtn.style.margin = '2rem auto 0 auto';
					viewAllBtn.style.textAlign = 'center';
					publicationsList.appendChild(viewAllBtn);
				}
			}

			// Initial render: latest 5 publications
			renderPublications(data.publications.slice(0, 5));

			// Search/filter logic
			const searchInput = searchContainer.querySelector('.search-input');
			const filterBtns = searchContainer.querySelectorAll('.filter-btn');

			function filterPublications() {
				const searchTerm = searchInput.value.toLowerCase();
				const activeYear = searchContainer.querySelector('.filter-btn.active').dataset.year;
				let filtered = data.publications.filter(pub => {
					const title = pub.title ? pub.title.toLowerCase() : '';
					const authors = pub.author ? pub.author.toLowerCase() : (pub.authors ? pub.authors.toLowerCase() : '');
					const year = pub.year || '';
					const matchesSearch = title.includes(searchTerm) || authors.includes(searchTerm);
					const matchesYear = activeYear === 'all' || year === activeYear;
					return matchesSearch && matchesYear;
				});
				// If no filter/search, show only latest 5
				if (searchTerm === '' && (activeYear === 'all')) {
					filtered = data.publications.slice(0, 5);
				}
				renderPublications(filtered);
			}

			searchInput.addEventListener('input', filterPublications);
			filterBtns.forEach(btn => btn.addEventListener('click', function(e) {
				filterBtns.forEach(b => b.classList.remove('active'));
				this.classList.add('active');
				filterPublications();
			}));
		}
	})
	.catch(error => {
		const publicationsList = document.querySelector('.publications-list');
		if (publicationsList) {
			publicationsList.innerHTML = `<div class='pub-error'>Error loading publications: ${error.message}</div>`;
		}
	});
