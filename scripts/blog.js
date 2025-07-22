// Blog-specific JavaScript functionality

document.addEventListener('DOMContentLoaded', function() {
    initializeBlogFeatures();
});

function initializeBlogFeatures() {
    setupCategoryFilters();
    setupBlogSearch();
    setupNewsletterForm();
    setupPagination();
    setupReadingProgress();
}

// Category filtering functionality
function setupCategoryFilters() {
    const categoryBtns = document.querySelectorAll('.category-btn');
    const postCards = document.querySelectorAll('.post-card');
    
    if (!categoryBtns.length || !postCards.length) return;
    
    categoryBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const category = this.dataset.category;
            
            // Update active button
            categoryBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Filter posts
            filterPosts(category, postCards);
        });
    });
}

function filterPosts(category, postCards) {
    postCards.forEach(card => {
        const cardCategory = card.dataset.category;
        
        if (category === 'all' || cardCategory === category) {
            card.style.display = 'block';
            card.style.animation = 'fadeInUp 0.5s ease-out';
        } else {
            card.style.display = 'none';
        }
    });
    
    // Update posts count
    updatePostsCount(category, postCards);
}

function updatePostsCount(category, postCards) {
    const visiblePosts = Array.from(postCards).filter(card => 
        category === 'all' || card.dataset.category === category
    );
    
    // Create or update posts count display
    let countDisplay = document.querySelector('.posts-count');
    if (!countDisplay) {
        countDisplay = document.createElement('div');
        countDisplay.className = 'posts-count';
        countDisplay.style.cssText = `
            text-align: center;
            margin: 2rem 0;
            color: #6b7280;
            font-weight: 500;
        `;
        
        const postsGrid = document.querySelector('.posts-grid');
        postsGrid.parentNode.insertBefore(countDisplay, postsGrid);
    }
    
    const categoryName = category === 'all' ? 'All Posts' : 
                        category.charAt(0).toUpperCase() + category.slice(1);
    countDisplay.textContent = `${categoryName}: ${visiblePosts.length} article${visiblePosts.length !== 1 ? 's' : ''}`;
}

// Blog search functionality
function setupBlogSearch() {
    const searchInput = document.querySelector('.blog-search .search-input');
    const searchBtn = document.querySelector('.blog-search .search-btn');
    const postCards = document.querySelectorAll('.post-card');
    
    if (!searchInput || !postCards.length) return;
    
    let searchTimeout;
    
    searchInput.addEventListener('input', function() {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
            performSearch(this.value.toLowerCase(), postCards);
        }, 300);
    });
    
    searchBtn.addEventListener('click', function() {
        performSearch(searchInput.value.toLowerCase(), postCards);
    });
    
    // Enter key support
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            performSearch(this.value.toLowerCase(), postCards);
        }
    });
}

function performSearch(searchTerm, postCards) {
    if (!searchTerm) {
        // Show all posts if search is empty
        postCards.forEach(card => {
            card.style.display = 'block';
        });
        return;
    }
    
    postCards.forEach(card => {
        const title = card.querySelector('h2, h3').textContent.toLowerCase();
        const content = card.querySelector('p').textContent.toLowerCase();
        const tags = Array.from(card.querySelectorAll('.tag')).map(tag => 
            tag.textContent.toLowerCase()
        ).join(' ');
        
        const isMatch = title.includes(searchTerm) || 
                       content.includes(searchTerm) || 
                       tags.includes(searchTerm);
        
        if (isMatch) {
            card.style.display = 'block';
            highlightSearchTerm(card, searchTerm);
        } else {
            card.style.display = 'none';
        }
    });
    
    // Show search results count
    showSearchResults(searchTerm, postCards);
}

function highlightSearchTerm(card, searchTerm) {
    // Remove previous highlights
    const highlighted = card.querySelectorAll('.highlight');
    highlighted.forEach(el => {
        el.outerHTML = el.innerHTML;
    });
    
    // Add new highlights
    const textElements = card.querySelectorAll('h2, h3, p');
    textElements.forEach(el => {
        if (el.textContent.toLowerCase().includes(searchTerm)) {
            const regex = new RegExp(`(${searchTerm})`, 'gi');
            el.innerHTML = el.innerHTML.replace(regex, '<span class="highlight">$1</span>');
        }
    });
}

function showSearchResults(searchTerm, postCards) {
    const visiblePosts = Array.from(postCards).filter(card => 
        card.style.display !== 'none'
    );
    
    // Create search results display
    let resultsDisplay = document.querySelector('.search-results');
    if (!resultsDisplay) {
        resultsDisplay = document.createElement('div');
        resultsDisplay.className = 'search-results';
        resultsDisplay.style.cssText = `
            text-align: center;
            margin: 2rem 0;
            padding: 1rem;
            background: #f3f4f6;
            border-radius: 8px;
            color: #374151;
        `;
        
        const postsGrid = document.querySelector('.posts-grid');
        postsGrid.parentNode.insertBefore(resultsDisplay, postsGrid);
    }
    
    if (visiblePosts.length === 0) {
        resultsDisplay.innerHTML = `
            <i class="fas fa-search" style="font-size: 2rem; color: #9ca3af; margin-bottom: 1rem; display: block;"></i>
            <p>No posts found for "<strong>${searchTerm}</strong>"</p>
            <p style="margin-top: 0.5rem; font-size: 0.9rem; color: #6b7280;">Try different keywords or browse by category</p>
        `;
    } else {
        resultsDisplay.innerHTML = `
            Found ${visiblePosts.length} post${visiblePosts.length !== 1 ? 's' : ''} for "<strong>${searchTerm}</strong>"
        `;
    }
}

// Newsletter form functionality
function setupNewsletterForm() {
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if (!newsletterForm) return;
    
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = this.querySelector('input[type="email"]').value;
        
        if (!email) {
            showNotification('Please enter your email address.', 'error');
            return;
        }
        
        if (!isValidEmail(email)) {
            showNotification('Please enter a valid email address.', 'error');
            return;
        }
        
        // Simulate newsletter subscription
        subscribeToNewsletter(email);
    });
}

function subscribeToNewsletter(email) {
    // Show loading state
    const submitBtn = document.querySelector('.newsletter-form button');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Subscribing...';
    submitBtn.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        showNotification('Successfully subscribed to the newsletter!', 'success');
        document.querySelector('.newsletter-form').reset();
        
        // Reset button
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }, 1500);
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Pagination functionality
function setupPagination() {
    const pageButtons = document.querySelectorAll('.page-btn');
    
    pageButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            if (this.textContent === 'Next' || this.textContent === 'Previous') {
                handleNextPrevious(this.textContent);
            } else if (!isNaN(this.textContent)) {
                handlePageNumber(parseInt(this.textContent));
            }
        });
    });
}

function handlePageNumber(pageNum) {
    // Update active page
    const pageButtons = document.querySelectorAll('.page-btn');
    pageButtons.forEach(btn => {
        btn.classList.remove('active');
        if (btn.textContent == pageNum) {
            btn.classList.add('active');
        }
    });
    
    // Scroll to top of posts
    document.querySelector('.blog-posts').scrollIntoView({ 
        behavior: 'smooth' 
    });
    
    // In a real implementation, you would load new posts here
    showNotification(`Loading page ${pageNum}...`, 'info');
}

function handleNextPrevious(direction) {
    const currentPage = document.querySelector('.page-btn.active');
    if (!currentPage) return;
    
    const currentPageNum = parseInt(currentPage.textContent);
    const newPageNum = direction === 'Next' ? currentPageNum + 1 : currentPageNum - 1;
    
    if (newPageNum > 0) {
        handlePageNumber(newPageNum);
    }
}

// Reading progress indicator
function setupReadingProgress() {
    // Only add reading progress on individual blog post pages
    if (!document.querySelector('.blog-post-content')) return;
    
    createReadingProgressBar();
    updateReadingProgress();
    
    window.addEventListener('scroll', updateReadingProgress);
}

function createReadingProgressBar() {
    const progressBar = document.createElement('div');
    progressBar.className = 'reading-progress';
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 4px;
        background: linear-gradient(90deg, #2563eb, #7c3aed);
        z-index: 9999;
        transition: width 0.1s ease;
    `;
    
    document.body.appendChild(progressBar);
}

function updateReadingProgress() {
    const progressBar = document.querySelector('.reading-progress');
    if (!progressBar) return;
    
    const article = document.querySelector('.blog-post-content');
    if (!article) return;
    
    const articleTop = article.offsetTop;
    const articleHeight = article.offsetHeight;
    const windowHeight = window.innerHeight;
    const scrollTop = window.pageYOffset;
    
    const readingStart = articleTop - windowHeight * 0.1;
    const readingEnd = articleTop + articleHeight - windowHeight * 0.8;
    
    if (scrollTop < readingStart) {
        progressBar.style.width = '0%';
    } else if (scrollTop > readingEnd) {
        progressBar.style.width = '100%';
    } else {
        const progress = (scrollTop - readingStart) / (readingEnd - readingStart);
        progressBar.style.width = `${Math.min(Math.max(progress * 100, 0), 100)}%`;
    }
}

// Social sharing functionality
function setupSocialSharing() {
    const shareButtons = document.querySelectorAll('.share-btn');
    
    shareButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const platform = this.dataset.platform;
            const url = window.location.href;
            const title = document.querySelector('h1').textContent;
            
            shareOnPlatform(platform, url, title);
        });
    });
}

function shareOnPlatform(platform, url, title) {
    const encodedUrl = encodeURIComponent(url);
    const encodedTitle = encodeURIComponent(title);
    
    let shareUrl;
    
    switch (platform) {
        case 'twitter':
            shareUrl = `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`;
            break;
        case 'linkedin':
            shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;
            break;
        case 'facebook':
            shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
            break;
        case 'email':
            shareUrl = `mailto:?subject=${encodedTitle}&body=${encodedUrl}`;
            break;
        default:
            return;
    }
    
    if (platform === 'email') {
        window.location.href = shareUrl;
    } else {
        window.open(shareUrl, '_blank', 'width=600,height=400');
    }
}

// Table of contents generation (for blog posts)
function generateTableOfContents() {
    const article = document.querySelector('.blog-post-content');
    if (!article) return;
    
    const headings = article.querySelectorAll('h2, h3');
    if (headings.length < 3) return; // Only show TOC if there are at least 3 headings
    
    const toc = document.createElement('div');
    toc.className = 'table-of-contents';
    toc.innerHTML = '<h4>Table of Contents</h4><ul></ul>';
    
    const tocList = toc.querySelector('ul');
    
    headings.forEach((heading, index) => {
        // Add ID to heading for linking
        const id = `heading-${index}`;
        heading.id = id;
        
        // Create TOC item
        const li = document.createElement('li');
        li.className = heading.tagName.toLowerCase();
        li.innerHTML = `<a href="#${id}">${heading.textContent}</a>`;
        
        tocList.appendChild(li);
    });
    
    // Add TOC styles
    const tocStyles = document.createElement('style');
    tocStyles.innerHTML = `
        .table-of-contents {
            background: #f8fafc;
            border: 2px solid #e2e8f0;
            border-radius: 10px;
            padding: 1.5rem;
            margin: 2rem 0;
            position: sticky;
            top: 100px;
        }
        .table-of-contents h4 {
            margin: 0 0 1rem 0;
            color: #1f2937;
            font-size: 1.1rem;
        }
        .table-of-contents ul {
            list-style: none;
            padding: 0;
            margin: 0;
        }
        .table-of-contents li {
            margin-bottom: 0.5rem;
        }
        .table-of-contents li.h3 {
            margin-left: 1rem;
            font-size: 0.9rem;
        }
        .table-of-contents a {
            color: #2563eb;
            text-decoration: none;
            transition: color 0.3s ease;
        }
        .table-of-contents a:hover {
            color: #1d4ed8;
            text-decoration: underline;
        }
    `;
    document.head.appendChild(tocStyles);
    
    // Insert TOC after the first paragraph
    const firstParagraph = article.querySelector('p');
    if (firstParagraph) {
        firstParagraph.parentNode.insertBefore(toc, firstParagraph.nextSibling);
    }
}

// Initialize additional features for blog posts
if (document.querySelector('.blog-post-content')) {
    document.addEventListener('DOMContentLoaded', function() {
        generateTableOfContents();
        setupSocialSharing();
    });
}

// Add CSS for search highlighting
const highlightStyles = document.createElement('style');
highlightStyles.innerHTML = `
    .highlight {
        background: linear-gradient(120deg, #fbbf24 0%, #f59e0b 100%);
        color: #1f2937;
        padding: 0.1rem 0.2rem;
        border-radius: 3px;
        font-weight: 600;
    }
    
    /* Animation for filtered posts */
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(highlightStyles);
