document.addEventListener('DOMContentLoaded', function() {
    const navContainer = document.getElementById('nav-container');
    if(!navContainer) return;
    
    let navPath = 'nav.html';
    if(window.location.pathname.includes('/tools/')) {
        navPath = '../nav.html';
    }
    
    fetch(navPath)
        .then(r => r.text())
        .then(html => {
            navContainer.innerHTML = html;
            // ✅ CRITICAL: Initialize search AFTER nav loads
            setTimeout(initializeSearch, 100);
        })
        .catch(e => console.error('Nav error:', e));
});

// ✅ ADD THIS FUNCTION to nav-load.js
function initializeSearch() {
    const searchInput = document.getElementById('nav-search');
    const resultsDiv = document.getElementById('search-results');
    
    if(!searchInput || !resultsDiv) return;
    
    // Your search logic here
    searchInput.addEventListener('input', function(e) {
        const query = e.target.value.toLowerCase();
        resultsDiv.innerHTML = '';
        
        if(query.length < 2) {
            resultsDiv.style.display = 'none';
            return;
        }
        
        // Example search results
        resultsDiv.innerHTML = `
            <div class="result-item">Case Converter</div>
            <div class="result-item">Base64 Encoder</div>
            <div class="result-item">JSON Formatter</div>
        `;
        resultsDiv.style.display = 'block';
    });
    
    // Hide results when clicking outside
    document.addEventListener('click', function(e) {
        if(e.target !== searchInput && !resultsDiv.contains(e.target)) {
            resultsDiv.style.display = 'none';
        }
    });
}
