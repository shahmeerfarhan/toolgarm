// ============== GLOBAL TOOLS ARRAY (loaded from JSON) ==============
let allTools = [];

// ============== LOAD TOOLS FROM JSON ==============
async function loadToolsData() {
    try {
        const response = await fetch('tools-data.json');
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const data = await response.json();
        allTools = data.tools || [];
        console.log(`✅ Loaded ${allTools.length} tools from JSON`);
    } catch (error) {
        console.error('❌ Failed to load tools-data.json:', error);
        // Fallback hardcoded tools
        allTools = [
            {id: 'case-normalizer', title: 'Case Converter', desc: 'Convert text between cases'},
            {id: 'base64', title: 'Base64 Encoder', desc: 'Encode/decode Base64'}
        ];
    }
}

// ============== SEARCH FUNCTIONALITY ==============
function searchTools(query, resultsContainerId) {
    const resultsDiv = document.getElementById(resultsContainerId);
    if (!resultsDiv) return;
    
    query = query.toLowerCase().trim();
    
    if (!query || query.length < 2) {
        resultsDiv.style.display = 'none';
        return;
    }
    
    const matches = allTools.filter(tool => 
        tool.title.toLowerCase().includes(query) || 
        (tool.desc && tool.desc.toLowerCase().includes(query))
    );
    
    resultsDiv.innerHTML = '';
    
    if (matches.length === 0) {
        resultsDiv.innerHTML = '<div class="result-item">No tools found</div>';
    } else {
        matches.forEach(tool => {
            const item = document.createElement('div');
            item.className = 'result-item';
            item.innerHTML = `
                <div style="font-weight:600;">${tool.title}</div>
                <div style="font-size:0.9em;color:rgba(255,255,255,0.6);margin-top:4px;">
                    ${tool.desc || 'Developer tool'}
                </div>
            `;
            item.onclick = () => {
                window.location.href = `tools/${tool.id}.html`;
            };
            resultsDiv.appendChild(item);
        });
    }
    
    resultsDiv.style.display = 'block';
}

// ============== COPY TO CLIPBOARD ==============
function copyToClipboard(text, buttonElement) {
    if (!navigator.clipboard) {
        console.error('Clipboard API not available');
        return;
    }
    
    navigator.clipboard.writeText(text).then(() => {
        const originalHTML = buttonElement.innerHTML;
        buttonElement.innerHTML = '<i class="fas fa-check"></i> Copied!';
        buttonElement.classList.add('copied');
        
        setTimeout(() => {
            buttonElement.innerHTML = originalHTML;
            buttonElement.classList.remove('copied');
        }, 2000);
    }).catch(err => {
        console.error('Failed to copy:', err);
    });
}

// ============== NAVIGATION FIXES ==============
function fixNavigationLinks() {
    // Back button fix
    const backBtn = document.querySelector('.back-btn');
    if (backBtn && window.location.pathname.includes('/tools/')) {
        backBtn.href = '../tools.html';
    }
    
    // Logo link fix
    const logoLink = document.querySelector('.logo a');
    if (logoLink && window.location.pathname.includes('/tools/')) {
        logoLink.href = '../index.html';
    }
    
    // Hide current page buttons
    const currentPath = window.location.pathname;
    const toolsBtn = document.querySelector('a[href="tools.html"], a[href="../tools.html"]');
    const contactBtn = document.querySelector('a[href="contact.html"], a[href="../contact.html"]');
    
    if (toolsBtn && (currentPath.includes('tools.html') || currentPath.includes('/tools/'))) {
        toolsBtn.style.opacity = '0';
        toolsBtn.style.pointerEvents = 'none';
    }
    
    if (contactBtn && currentPath.includes('contact.html')) {
        contactBtn.style.opacity = '0';
        contactBtn.style.pointerEvents = 'none';
    }
}

// ============== INITIALIZE SEARCH ==============
function initializeSearch() {
    const searchInput = document.getElementById('nav-search');
    if (!searchInput) return;
    
    searchInput.addEventListener('input', function() {
        searchTools(this.value, 'search-results');
    });
    
    // Hide results when clicking outside
    document.addEventListener('click', function(event) {
        if (!event.target.closest('.search')) {
            const resultsDiv = document.getElementById('search-results');
            if (resultsDiv) resultsDiv.style.display = 'none';
        }
    });
}

// ============== MAIN INITIALIZATION ==============
document.addEventListener('DOMContentLoaded', async function() {
    console.log('🚀 Initializing ToolGram...');
    
    // 1. Load tools data from JSON
    await loadToolsData();
    
    // 2. Fix navigation links
    fixNavigationLinks();
    
    // 3. Initialize search (if search bar exists)
    initializeSearch();
    
    // 4. Re-check navigation after a delay (for dynamically loaded nav)
    setTimeout(fixNavigationLinks, 300);
    
    console.log('✅ ToolGram initialized successfully');
});

// ============== GLOBAL EXPORTS ==============
window.copyToClipboard = copyToClipboard;
window.searchTools = searchTools;
window.allTools = allTools;
