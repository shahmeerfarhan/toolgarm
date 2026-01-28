// Simple navigation loader - automatically finds and replaces navigation
(function() {
    // Wait for page to load
    window.addEventListener('DOMContentLoaded', function() {
        // Find existing navigation
        const oldNav = document.querySelector('nav');
        
        if (oldNav) {
            // Create new navigation
            const newNav = document.createElement('nav');
            newNav.innerHTML = `
                <div class="logo">
                    <a href="../index.html">
                        <img src="https://i.postimg.cc/sgvNN6w5/Gemini-Generatod-Image-xajg8yxajg8yxajg-removebg-preview.png" alt="ToolGram">
                    </a>
                </div>
                <div class="search">
                    <input id="nav-search" placeholder="Search infinite tools..." autocomplete="off">
                    <i class="fas fa-search" style="position:absolute;right:20px;top:50%;transform:translateY(-50%);color:#94A3B8;"></i>
                    <div id="search-results"></div>
                </div>
                <div class="nav-buttons">
                    <a href="../tools.html" class="contact-btn">
                        <i class="fas fa-tools"></i>
                        <span>All Tools</span>
                    </a>
                    <a href="../contact.html" class="contact-btn">
                        <i class="fas fa-envelope"></i>
                        <span>Contact</span>
                    </a>
                </div>
            `;
            
            // Replace old navigation with new one
            oldNav.parentNode.replaceChild(newNav, oldNav);
            console.log('Navigation updated successfully!');
        }
    });

})();
