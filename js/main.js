// Back button fixes ONLY
document.addEventListener('DOMContentLoaded', function() {
    // Back button
    const backBtn = document.querySelector('.back-btn');
    if(backBtn && window.location.pathname.includes('/tools/')) {
        backBtn.href = '../tools.html';
    }
});
