document.addEventListener('DOMContentLoaded', function() {
    const navContainer = document.getElementById('nav-container');
    if(!navContainer) return;
    
    // Correct path calculation
    let navPath = 'nav.html';
    if(window.location.pathname.includes('/tools/')) {
        navPath = '../nav.html';
    }
    
    fetch(navPath)
        .then(response => {
            if(!response.ok) throw new Error('Navigation not found');
            return response.text();
        })
        .then(html => {
            navContainer.innerHTML = html;
            
            // Initialize search AFTER nav loads
            if(typeof initSearch === 'function') initSearch();
            
            // Hide active page buttons
            hideActivePageButton();
        })
        .catch(error => {
            console.error('Navigation load error:', error);
            navContainer.innerHTML = '<nav style="padding:20px;color:white;">Navigation Error</nav>';
        });
});

// Function to hide buttons for current page
function hideActivePageButton() {
    const currentPath = window.location.pathname;
    const currentPage = currentPath.split('/').pop();
    
    // All buttons to check
    const buttons = [
        {selector: '.nav-buttons a[href="tools.html"]', page: 'tools.html'},
        {selector: '.nav-buttons a[href="contact.html"]', page: 'contact.html'},
        {selector: '.nav-buttons a[href="about.html"]', page: 'about.html'},
        {selector: '.nav-buttons a[href="privacy.html"]', page: 'privacy.html'},
        {selector: '.nav-buttons a[href="terms.html"]', page: 'terms.html'}
    ];
    
    buttons.forEach(btn => {
        const element = document.querySelector(btn.selector);
        if(element && (currentPage === btn.page || currentPath.includes(btn.page))) {
            element.style.opacity = '0.5';
            element.style.pointerEvents = 'none';
            element.style.cursor = 'default';
            element.title = 'You are currently on this page';
        }
    });
}
