// main.js - NAVIGATION ONLY, NO SEARCH

// Back button logic
document.addEventListener('DOMContentLoaded', function() {
    const backBtn = document.querySelector('.back-btn');
    const logoLink = document.querySelector('.logo a');
    const currentPath = window.location.pathname;
    
    // Fix logo link from tool pages
    if(logoLink && currentPath.includes('/tools/')) {
        logoLink.href = '../index.html';
    }
    
    // Back button logic
    if(backBtn) {
        if(currentPath.includes('/tools/')) {
            // On tool pages: Back to Tools list
            backBtn.href = '../tools.html';
        } else if(currentPath.endsWith('tools.html')) {
            // On tools.html: Back to Home
            backBtn.href = './index.html';
            backBtn.innerHTML = '<i class="fas fa-arrow-left"></i> Back to Home';
        }
    }
});
