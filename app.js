// app.js - Complete Code
let fuse; // Fuse.js search instance
let originalPublications = []; // Store original publications

// Initialize when page loads
document.addEventListener('DOMContentLoaded', () => {
    // Load publications data
    fetch('researcher.json')
        .then(response => response.json())
        .then(data => {
            originalPublications = data.publications; // Save original list
            renderPublications(originalPublications);
            initializeSearch(originalPublications);
        })
        .catch(error => console.error('Error loading data:', error));

    // Initialize citation chart
    initializeCitationChart();

    // Setup reset button click handler
    document.getElementById('resetButton').addEventListener('click', handleReset);
});

// Render publications to the page
function renderPublications(publications) {
    const container = document.getElementById('publicationList');
    container.innerHTML = publications.slice(0, 3).map(pub => `
        <div class="publication">
            <h3>${pub.title}</h3>
            <p class="journal">${pub.journal} • ${pub.year}</p>
            ${pub.doi ? `<a href="https://doi.org/${pub.doi}" class="doi-link" target="_blank">View Publication</a>` : ''}
            ${pub.abstract ? `<p class="abstract">${pub.abstract.substring(0, 150)}...</p>` : ''}
        </div>
    `).join('');
}

// Initialize search functionality
function initializeSearch(publications) {
    const searchBox = document.getElementById('searchBox');
    const resetButton = document.getElementById('resetButton');

    // Configure Fuse.js search
    fuse = new Fuse(publications, {
        keys: ['title', 'journal', 'abstract'],
        threshold: 0.3
    });

    // Handle search input
    searchBox.addEventListener('input', (e) => {
        const searchTerm = e.target.value.trim();
        
        if (searchTerm.length > 0) {
            // Show reset button and filter results
            resetButton.style.display = 'inline-block';
            const results = fuse.search(searchTerm);
            renderPublications(results.map(result => result.item));
        } else {
            // Hide reset button and show all publications
            resetButton.style.display = 'none';
            renderPublications(originalPublications);
        }
    });
}

// Handle reset button click
function handleReset(e) {
    e.preventDefault();
    const searchBox = document.getElementById('searchBox');
    const resetButton = document.getElementById('resetButton');
    
    // Clear search and reset display
    searchBox.value = '';
    resetButton.style.display = 'none';
    renderPublications(originalPublications);
}

// Initialize citation chart
function initializeCitationChart() {
    const ctx = document.getElementById('citationChart').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['2020', '2021', '2022', '2023', '2024', '2025'],
            datasets: [{
                label: 'Citations Per Year',
                data: [1, 11, 62, 96, 109, 15],
                borderColor: '#3498db',
                tension: 0.4,
                fill: false
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Number of Citations'
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Year'
                    }
                }
            }
        }
    });
}

