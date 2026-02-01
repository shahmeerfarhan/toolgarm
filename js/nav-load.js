// GitHub Pages Navigation Loader - ABSOLUTE PATHS
document.addEventListener('DOMContentLoaded', function() {
    const navContainer = document.getElementById('nav-container');
    if(!navContainer) return;
    
    // ABSOLUTE URL for GitHub Pages
    const navUrl = 'https://shahmeerfarhan.github.io/toolgram/nav.html';
    
    console.log('FETCHING navigation from:', navUrl);
    
    fetch(navUrl)
        .then(response => {
            console.log('Response status:', response.status);
            if(!response.ok) throw new Error(`HTTP ${response.status}`);
            return response.text();
        })
        .then(html => {
            console.log('SUCCESS: Navigation loaded, length:', html.length);
            navContainer.innerHTML = html;
        })
        .catch(error => {
            console.error('NAVIGATION FAILED:', error);
            // ALWAYS SHOW NAVIGATION
            navContainer.innerHTML = `
                <nav style="
                    background: #0F172A;
                    padding: 15px 40px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    border-bottom: 1px solid rgba(255,255,255,0.1);
                    position: fixed;
                    top: 0;
                    width: 100%;
                    z-index: 1000;
                ">
                    <a href="https://shahmeerfarhan.github.io/toolgram/index.html" style="color:white;text-decoration:none;">
                        <strong>TOOLGRAM</strong>
                    </a>
                    <div>
                        <a href="https://shahmeerfarhan.github.io/toolgram/tools.html" style="color:white;margin-right:20px;">Tools</a>
                        <a href="https://shahmeerfarhan.github.io/toolgram/contact.html" style="color:white;">Contact</a>
                    </div>
                </nav>
            `;
        });
});
