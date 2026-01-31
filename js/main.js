// Search functionality
function initSearch() {
    const searchInput = document.getElementById('nav-search');
    const searchResults = document.getElementById('search-results');
    
    if(!searchInput || !searchResults) return;
    
    // Define your tools for search
    const tools = [
        {name: 'Case Converter', url: 'tools/case-normalizer.html', desc: 'Convert text between different cases'},
        {name: 'Base64 Encoder', url: 'tools/base64.html', desc: 'Encode/decode Base64 strings'},
        {name: 'JSON Formatter', url: 'tools/json-formatter.html', desc: 'Format and validate JSON'},
        {name: 'Password Generator', url: 'tools/password-generator.html', desc: 'Generate secure passwords'},
        {name: 'UUID Generator', url: 'tools/uuid-generator.html', desc: 'Generate UUIDs'},
        {name: 'Hash Generator', url: 'tools/hash-generator.html', desc: 'Generate SHA256/MD5 hashes'}
    ];
    
    // Search function
    searchInput.addEventListener('input', function(e) {
        const query = e.target.value.toLowerCase().trim();
        searchResults.innerHTML = '';
        
        if(query.length < 2) {
            searchResults.style.display = 'none';
            return;
        }
        
        const matches = tools.filter(tool => 
            tool.name.toLowerCase().includes(query) || 
            tool.desc.toLowerCase().includes(query)
        );
        
        if(matches.length > 0) {
            matches.forEach(tool => {
                const resultItem = document.createElement('a');
                resultItem.href = tool.url;
                resultItem.className = 'search-result-item';
                resultItem.innerHTML = `
                    <div><strong>${tool.name}</strong></div>
                    <div style="font-size:0.8em;opacity:0.8;">${tool.desc}</div>
                `;
                searchResults.appendChild(resultItem);
            });
            searchResults.style.display = 'block';
        } else {
            searchResults.innerHTML = '<div class="no-results">No tools found</div>';
            searchResults.style.display = 'block';
        }
    });
    
    // Hide results when clicking outside
    document.addEventListener('click', function(e) {
        if(!searchInput.contains(e.target) && !searchResults.contains(e.target)) {
            searchResults.style.display = 'none';
        }
    });
}

// Back button logic
document.addEventListener('DOMContentLoaded', function() {
    const backBtn = document.querySelector('.back-btn');
    const logoLink = document.querySelector('.logo a');
    const currentPath = window.location.pathname;
    
    // Fix logo link from tool pages
    if(logoLink && currentPath.includes('/tools/')) {
        logoLink.href = '../index.html';
    }
    
    // Back button logic - DON'T override for tool pages
    if(backBtn) {
        if(currentPath.includes('/tools/')) {
            // On tool pages: Back to Tools list (from HTML)
            backBtn.href = '../tools.html';
        } else if(currentPath.endsWith('tools.html')) {
            // On tools.html: Back to Home
            backBtn.href = './index.html';
            backBtn.innerHTML = '<i class="fas fa-arrow-left"></i> Back to Home';
        }
    }
    
    // Initialize search if not done by nav-load.js
    setTimeout(() => {
        if(typeof initSearch !== 'undefined' && document.getElementById('nav-search')) {
            initSearch();
        }
    }, 500);
});
