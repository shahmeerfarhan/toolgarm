// Navigation Loader - FIXED for GitHub Pages
document.addEventListener('DOMContentLoaded', function() {
    const navContainer = document.getElementById('nav-container');
    if(!navContainer) return;
    
    // CRITICAL FIX: GitHub Pages base path
    const basePath = '/toolgram/'; // Your GitHub Pages subdirectory
    let navPath = basePath + 'nav.html';
    
    // Check current URL to determine correct path
    const currentPath = window.location.pathname;
    console.log('Current path:', currentPath);
    
    // Adjust path for different locations
    if(currentPath.includes('/tools/')) {
        // From /tools/case-normalizer.html
        navPath = basePath + 'nav.html'; // Absolute path works always
    } else if(currentPath === '/' || currentPath === '/toolgram/') {
        // Root or homepage
        navPath = basePath + 'nav.html';
    }
    
    console.log('Loading navigation from:', navPath);
    
    // Load with absolute timeout - no caching
    fetch(navPath, {cache: 'no-cache'})
        .then(response => {
            console.log('Response status:', response.status);
            if(!response.ok) throw new Error(`HTTP ${response.status}`);
            return response.text();
        })
        .then(html => {
            console.log('Navigation HTML loaded, length:', html.length);
            navContainer.innerHTML = html;
        })
        .catch(error => {
            console.error('Navigation FAILED:', error);
            // EMERGENCY FALLBACK - shows navigation even if fetch fails
            navContainer.innerHTML = `
                <nav style="background:#0F172A;padding:15px 40px;display:flex;justify-content:space-between;align-items:center;border-bottom:1px solid rgba(255,255,255,0.1);position:fixed;top:0;width:100%;z-index:1000;">
                    <div class="logo">
                        <a href="${basePath}index.html" style="color:white;text-decoration:none;font-size:1.8rem;font-weight:900;display:flex;align-items:center;gap:10px;">
                            <img src="https://i.postimg.cc/sgvNN6w5/Gemini-Generated-Image-xajg8yxajg8yxajg-removebg-preview.png" alt="ToolGram" height="45">
                        </a>
                    </div>
                    <div class="nav-buttons" style="display:flex;gap:15px;">
                        <a href="${basePath}tools.html" style="background:linear-gradient(135deg,#8B5CF6,#EC4899);color:white;padding:10px 25px;border-radius:50px;text-decoration:none;display:flex;align-items:center;gap:10px;">
                            <i class="fas fa-tools"></i><span>All Tools</span>
                        </a>
                        <a href="${basePath}contact.html" style="background:linear-gradient(135deg,#8B5CF6,#EC4899);color:white;padding:10px 25px;border-radius:50px;text-decoration:none;display:flex;align-items:center;gap:10px;">
                            <i class="fas fa-envelope"></i><span>Contact</span>
                        </a>
                    </div>
                </nav>
            `;
        });
});
