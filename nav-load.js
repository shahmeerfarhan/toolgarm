// Load navigation on every page
document.addEventListener('DOMContentLoaded', function() {
    const navContainer = document.getElementById('nav-container');
    
    if(navContainer) {
        // Determine correct path to nav.html based on current page
        let navPath = 'nav.html';
        
        if(window.location.pathname.includes('/tools/')) {
            navPath = '../nav.html';  // Go up one level from /tools/ folder
        }
        
        // Load the navigation
        fetch(navPath)
            .then(response => {
                if(!response.ok) throw new Error('Navigation not found');
                return response.text();
            })
            .then(html => {
                navContainer.innerHTML = html;
                // Re-initialize any navigation scripts after loading
                initializeNavScripts();
            })
            .catch(error => {
                console.error('Failed to load navigation:', error);
                navContainer.innerHTML = '<p>Navigation failed to load</p>';
            });
    }
});

function initializeNavScripts() {
    // Re-attach any event listeners for the navigation
    // Add search functionality or other nav interactions here
    console.log('Navigation loaded, scripts can be initialized');
}