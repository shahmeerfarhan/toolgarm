// Navigation Loader - loads nav.html into #nav-container
document.addEventListener('DOMContentLoaded', function() {
    const navContainer = document.getElementById('nav-container');
    if(!navContainer) return;
    
    // Calculate correct path based on current page
    let navPath = 'nav.html';
    const currentPath = window.location.pathname;
    
    // Different paths for different locations
    if(currentPath.includes('/tools/')) {
        navPath = '../nav.html'; // From /tools/ folder
    } else if(currentPath === '/toolgram/' || currentPath === '/toolgram/index.html') {
        navPath = 'nav.html'; // Root homepage
    }
    
    console.log('Loading navigation from:', navPath);
    
    // Load navigation HTML
    fetch(navPath)
        .then(response => {
            if(!response.ok) {
                throw new Error(`Failed to load navigation (${response.status})`);
            }
            return response.text();
        })
        .then(html => {
            // Insert navigation HTML
            navContainer.innerHTML = html;
            console.log('Navigation loaded successfully');
            
            // Navigation scripts run automatically from nav.html
            // No need to call anything here
        })
        .catch(error => {
            console.error('Navigation error:', error);
            // Fallback navigation
            navContainer.innerHTML = `
                <nav style="background:#0F172A;padding:15px 40px;display:flex;justify-content:space-between;align-items:center;">
                    <div class="logo">
                        <a href="index.html" style="color:white;text-decoration:none;font-weight:bold;font-size:1.5rem;">
                            ToolGram
                        </a>
                    </div>
                    <div style="display:flex;gap:15px;">
                        <a href="tools.html" style="color:white;text-decoration:none;padding:8px 16px;background:#8B5CF6;border-radius:20px;">
                            Tools
                        </a>
                        <a href="contact.html" style="color:white;text-decoration:none;padding:8px 16px;background:#EC4899;border-radius:20px;">
                            Contact
                        </a>
                    </div>
                </nav>
            `;
        });
});
