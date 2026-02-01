// COMPLETE NAVIGATION LOADER - Works on ALL pages
(function() {
    const navContainer = document.getElementById('nav-container');
    if (!navContainer) return;
    
    // Determine correct nav.html path
    let navPath = 'nav.html';
    const path = window.location.pathname;
    
    if (path.includes('/tools/')) {
        navPath = '../nav.html'; // From /tools/ folder
    }
    
    console.log('🔄 Loading nav from:', navPath);
    
    // Try to load nav.html
    fetch(navPath)
        .then(r => {
            if (!r.ok) throw new Error(`HTTP ${r.status}`);
            return r.text();
        })
        .then(html => {
            navContainer.innerHTML = html;
            console.log('✅ Navigation loaded successfully');
            
            // IMPORTANT: Initialize navigation functions
            setTimeout(initializeNavFunctions, 50);
        })
        .catch(err => {
            console.error('❌ Navigation failed:', err);
            // FALLBACK: Hardcoded navigation that ALWAYS works
            createFallbackNavigation();
        });
    
    function initializeNavFunctions() {
        // Fix logo links for tool pages
        const logoLink = document.querySelector('.logo a');
        if (logoLink && window.location.pathname.includes('/tools/')) {
            logoLink.href = '../index.html';
        }
        
        // Initialize search (will be in nav.html)
        if (typeof initNavigationSearch === 'function') {
            initNavigationSearch();
        }
    }
    
    function createFallbackNavigation() {
        // This ALWAYS shows navigation even if fetch fails
        navContainer.innerHTML = `
            <nav style="
                background: rgba(15, 23, 42, 0.95);
                backdrop-filter: blur(20px);
                padding: 15px 40px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                position: fixed;
                top: 0;
                width: 100%;
                z-index: 1000;
                border-bottom: 1px solid rgba(255, 255, 255, 0.1);
            ">
                <div class="logo">
                    <a href="index.html" style="display: flex; align-items: center; gap: 10px; text-decoration: none; color: white; font-size: 1.8rem; font-weight: 900;">
                        <img src="https://i.postimg.cc/sgvNN6w5/Gemini-Generated-Image-xajg8yxajg8yxajg-removebg-preview.png" alt="ToolGram" height="45">
                    </a>
                </div>
                <div class="search" style="flex: 0.5; max-width: 600px; position: relative;">
                    <input type="text" placeholder="Search tools..." style="width: 100%; padding: 12px 45px 12px 20px; background: rgba(255, 255, 255, 0.08); border: 2px solid rgba(255, 255, 255, 0.1); border-radius: 50px; color: white;">
                    <i class="fas fa-search" style="position: absolute; right: 20px; top: 50%; transform: translateY(-50%); color: #94A3B8;"></i>
                </div>
                <div class="nav-buttons" style="display: flex; align-items: center; gap: 15px;">
                    <a href="tools.html" style="background: linear-gradient(135deg, #8B5CF6, #EC4899); color: white; padding: 10px 25px; border-radius: 50px; font-weight: 600; text-decoration: none; display: flex; align-items: center; gap: 12px;">
                        <i class="fas fa-tools"></i>
                        <span>All Tools</span>
                    </a>
                    <a href="contact.html" style="background: linear-gradient(135deg, #8B5CF6, #EC4899); color: white; padding: 10px 25px; border-radius: 50px; font-weight: 600; text-decoration: none; display: flex; align-items: center; gap: 12px;">
                        <i class="fas fa-envelope"></i>
                        <span>Contact</span>
                    </a>
                </div>
            </nav>
        `;
    }
})();
