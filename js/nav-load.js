document.addEventListener('DOMContentLoaded', function() {
    const navContainer = document.getElementById('nav-container');
    if(!navContainer) return;
    
    let navPath = 'nav.html';
    if(window.location.pathname.includes('/tools/')) {
        navPath = '../nav.html'; // FIXED PATH
    }
    
    fetch(navPath)
        .then(r => r.text())
        .then(html => {
            navContainer.innerHTML = html;
            // Search init here if needed
        })
        .catch(e => {
            console.error('Nav error:', e);
            navContainer.innerHTML = '<nav>Error loading menu</nav>';
        });
});
