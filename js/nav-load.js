// SIMPLE nav-load.js - Just loads HTML, lets main.js handle functionality
(function() {
    const navContainer = document.getElementById('nav-container');
    if (!navContainer) return;
    
    // Calculate path based on current page
    let navPath = 'nav.html';
    if (window.location.pathname.includes('/tools/')) {
        navPath = '../nav.html';
    }
    
    console.log('📁 Loading nav from:', navPath);
    
    // Load nav.html
    fetch(navPath)
        .then(r => r.text())
        .then(html => {
            navContainer.innerHTML = html;
            console.log('✅ Navigation loaded');
            
            // Your main.js will handle search initialization
            // because search input exists now
        })
        .catch(err => {
            console.error('Navigation error:', err);
            // Simple fallback
            navContainer.innerHTML = `
                <nav>
                    <div class="logo">
                        <a href="index.html">
                            <img src="https://i.postimg.cc/sgvNN6w5/Gemini-Generated-Image-xajg8yxajg8yxajg-removebg-preview.png" alt="ToolGram">
                        </a>
                    </div>
                    <div class="search">
                        <input id="nav-search" placeholder="Search tools...">
                        <i class="fas fa-search"></i>
                        <div id="search-results"></div>
                    </div>
                    <div class="nav-buttons">
                        <a href="tools.html" class="contact-btn">
                            <i class="fas fa-tools"></i><span>All Tools</span>
                        </a>
                        <a href="contact.html" class="contact-btn">
                            <i class="fas fa-envelope"></i><span>Contact</span>
                        </a>
                    </div>
                </nav>
            `;
        });
})();
