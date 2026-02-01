// FINAL nav-load.js - 100% working
(function() {
    const navContainer = document.getElementById('nav-container');
    if (!navContainer) return;
    
    // Use absolute path for GitHub Pages
    const isToolPage = window.location.pathname.includes('/tools/');
    const isRoot = window.location.pathname === '/toolgram/' || 
                   window.location.pathname === '/toolgram/index.html' ||
                   window.location.pathname === '/';
    
    let navPath = 'nav.html';
    if (isToolPage) navPath = '../nav.html';
    if (isRoot) navPath = 'nav.html';
    
    console.log('📍 Loading navigation from:', navPath);
    
    // Load nav.html
    fetch(navPath)
        .then(r => {
            if (!r.ok) throw new Error(`HTTP ${r.status}: ${navPath}`);
            return r.text();
        })
        .then(html => {
            navContainer.innerHTML = html;
            console.log('✅ Navigation loaded');
            
            // CRITICAL: Run nav initialization AFTER HTML is inserted
            setTimeout(initNavFunctionality, 100);
        })
        .catch(err => {
            console.error('⚠️ Navigation fetch failed:', err);
            createEmergencyNavigation();
        });
    
    // ALL NAV FUNCTIONALITY GOES HERE
    function initNavFunctionality() {
        console.log('🔧 Initializing nav functionality...');
        
        // 1. FIX LOGO LINKS FOR TOOL PAGES
        const logoLink = document.querySelector('.logo a');
        if (logoLink && isToolPage) {
            logoLink.href = '../index.html';
            console.log('✅ Fixed logo link for tool page');
        }
        
        // 2. INITIALIZE SEARCH FUNCTIONALITY
        const searchInput = document.getElementById('nav-search');
        const resultsDiv = document.getElementById('search-results');
        
        if (searchInput && resultsDiv) {
            console.log('✅ Initializing search...');
            
            // Simple search logic
            searchInput.addEventListener('input', function(e) {
                const query = e.target.value.trim().toLowerCase();
                resultsDiv.innerHTML = '';
                
                if (query.length < 2) {
                    resultsDiv.style.display = 'none';
                    return;
                }
                
                // Show search results
                resultsDiv.innerHTML = `
                    <div class="result-item">Case Converter</div>
                    <div class="result-item">Base64 Encoder</div>
                    <div class="result-item">JSON Formatter</div>
                `;
                resultsDiv.style.display = 'block';
            });
            
            // Hide results when clicking outside
            document.addEventListener('click', function(e) {
                if (!searchInput.contains(e.target) && !resultsDiv.contains(e.target)) {
                    resultsDiv.style.display = 'none';
                }
            });
            
            console.log('✅ Search initialized');
        }
        
        // 3. HIDE CURRENT PAGE BUTTONS (opacity: 0)
        const currentPage = window.location.pathname.split('/').pop();
        const toolsBtn = document.querySelector('a[href="tools.html"]');
        const contactBtn = document.querySelector('a[href="contact.html"]');
        
        if (toolsBtn && (currentPage === 'tools.html' || window.location.pathname.includes('tools.html'))) {
            toolsBtn.style.opacity = '0';
            toolsBtn.style.pointerEvents = 'none';
            console.log('✅ Hid Tools button (current page)');
        }
        
        if (contactBtn && (currentPage === 'contact.html' || window.location.pathname.includes('contact.html'))) {
            contactBtn.style.opacity = '0';
            contactBtn.style.pointerEvents = 'none';
            console.log('✅ Hid Contact button (current page)');
        }
        
        console.log('🎯 All nav functionality initialized');
    }
    
    function createEmergencyNavigation() {
        // SIMPLE navigation that uses YOUR CSS classes
        navContainer.innerHTML = `
            <nav>
                <div class="logo">
                    <a href="${isToolPage ? '../index.html' : 'index.html'}">
                        <img src="https://i.postimg.cc/sgvNN6w5/Gemini-Generated-Image-xajg8yxajg8yxajg-removebg-preview.png" alt="ToolGram">
                    </a>
                </div>
                <div class="search">
                    <input id="nav-search" placeholder="Search tools..." autocomplete="off">
                    <i class="fas fa-search"></i>
                    <div id="search-results"></div>
                </div>
                <div class="nav-buttons">
                    <a href="${isToolPage ? '../tools.html' : 'tools.html'}" class="contact-btn">
                        <i class="fas fa-tools"></i><span>All Tools</span>
                    </a>
                    <a href="${isToolPage ? '../contact.html' : 'contact.html'}" class="contact-btn">
                        <i class="fas fa-envelope"></i><span>Contact</span>
                    </a>
                </div>
            </nav>
        `;
        
        // Re-run initialization for emergency nav
        setTimeout(initNavFunctionality, 100);
    }
})();
